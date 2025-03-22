# 광고 컨트롤러 (app/controllers/adController.js)
const { Ad } = require('../models');

// 광고 등록
exports.createAd = async (req, res) => {
    try {
        const { ad_title, ad_content, start_date, end_date, user_id } = req.body;

        const newAd = await Ad.create({
            ad_title,
            ad_content,
            start_date,
            end_date,
            user_id
        });

        res.status(201).json({ message: '광고가 성공적으로 등록되었습니다.', adId: newAd.ad_id });
    } catch (error) {
        res.status(500).json({ message: '광고 등록 중 오류가 발생했습니다.', error: error.message });
    }
};

// 광고 조회
exports.getAdById = async (req, res) => {
    try {
        const ad = await Ad.findByPk(req.params.adId);
        if (!ad) return res.status(404).json({ message: '광고를 찾을 수 없습니다.' });

        res.status(200).json(ad);
    } catch (error) {
        res.status(500).json({ message: '광고 조회 중 오류가 발생했습니다.', error: error.message });
    }
};

// 광고 클릭
exports.clickAd = async (req, res) => {
    try {
        const ad = await Ad.findByPk(req.params.adId);
        if (!ad) return res.status(404).json({ message: '광고를 찾을 수 없습니다.' });

        ad.click_count += 1;  // 클릭수 증가
        await ad.save();

        res.status(200).json({ message: '광고 클릭이 성공적으로 처리되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '광고 클릭 중 오류가 발생했습니다.', error: error.message });
    }
};