import React, { useState } from "react";
import MainLayout from "../../../layouts/main";
import {
  ArticleListContainer,
  HeaderContent,
  HeaderWrapper,
  Wrapper,
} from "./advertisement.style";
import ArticleItemComponent from "../../../components/article-item/article-item";

const ADVERTISEMENT_LIST = [
  {
    id: 1,
    title: "게시글 1",
    content: "게시글 1",
    createdAt: "2025-03-22",
  }
];

const MyAdvertisementPage = () => {
  const [articleType, setArticleType] = useState("OWNED");

  return (
    <MainLayout isSidebar={true} width={1024}>
      <Wrapper>
        <HeaderWrapper>
          <HeaderContent
            onClick={() => setArticleType("OWNED")}
            isFocus={articleType === "OWNED"}
          >
            Owned
          </HeaderContent>
          <HeaderContent
            onClick={() => setArticleType("CREATED")}
            isFocus={articleType === "CREATED"}
          >
            Created
          </HeaderContent>
        </HeaderWrapper>
        <ArticleListContainer>
          {articleType === "CREATED" &&
            CREATED_ARTICLE_LIST.map((article) => (
              <ArticleItemComponent key={article.id} article={article} />
            ))}
          {articleType === "OWNED" &&
            OWNED_ARTICLE_LIST.map((article) => (
              <ArticleItemComponent key={article.id} article={article} />
            ))}
        </ArticleListContainer>
      </Wrapper>
    </MainLayout>
  );
};

export default MyAdvertisementPage;
