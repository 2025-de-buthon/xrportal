import React from "react";
import {
  ArticleItemContainer,
  ArticleLeftContent,
  ArticleRightContent,
  CountText,
  IconBtn,
  ProfileInfoContainer,
} from "./article-item.style";
import MoreIcon from "../../assets/more-icon";
import ArrowIcon from "../../assets/arrow-icon";

const ArticleItemComponent = ({ article }) => {
  return (
    <ArticleItemContainer>
      <ArticleLeftContent>
        <span>{article.title}</span>
        <ProfileInfoContainer>
          <img src="" alt="profile"></img>
          <span>{article.userName}</span>
          <span>{article.createdAt}</span>
        </ProfileInfoContainer>
      </ArticleLeftContent>
      <ArticleRightContent>
        <CountText>👁 {article.viewCount}</CountText>
        <CountText>👍🏼 {article.likeCount}</CountText>
        <CountText isAmount={true}>{article.amount} XRP</CountText>
      </ArticleRightContent>
    </ArticleItemContainer>
  );
};

export default ArticleItemComponent;
