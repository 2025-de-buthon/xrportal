const Ad = require('../models/Ad');
const AdClick = require('../models/AdClick');
const User = require('../models/User');
const { Op } = require('sequelize');
const crypto = require('crypto');

// Helper: 광고 상태를 동적으로 계산하는 함수
// today < start_date : "upcoming"
// start_date <= today <= end_date : "running"
// today > end_date : "ended"
const computeAdStatus = (ad) => {
  const today = new Date();
  const start = new Date(ad.start_date);
  const end = new Date(ad.end_date);
  if (today < start) return "upcoming";
  else if (today > end) return "ended";
  else return "running";
};

// 광고 등록 API (S3 업로드된 이미지 URL 사용)
// 클라이언트는 multipart/form-data 형식으로 ad_image 파일을 전송합니다.
exports.createAd = async (req, res) => {
  try {
    const { ad_title, start_date, end_date, user_id, ad_price } = req.body;
    
    // 사용자 존재 여부 확인
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    }
    
    // S3 업로드 결과에서 이미지 URL 획득 (multer-s3가 req.file.location에 URL을 저장)
    const ad_content = req.file ? req.file.location : null;
    if (!ad_content) {
      return res.status(400).json({ message: 'Image upload failed.' });
    }
    
    const ad = await Ad.create({
      ad_title,
      ad_content,
      start_date,
      end_date,
      user_id,
      ad_price
    });
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 광고 조회 API (특정 post_id에 대해 현재 진행 중인 광고 중 랜덤 반환)
exports.readAd = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const currentDate = new Date();
    const ads = await Ad.findAll({
      where: {
        start_date: { [Op.lte]: currentDate },
        end_date: { [Op.gte]: currentDate }
      }
    });
    if (ads.length === 0) {
      return res.status(404).json({ message: 'No active ads found.' });
    }
    const randomIndex = Math.floor(Math.random() * ads.length);
    const randomAd = ads[randomIndex];
    const dynamicStatus = computeAdStatus(randomAd);
    const adData = { ...randomAd.toJSON(), status: dynamicStatus };
    res.json(adData);
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
    const ad = await Ad.findByPk(ad_id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found.' });
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    }
    const adClick = await AdClick.create({ ad_id, post_id, user_id });
    ad.click_count += 1;
    await ad.save();
    res.status(201).json({ message: 'Ad clicked successfully.', adClick });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 광고 정보 조회 API (동적 상태 포함)
exports.viewAd = async (req, res) => {
  try {
    const ad_id = req.params.ad_id;
    const ad = await Ad.findByPk(ad_id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found.' });
    }
    const dynamicStatus = computeAdStatus(ad);
    const adData = { ...ad.toJSON(), status: dynamicStatus };
    res.json(adData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 특정 사용자가 등록한 광고 조회 API
exports.getAdsByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const ads = await Ad.findAll({ where: { user_id } });
    const adsWithStatus = ads.map(ad => ({
      ...ad.toJSON(),
      status: computeAdStatus(ad)
    }));
    res.json(adsWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
