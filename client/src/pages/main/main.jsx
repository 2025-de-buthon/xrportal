import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/main";
import {
  HeaderContent,
  HeaderWrapper,
  MainContainer,
  ArticleListContainer,
} from "./main.style";
import ArticleItemComponent from "../../components/article-item/article-item";
import { $api } from "../../utils/axios";
import { Link } from 'react-router-dom';

const ARTICLE_TYPE = [
  { key: "Recent", value: "latest" },
  { key: "Like", value: "likes" },
  { key: "Hot", value: "views" },
  { key: "Sale", value: "sale" },
];


const ARTICLE = [{
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
}];


const MainPage = () => {
  const [articleType, setArticlType] = useState("Recent");
  const [articleList, setArticleList] = useState([]);

  const fetchrticleList = async () => {
    try {
      const response = await $api.get(
        `/posts/all?sort=${ARTICLE_TYPE.find((v) => v.key === articleType).value}`
      );
      if (response.data) {
        setArticleList(response.data);
      } else {
        setArticleList([]);
      }
    } catch (e) {
      console.log(e);
      setArticleList(ARTICLE);
    }
  };

  useEffect(() => {
    fetchrticleList();
  }, [articleType]);

  return (
    <>
      <MainLayout isSidebar={true}>
        <MainContainer>
          <HeaderWrapper>
            {ARTICLE_TYPE.map((v, i) => (
              <HeaderContent
                isFocus={v.key === articleType}
                key={i}
                onClick={() => setArticlType(v.key)}
              >
                {v.key}
              </HeaderContent>
            ))}
          </HeaderWrapper>
          <ArticleListContainer>
            {articleList.map((article) => (
              <Link to={`/article/${article.id}`}>
                <ArticleItemComponent key={article.id} article={article} />
              </Link>
            ))}
          </ArticleListContainer>
        </MainContainer>
      </MainLayout>
    </>
  );
};

export default MainPage;
