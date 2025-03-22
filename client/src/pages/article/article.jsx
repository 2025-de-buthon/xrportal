import React, { useState } from "react";
import MainLayout from "../../layouts/main";
import { ArticlePageWrapper } from "./article.style";
import ArticleComponent from "../../components/article/article";
import { useParams } from "react-router-dom";
import ArticleProfile from "../../components/article-profile/article-profile";
import TransactionComponent from "../../components/transaction/transaction";
import MintModal from '../../components/modal/mint-modal/mint-modal';

const ARTICLE = {
  id: "1",
  title: "김겸 바보",
  description:
    "김겸 바보 김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보김겸 바보",
  createdAt: "2025-03-22",
  writer: "asdasdsa",
  viewCount: 128,
  likeCount: 12,
  price: 3,
};

const ArticlePage = () => {
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    fetchArticle(id);
  }, [id]);

  const fetchArticle = async (id) => {
    try {
      const response = await $api.get(`/posts/${id}/read`);

      if (response.data) {
        setArticle(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClickLike = async (id) => {
    if (!id && !user) return;

    try {
      const _ = await $api.post(`/comments/${id}/likes`, {
        user_id: user.id,
      });

      fetchArticle();
    } catch (e) {
      console.error("like post error");
    }
  };

  const closeMintModal = () => {
    setIsMintModalOpen(false)
  }

  return (
    <MainLayout isSidebar={false} width={800}>
      {isMintModalOpen && <MintModal closeMintModal={closeMintModal} />}
      {article ? (
        <ArticlePageWrapper>
          <ArticleComponent
            article={article}
            setIsMintModalOpen={setIsMintModalOpen}
            onClickLike={onClickLike}
          />
          <ArticleProfile article={article} />
          <TransactionComponent articleId={article.id}/>
        </ArticlePageWrapper>
      ) : (
        <NotFoundComponent />
      )}
    </MainLayout>
  );
};

export default ArticlePage;
