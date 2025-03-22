const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

/**
 * @swagger
 * tags:
 *   name: 광고
 *   description: 광고 관련 API
 */

/**
 * @swagger
 * /ads/create:
 *   post:
 *     tags: [광고]
 *     summary: 광고 등록 API
 *     description: 광고 제목, S3 이미지 URL (ad_content), 시작 날짜(YYYY-MM-DD), 종료 날짜(YYYY-MM-DD), 광고비, user_id를 입력하여 광고 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ad_title:
 *                 type: string
 *               ad_content:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 example: "2025-04-01"
 *               end_date:
 *                 type: string
 *                 example: "2025-04-30"
 *               user_id:
 *                 type: integer
 *               ad_price:
 *                 type: number
 *     responses:
 *       201:
 *         description: 광고 등록 성공
 */
router.post('/create', adController.createAd);

/**
 * @swagger
 * /ads/{post_id}/read:
 *   get:
 *     tags: [광고]
 *     summary: 광고 조회 API
 *     description: 특정 게시글에 대해 현재 진행 중(running)인 광고 중 랜덤으로 하나 반환합니다.
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 랜덤 광고 반환
 */
router.get('/:post_id/read', adController.readAd);

/**
 * @swagger
 * /ads/{ad_id}/detail:
 *   get:
 *     tags: [광고]
 *     summary: 광고 게시글 조회 API
 *     description: 특정 광고에 대해 각 게시글(post_id)별 클릭 수를 집계하여 반환합니다.
 *     parameters:
 *       - in: path
 *         name: ad_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 광고 ID
 *     responses:
 *       200:
 *         description: 광고 클릭 정보 목록 반환
 */
router.get('/:ad_id/detail', adController.adDetail);

/**
 * @swagger
 * /ads/{ad_id}/click:
 *   post:
 *     tags: [광고]
 *     summary: 광고 클릭 API
 *     description: 광고 클릭 시 ad_id, post_id, user_id를 입력받아 클릭 기록을 생성하고 광고의 클릭 수를 증가시킵니다.
 *     parameters:
 *       - in: path
 *         name: ad_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 광고 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: 광고 클릭 성공
 */
router.post('/:ad_id/click', adController.clickAd);

/**
 * @swagger
 * /ads/{ad_id}/views:
 *   get:
 *     tags: [광고]
 *     summary: 광고 정보 조회 API
 *     description: 광고 등록 시 입력된 정보와 현재까지의 클릭 수, 동적으로 계산된 상태를 반환합니다.
 *     parameters:
 *       - in: path
 *         name: ad_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 광고 ID
 *     responses:
 *       200:
 *         description: 광고 정보 반환
 */
router.get('/:ad_id/views', adController.viewAd);

/**
 * @swagger
 * /ads/user/{user_id}:
 *   get:
 *     tags: [광고]
 *     summary: 사용자 등록 광고 조회 API
 *     description: 특정 사용자(user_id)가 등록한 모든 광고를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 사용자 등록 광고 목록 반환
 */
router.get('/user/:user_id', adController.getAdsByUser);

module.exports = router;
