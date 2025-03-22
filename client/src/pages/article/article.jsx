import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/main";
import { ArticlePageWrapper } from "./article.style";
import ArticleComponent from "../../components/article/article";
import { useParams } from "react-router-dom";
import ArticleProfile from "../../components/article-profile/article-profile";
import TransactionComponent from "../../components/transaction/transaction";
import MintModal from "../../components/modal/mint-modal/mint-modal";
import { $api } from "../../utils/axios";
import NotFoundComponent from "../../components/not-found/not-found";
import useUserStore from "../../store/auth";

const ARTICLE = {
  id: 1,
  post_title: "asdasddasdas",
  post_content: "content",
  writer_id: "1",
  owner_id: "1",
  price: 20,
  gas_fee: 0.001,
  view_count: 10,
  createdAt: "2025-03-12",
  sale_status: false,
  likeCount: 4,
  owner_name: "김지민",
  writer_name: "김겸",
};

const ArticlePage = () => {
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [article, setArticle] = useState(null);
  const { user } = useUserStore();
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
    setIsMintModalOpen(false);
  };

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
