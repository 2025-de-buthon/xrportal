const Ad = require('../models/Ad');
const AdClick = require('../models/AdClick');
const User = require('../models/User');
const { Op } = require('sequelize');

// 광고 등록 API
exports.createAd = async (req, res) => {
  try {
    const { ad_title, ad_content, start_date, end_date, user_id, ad_price } = req.body;
    
    // 등록자(user_id) 검증
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    }
    
    // 광고 등록 시 광고 비용만큼 토큰 차감 (잔액 부족 시 등록 불가)
    if (parseFloat(user.user_token_balance) < parseFloat(ad_price)) {
      return res.status(400).json({ message: 'Insufficient token balance for ad creation.' });
    }
    user.user_token_balance = parseFloat(user.user_token_balance) - parseFloat(ad_price);
    await user.save();
    
    // 광고 생성
    const ad = await Ad.create({
      ad_title,
      ad_content,
      start_date,
      end_date,
      user_id,
      ad_price,
      status: 'active'
    });
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 광고 조회 API (특정 post_id에 대해 랜덤 광고 반환)
exports.readAd = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const currentDate = new Date();
    // 활성 상태 및 유효 기간 내인 광고 조회
    const ads = await Ad.findAll({
      where: {
        status: 'active',
        start_date: { [Op.lte]: currentDate },
        end_date: { [Op.gte]: currentDate }
      }
    });
    if (ads.length === 0) {
      return res.status(404).json({ message: 'No active ads found.' });
    }
    const randomIndex = Math.floor(Math.random() * ads.length);
    const randomAd = ads[randomIndex];
    res.json(randomAd);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 광고 게시글 조회 API (특정 광고의 게시글별 클릭 수 집계)
exports.adDetail = async (req, res) => {
  try {
    const ad_id = req.params.ad_id;
    const clicks = await AdClick.findAll({
      attributes: ['post_id', [AdClick.sequelize.fn('COUNT', AdClick.sequelize.col('id')), 'click_count']],
      where: { ad_id },
      group: ['post_id']
    });
    res.json(clicks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 광고 클릭 API
exports.clickAd = async (req, res) => {
  try {
    const ad_id = req.params.ad_id;
    const { post_id, user_id } = req.body;
    
    // 광고 존재 여부 검증
    const ad = await Ad.findByPk(ad_id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found.' });
    }
    
    // 클릭 요청한 사용자 검증
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    }
    
    // 광고 클릭 기록 생성
    const adClick = await AdClick.create({ ad_id, post_id, user_id });
    // 전역 클릭수 업데이트
    ad.click_count = ad.click_count + 1;
    await ad.save();
    
    res.status(201).json({ message: 'Ad clicked successfully.', adClick });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 광고 정보 조회 API
exports.viewAd = async (req, res) => {
  try {
    const ad_id = req.params.ad_id;
    const ad = await Ad.findByPk(ad_id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found.' });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
