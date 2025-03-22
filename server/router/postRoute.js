const express = require('express');
const router = express.Router();
const { createPost, getPost, deletePost, likePost } = require('../controllers/postController');

// 게시글 생성
router.post('/', createPost);

// 게시글 조회
router.get('/:post_id', getPost);

// 게시글 삭제
router.delete('/:post_id', deletePost);

// 게시글 추천
router.post('/:post_id/like', likePost);

module.exports = router;