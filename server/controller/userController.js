const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 회원가입
exports.registerUser = async (req, res) => {
    try {
        const { user_name, user_email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            user_name,
            user_email,
            user_pw_hash: hashedPassword
        });

        res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.', userId: newUser.user_id });
    } catch (error) {
        res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.', error: error.message });
    }
};

// 로그인
exports.loginUser = async (req, res) => {
    try {
        const { user_email, password } = req.body;

        const user = await User.findOne({ where: { user_email } });
        if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

        const isPasswordValid = await bcrypt.compare(password, user.user_pw_hash);
        if (!isPasswordValid) return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });

        const token = jwt.sign({ userId: user.user_id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.status(200).json({ message: '로그인 성공', token });
    } catch (error) {
        res.status(500).json({ message: '로그인 중 오류가 발생했습니다.', error: error.message });
    }
};

// 사용자 정보 조회
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: '사용자 정보 조회 중 오류가 발생했습니다.', error: error.message });
    }
};

// 사용자 정보 수정
exports.updateUserInfo = async (req, res) => {
    try {
        const { user_name, user_email } = req.body;
        const result = await User.update({ user_name, user_email }, { where: { user_id: req.params.userId } });

        if (result[0] === 0) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

        res.status(200).json({ message: '사용자 정보가 성공적으로 수정되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '사용자 정보 수정 중 오류가 발생했습니다.', error: error.message });
    }
};

// 사용자 탈퇴
exports.deleteUser = async (req, res) => {
    try {
        const result = await User.destroy({ where: { user_id: req.params.userId } });
        if (result === 0) return res.status(404).json({ message: '삭제할 사용자를 찾을 수 없습니다.' });

        res.status(200).json({ message: '사용자 계정이 성공적으로 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '사용자 삭제 중 오류가 발생했습니다.', error: error.message });
    }
};