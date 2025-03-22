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

const ARTICLE = {
  post_title: "asdasddasdas",
  post_content: "content",
  writer_id: "1",
  owner_id: "1",
  price: 20,
  gas_fee: 0.001,
  view_count: 10,
  createdAt: "2025-03-22",
  sale_status: false,
  like_count: 4
};

const ArticlePage = () => {
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    fetchArticle(id);
  }, [id]);

  const fetchArticle = async (id) => {
    try{
      const response = await $api.get(`/posts/${id}/read`);

      if (response.data) {
        setArticle(response.data);
      }
    } catch(e) {
      setArticle(ARTICLE);
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
          <ArticleComponent article={article} setIsMintModalOpen={setIsMintModalOpen} />
          <ArticleProfile />
          <TransactionComponent />
        </ArticlePageWrapper>
      ) : (
        <NotFoundComponent />
      )}
    </MainLayout>
  );
};

export default ArticlePage;
