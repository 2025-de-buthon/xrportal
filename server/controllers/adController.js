const Ad = require('../models/Ad');
const AdClick = require('../models/AdClick');
const User = require('../models/User');
const { Op } = require('sequelize');
const crypto = require('crypto');

// Helper: 동적으로 광고 상태를 계산하는 함수
const computeAdStatus = (ad) => {
  const today = new Date();
  const start = new Date(ad.start_date);
  const end = new Date(ad.end_date);
  if (today < start) return "upcoming";
  else if (today > end) return "ended";
  else return "running";
};

// 광고 등록 API  
// ad_content는 S3 연동 후 전달된 이미지 URL을 담는다고 가정합니다.
exports.createAd = async (req, res) => {
  try {
    const { ad_title, ad_content, start_date, end_date, user_id, ad_price } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
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

// 광고 조회 API (특정 post_id에 대해 랜덤으로 반환)
// 단, 현재 날짜가 시작일과 종료일 사이인 광고들 중에서 선택
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

// 광고 정보 조회 API: 동적으로 상태를 계산하여 반환
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

// 신규: 특정 user_id가 등록한 광고 모두 조회 API
exports.getAdsByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const ads = await Ad.findAll({ where: { user_id } });
    const adsWithStatus = ads.map(ad => {
      return { ...ad.toJSON(), status: computeAdStatus(ad) };
    });
    res.json(adsWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
