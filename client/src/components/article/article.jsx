import React from "react";
import {
  AdWrapper,
  ArticleContainer,
  ArticleHeader,
  ArticleInfoContainer,
  Profile,
} from "./article.style";
import ArticleContentComponent from "./content/article-content";
import CommentListComponent from "./comment-list/comment-list";

const ArticleComponent = () => {
  return (
    <ArticleContainer>
      <ArticleHeader>
        <h1>XRPL을 활용한 블로그의 미래</h1>
        <ArticleInfoContainer>
          <Profile>
            <img src="" alt="profile" />
            <span>jiminkim</span>
          </Profile>
          <span>0xFE2b...7c18</span>
          <span>3월 12일</span>
          <span style={{ color: "#CCC", textDecoration: "underline" }}>
            👁 385
          </span>
          <span style={{ color: "#CCC", textDecoration: "underline" }}>
            👍🏼 7
          </span>
          <span style={{ color: "#28A745", textDecoration: "underline" }}>
            3 XRP
          </span>
        </ArticleInfoContainer>
      </ArticleHeader>
      <ArticleContentComponent />
      <CommentListComponent />
      <AdWrapper>🚀 XRPL 기반 광고 | 빠르고 저렴한 트랜잭션</AdWrapper>
    </ArticleContainer>
  );
};

export default ArticleComponent;
