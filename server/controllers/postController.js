const Post = require('../models/Post');
const User = require('../models/User');
const PostLike = require('../models/PostLike');
const { Op } = require('sequelize');

// 게시글 생성 (writer_id와 owner_id가 실제 존재하는지 검증)
// - owner_id가 전달되지 않으면 writer_id로 설정함
exports.createPost = async (req, res) => {
  try {
    const { post_title, post_content, writer_id, owner_id, price, gas_fee } = req.body;
    
    // writer_id가 실제 존재하는지 검증
    const writer = await User.findByPk(writer_id);
    if (!writer) {
      return res.status(400).json({ message: 'Invalid writer_id. User does not exist.' });
    }
    
    // owner_id가 전달되었으면 실제 사용자인지 검증, 없으면 writer_id로 설정
    let finalOwnerId = owner_id;
    if (owner_id) {
      const owner = await User.findByPk(owner_id);
      if (!owner) {
        return res.status(400).json({ message: 'Invalid owner_id. User does not exist.' });
      }
    } else {
      finalOwnerId = writer_id;
    }
    
    const post = await Post.create({ 
      post_title, 
      post_content, 
      writer_id, 
      owner_id: finalOwnerId, 
      price, 
      gas_fee 
    });
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시글 조회 (조회수 증가 포함, 좋아요 수도 함께 반환)
exports.readPost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const post = await Post.findByPk(post_id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // 조회수 증가
    post.view_count += 1;
    await post.save();
    // 좋아요 수 집계
    const likeCount = await PostLike.count({ where: { post_id } });
    const postData = { ...post.toJSON(), likeCount };
    res.json(postData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시글 검색 (제목 검색, 각 게시글의 좋아요 수 포함)
exports.searchPosts = async (req, res) => {
  try {
    const searchText = req.query.text;
    if (!searchText) {
      return res.status(400).json({ message: 'text query parameter is required' });
    }
    const posts = await Post.findAll({
      where: {
        post_title: {
          [Op.like]: `%${searchText}%`
        }
      }
    });
    
    // 각 게시글에 대해 좋아요 수 집계
    const postsWithLikes = await Promise.all(posts.map(async (post) => {
      const likeCount = await PostLike.count({ where: { post_id: post.id } });
      return { ...post.toJSON(), likeCount };
    }));
    
    res.json(postsWithLikes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시글 구매 API
// - 구매 시, buyer_id가 실제 존재하는지 확인하고, 토큰 잔액이 충분한지 검증한 후
//   구매자의 토큰 잔액을 차감하고, 해당 게시글의 owner_id를 구매자로 업데이트함
exports.purchasePost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const { buyer_id } = req.body;
    
    // 구매자 검증
    const buyer = await User.findByPk(buyer_id);
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });
    
    // 게시글 존재 여부 확인
    const post = await Post.findByPk(post_id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    
    // 판매자(현재 게시글 소유자) 검증
    const seller = await User.findByPk(post.owner_id);
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    
    // 구매자가 자기 자신의 게시글을 구매할 수 없음
    if (buyer_id === seller.id) {
      return res.status(400).json({ message: "Cannot purchase your own post" });
    }
    
    const postPrice = parseFloat(post.price);
    
    // 구매자의 토큰 잔액 검증
    if (parseFloat(buyer.user_token_balance) < postPrice) {
      return res.status(400).json({ message: "Insufficient token balance" });
    }
    
    // 구매자의 토큰 차감
    buyer.user_token_balance = parseFloat(buyer.user_token_balance) - postPrice;
    await buyer.save();
    
    // 판매자의 토큰 증가
    seller.user_token_balance = parseFloat(seller.user_token_balance) + postPrice;
    await seller.save();
    
    // 게시글 소유자 업데이트 (구매자로 변경)
    post.owner_id = buyer_id;
    await post.save();
    
    // 거래 내역 기록 (Transaction 모델 사용)
    const Transaction = require('../models/Transaction');
    const crypto = require('crypto');
    const transaction_hash = crypto.randomBytes(16).toString("hex");
    
    const transaction = await Transaction.create({
      seller_id: seller.id,
      buyer_id: buyer.id,
      post_id: post.id,
      amount: postPrice,
      gas_fee: 0.001,
      transaction_type: "sale",
      transaction_hash,
      status: "completed",
      transaction_date: new Date()
    });
    
    res.json({ message: "Post purchased successfully", transaction });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시글 좋아요 API
// - user_id와 post_id가 실제 존재하는지 검증한 후 좋아요 기록 생성
exports.likePost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const { user_id } = req.body;
    
    // 게시글 존재 여부 확인
    const post = await Post.findByPk(post_id);
    if (!post) {
      return res.status(400).json({ message: 'Invalid post_id. Post does not exist.' });
    }
    
    // user_id가 실제 존재하는지 검증
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    }
    
    // 좋아요 기록 생성
    const postLike = await PostLike.create({ post_id, user_id });
    res.status(201).json({ message: 'Post liked successfully', postLike });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
