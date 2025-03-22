const { Post } = require('../models');

// 게시글 생성
exports.createPost = async (req, res) => {
    try {
        const { post_title, post_content, writer_id } = req.body;
        const newPost = await Post.create({ post_title, post_content, writer_id });
        res.status(201).json({ message: '게시글이 성공적으로 생성되었습니다.', postId: newPost.post_id });
    } catch (error) {
        res.status(500).json({ message: '게시글 생성 중 오류가 발생했습니다.', error: error.message });
    }
};

// 게시글 조회
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (!post) return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });

        post.view_count += 1;  // 조회수 증가
        await post.save();

        res.status(200).json({
            post_id: post.post_id,
            post_title: post.post_title,
            post_content: post.post_content,
            view_count: post.view_count,
            likes: post.likes || 0,
            created_at: post.created_at,
            writer_id: post.writer_id
        });
    } catch (error) {
        res.status(500).json({ message: '게시글 조회 중 오류가 발생했습니다.', error: error.message });
    }
}

// 게시글 삭제
exports.deletePost = async (req, res) => {
    try {
        const result = await Post.destroy({ where: { post_id: req.params.postId } });
        if (result === 0) return res.status(404).json({ message: '삭제할 게시글을 찾을 수 없습니다.' });

        res.status(200).json({ message: '게시글이 성공적으로 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '게시글 삭제 중 오류가 발생했습니다.', error: error.message });
    }
};

// 게시글 추천
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (!post) return res.status(404).json({ message: '추천할 게시글을 찾을 수 없습니다.' });

        post.likes = (post.likes || 0) + 1;  // 추천수 증가
        await post.save();

        res.status(200).json({ message: '게시글 추천이 성공적으로 처리되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '게시글 추천 중 오류가 발생했습니다.', error: error.message });
    }
};