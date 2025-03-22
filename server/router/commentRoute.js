const express = require('express');
const router = express.Router();
const { createComment, getCommentsByPostId, likeComment } = require('../controllers/commentController');

// 댓글 생성
router.post('/', createComment);

// 댓글 조회 (특정 게시글의 모든 댓글)
router.get('/:postId', getCommentsByPostId);

// 댓글 추천
router.post('/:commentId/like', likeComment);

module.exports = router;