# 라우트 설정 (app/routes/likeRoutes.js)
const express = require('express');
const router = express.Router();
const { likePost, likeComment } = require('../controllers/likeController');

// 게시글 추천
router.post('/posts/:postId', likePost);

// 댓글 추천
router.post('/comments/:commentId', likeComment);

module.exports = router;