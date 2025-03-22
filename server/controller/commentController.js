const { Comment } = require('../models');

// 댓글 생성
exports.createComment = async (req, res) => {
    try {
        const { post_id, user_id, comment_content } = req.body;
        const newComment = await Comment.create({ post_id, user_id, comment_content });
        res.status(201).json({ message: '댓글이 성공적으로 생성되었습니다.', commentId: newComment.comment_id });
    } catch (error) {
        res.status(500).json({ message: '댓글 생성 중 오류가 발생했습니다.', error: error.message });
    }
};

// 댓글 조회 (특정 게시글의 모든 댓글)
exports.getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { post_id: req.params.postId } });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: '댓글 조회 중 오류가 발생했습니다.', error: error.message });
    }
};

// 댓글 추천
exports.likeComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);
        if (!comment) return res.status(404).json({ message: '추천할 댓글을 찾을 수 없습니다.' });

        comment.likes = (comment.likes || 0) + 1;  // 추천수 증가
        await comment.save();

        res.status(200).json({ message: '댓글 추천이 성공적으로 처리되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '댓글 추천 중 오류가 발생했습니다.', error: error.message });
    }
};