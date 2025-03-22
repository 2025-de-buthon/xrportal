const express = require('express');
const router = express.Router();
const { createAd, getAdById, clickAd } = require('../controllers/adController');

// 광고 등록
router.post('/', createAd);

// 광고 조회
router.get('/:adId', getAdById);

// 광고 클릭
router.post('/:adId/click', clickAd);

module.exports = router;