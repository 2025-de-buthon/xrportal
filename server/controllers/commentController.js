const Comment = require('../models/Comment');
const CommentLike = require('../models/CommentLike');
const Post = require('../models/Post');
const User = require('../models/User');

// 댓글 생성 API
// - post_id와 user_id가 실제 존재하는지 검증 후 댓글 생성
exports.createComment = async (req, res) => {
  try {
    const { post_id, user_id, comment_content } = req.body;
    
    // 게시글 존재 여부 확인
    const post = await Post.findByPk(post_id);
    if (!post) {
      return res.status(400).json({ message: 'Invalid post_id. Post does not exist.' });
    }
    
    // user_id 검증
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    }
    
    const comment = await Comment.create({ post_id, user_id, comment_content });
    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 댓글 좋아요 API
// - comment_id와 user_id가 실제 존재하는지 검증 후 좋아요 기록 생성
exports.likeComment = async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    const { user_id } = req.body;
    
    // 댓글 존재 여부 확인
    const comment = await Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(400).json({ message: 'Invalid comment_id. Comment does not exist.' });
    }
    
    // user_id 검증
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    }
    
    const commentLike = await CommentLike.create({ comment_id, user_id });
    res.status(201).json({ message: 'Comment liked successfully', commentLike });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시글 댓글 조회 API (각 댓글의 좋아요 수 포함)
// - post_id가 실제 존재하는지 확인한 후, 해당 게시글의 모든 댓글 조회
exports.readComments = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    
    // 게시글 존재 여부 확인
    const post = await Post.findByPk(post_id);
    if (!post) {
      return res.status(400).json({ message: 'Invalid post_id. Post does not exist.' });
    }
    
    const comments = await Comment.findAll({ where: { post_id } });
    
    // 각 댓글의 좋아요 수 집계
    const commentsWithLikes = await Promise.all(comments.map(async (comment) => {
      const likeCount = await CommentLike.count({ where: { comment_id: comment.id } });
      return { ...comment.toJSON(), likeCount };
    }));
    
    res.json(commentsWithLikes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
