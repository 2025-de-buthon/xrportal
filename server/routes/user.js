const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: 유저
 *   description: 유저 관련 API
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags: [유저]
 *     summary: 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               user_email:
 *                 type: string
 *               user_pw:
 *                 type: string
 *               user_wallet_address:
 *                 type: string
 *               user_token_balance:
 *                 type: number
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/signup', userController.signup);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [유저]
 *     summary: 로그인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *               user_pw:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [유저]
 *     summary: 내 정보 조회
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: User information
 */
router.get('/me', userController.getMe);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [유저]
 *     summary: 전체 유저 목록 조회
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', userController.getAllUsers);

module.exports = router;
