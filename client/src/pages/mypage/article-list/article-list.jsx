import React, { useEffect, useState } from "react";
import MainLayout from "../../../layouts/main";
import {
  ArticleListContainer,
  HeaderContent,
  HeaderWrapper,
  Wrapper,
} from "./article-list.style";
import ArticleItemComponent from "../../../components/article-item/article-item";
import useUserStore from "../../../store/auth";
import { Link } from 'react-router-dom';

const ARTICLE = [
  {
    id: 1,
    post_title: "asdasddasdas",
    post_content: "content",
    writer_id: "1",
    owner_id: "1",
    price: 20,
    gas_fee: 0.001,
    view_count: 10,
    createdAt: "2025-03-22",
    sale_status: false,
    likeCount: 4,
    owner_name: "김지민",
    writer_name: "김겸",
  },
];

const MyArticleListPage = () => {
  const [articleType, setArticleType] = useState("OWNED");
  const [articleList, setArticleList] = useState([]);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) return;

    setArticleList(ARTICLE);
  }, [articleType]);

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
          {articleList.map((article) => (
            <Link to={`/article/${article.id}`}>
              <ArticleItemComponent key={article.id} article={article} />
            </Link>
          ))}
        </ArticleListContainer>
      </Wrapper>
    </MainLayout>
  );
};

export default MyArticleListPage;
