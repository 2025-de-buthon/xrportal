const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/**
 * @swagger
 * tags:
 *   name: 게시글
 *   description: 게시글 관련 API
 */

/**
 * @swagger
 * /posts/create:
 *   post:
 *     tags: [게시글]
 *     summary: 게시글 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_title:
 *                 type: string
 *               post_content:
 *                 type: string
 *               writer_id:
 *                 type: integer
 *               owner_id:
 *                 type: integer
 *               price:
 *                 type: number
 *               gas_fee:
 *                 type: number
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post('/create', postController.createPost);

/**
 * @swagger
 * /posts/{post_id}/read:
 *   get:
 *     tags: [게시글]
 *     summary: 게시글 조회 (조회수 증가 포함)
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 */
router.get('/:post_id/read', postController.readPost);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     tags: [게시글]
 *     summary: 게시글 검색
 *     parameters:
 *       - in: query
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: 검색할 텍스트
 *     responses:
 *       200:
 *         description: List of posts matching the search criteria
 */
router.get('/search', postController.searchPosts);

/**
 * @swagger
 * /posts/{post_id}/purchase:
 *   post:
 *     tags: [게시글]
 *     summary: 게시글 구매 API
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID (nft_id)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyer_id:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Post purchased successfully
 */
router.post('/:post_id/purchase', postController.purchasePost);

/**
 * @swagger
 * /posts/{post_id}/like:
 *   post:
 *     tags: [게시글]
 *     summary: 게시글 좋아요 API
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Post liked successfully
 */
router.post('/:post_id/like', postController.likePost);

module.exports = router;
