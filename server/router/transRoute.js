# 라우트 설정 (app/routes/transactionRoutes.js)
const express = require('express');
const router = express.Router();
const { createTransaction, getTransactionById } = require('../controllers/transactionController');

// 거래 생성
router.post('/', createTransaction);

// 거래 조회
router.get('/:transactionId', getTransactionById);

module.exports = router;