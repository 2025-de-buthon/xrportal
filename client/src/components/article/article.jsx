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

const ArticleComponent = ({ setIsMintModalOpen, article }) => {
  return (
    <ArticleContainer>
      <ArticleHeader>
        <h1>{article.post_title}</h1>
        <ArticleInfoContainer>
          <Profile>
            <img src="" alt="profile" />
            <span>{article.writer_id}</span>
          </Profile>
          <span>0xFE2b...7c18</span>
          <span>{article.createdAt}</span>
          <span style={{ color: "#CCC", textDecoration: "underline" }}>
            👁 {article.view_count}
          </span>
          <span style={{ color: "#CCC", textDecoration: "underline" }}>
            👍🏼 {article.like_count}
          </span>
          {article.sale_status && (
            <span style={{ color: "#28A745", textDecoration: "underline" }}>
              3 DBT
            </span>
          )}
        </ArticleInfoContainer>
      </ArticleHeader>
      <ArticleContentComponent
        setIsMintModalOpen={setIsMintModalOpen}
        article={article}
      />
      <CommentListComponent />
      <AdWrapper>🚀 XRPL 기반 광고 | 빠르고 저렴한 트랜잭션</AdWrapper>
    </ArticleContainer>
  );
};

export default ArticleComponent;
