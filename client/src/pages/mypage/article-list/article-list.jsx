import React, { useState } from "react";
import MainLayout from "../../../layouts/main";
import {
  AricleListContainer,
  HeaderContent,
  HeaderWrapper,
  Wrapper,
} from "./article-list.style";
import ArticleItemComponent from "../../../components/article-item/article-item";

const OWNED_ARTICLE_LIST = [
  {
    id: 1,
    title: "게시글 1",
    content: "게시글 1",
    createdAt: "2025-03-22",
  },
  {
    id: 2,
    title: "게시글 2",
    content: "게시글 2",
    createdAt: "2025-03-22",
  },
  {
    id: 3,
    title: "게시글 3",
    content: "게시글 3",
    createdAt: "2025-03-22",
  },
];

const CREATED_ARTICLE_LIST = [
  {
    id: 1,
    title: "생성 게시글 1",
    content: "생성게시글 1",
    createdAt: "2025-03-22",
  },
  {
    id: 2,
    title: "생성 게시글 2",
    content: "생성 게시글 2",
    createdAt: "2025-03-22",
  },
  {
    id: 3,
    title: "생성 게시글 3",
    content: "생성 게시글 3",
    createdAt: "2025-03-22",
  },
];

const MyArticleListPage = () => {
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
        <AricleListContainer>
          {articleType === "CREATED" &&
            CREATED_ARTICLE_LIST.map((article) => (
              <ArticleItemComponent key={article.id} article={article} />
            ))}
          {articleType === "OWNED" &&
            OWNED_ARTICLE_LIST.map((article) => (
              <ArticleItemComponent key={article.id} article={article} />
            ))}
        </AricleListContainer>
      </Wrapper>
    </MainLayout>
  );
};

export default MyArticleListPage;
