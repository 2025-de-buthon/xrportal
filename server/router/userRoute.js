const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserInfo, updateUserInfo, deleteUser } = require('../controllers/userController');

// 회원가입
router.post('/register', registerUser);

// 로그인
router.post('/login', loginUser);

// 사용자 정보 조회
router.get('/:userId', getUserInfo);

// 사용자 정보 수정
router.put('/:userId', updateUserInfo);

// 사용자 탈퇴
router.delete('/:userId', deleteUser);

module.exports = router;