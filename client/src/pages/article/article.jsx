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

  const closeMintModal = () => {
    setIsMintModalOpen(false)
  }

  return (
    <MainLayout isSidebar={false} width={800}>
      {isMintModalOpen && <MintModal closeMintModal={closeMintModal}/>}
      <ArticlePageWrapper>
        <ArticleComponent setIsMintModalOpen={setIsMintModalOpen} />
        <ArticleProfile />
        <TransactionComponent />
      </ArticlePageWrapper>
    </MainLayout>
  );
};

export default ArticlePage;
