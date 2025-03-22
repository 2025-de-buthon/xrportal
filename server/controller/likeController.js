# 추천 컨트롤러 (app/controllers/likeController.js)
const { Post, Comment } = require('../models');

// 게시글 추천
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (!post) return res.status(404).json({ message: '추천할 게시글을 찾을 수 없습니다.' });

        post.likes = (post.likes || 0) + 1;
        await post.save();

        res.status(200).json({ message: '게시글 추천이 성공적으로 처리되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '게시글 추천 중 오류가 발생했습니다.', error: error.message });
    }
};

// 댓글 추천
exports.likeComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);
        if (!comment) return res.status(404).json({ message: '추천할 댓글을 찾을 수 없습니다.' });

        comment.likes = (comment.likes || 0) + 1;
        await comment.save();

        res.status(200).json({ message: '댓글 추천이 성공적으로 처리되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '댓글 추천 중 오류가 발생했습니다.', error: error.message });
    }
};