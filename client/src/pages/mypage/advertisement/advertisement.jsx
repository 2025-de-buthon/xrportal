import React, { useState } from "react";
import MainLayout from "../../../layouts/main";
import {
  ArticleListContainer,
  HeaderContent,
  HeaderWrapper,
  Wrapper,
} from "./advertisement.style";
import AdvertisementItemComponent from "../../../components/advertisement-item/advertisement-item";
import { Link } from "react-router-dom";
import useUserStore from "../../../store/auth";
import { $api } from "../../../utils/axios";

const ADVERTISEMENT_TYPE = ["ALL", "ACTIVE", "DEACTIVE"];

const MyAdvertisementPage = () => {
  // ACTIVE, DEACTIVE, ALL
  const [advertisementType, setAdvertisementType] = useState("ALL");
  const [advertisementList, setAdvertisementList] = useState([]);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user && !user.id) return;

    fetchAds(user.id);
  }, [user]);

  const fetchAds = async (userId) => {
    try {
      const response = await $api.get(`/ads/user/${userId}`);

      if (response.data) {
        setAdvertisementList(
          response.data.filter((v) =>
            advertisementType === "ALL" ? true : v.status === advertisementType
          )
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

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
