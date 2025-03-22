import React, { useEffect, useState } from "react";
import {
  AdWrapper,
  ArticleContainer,
  ArticleHeader,
  ArticleInfoContainer,
  MintBtn,
  Profile,
} from "./article.style";
import ArticleContentComponent from "./content/article-content";
import CommentListComponent from "./comment-list/comment-list";
import { Link } from "react-router-dom";
import { $api } from "../../utils/axios";

const AD = {
  click_count: 12,
  id: 2,
  ad_title: "Ad",
  ad_content:
    "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13262118&filePath=L2Rpc2sxL25ld2RhdGEvMjAyMC8yMS9DTFMxMDAwNi82MmZhMWExMy03ZjRmLTQ1NWMtYTZlNy02ZTk2YjhjMjBkYTk=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006",
  start_date: "2025-03-22",
  end_date: "2025-04-10",
  user_id: 1,
  ad_price: 123,
  createdAt: "2025-03-02",
};

const ArticleComponent = ({ setIsMintModalOpen, article, onClickLike }) => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    if (!article && !article.id) return;

    fetchAd(article.id);
  }, [article.id]);

  const fetchAd = async (id) => {
    try {
      const response = await $api.get(`/ads/${id}/read`);
      if (response.data) {
        setAd(response.data);
      }
    } catch (e) {
      setAd(AD);
    }
  };

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
            👍🏼 {article.likeCount}
          </span>
          {article.sale_status && (
            <span style={{ color: "#28A745", textDecoration: "underline" }}>
              {article.price} DBT
            </span>
          )}
        </ArticleInfoContainer>
        {!article.sale_status && (
          <Link to={`/article/sell/${article.id}`}>
            <MintBtn style={{ position: "absolute", top: "0", right: "0" }}>
              Sell
            </MintBtn>
          </Link>
        )}
      </ArticleHeader>
      <ArticleContentComponent
        setIsMintModalOpen={setIsMintModalOpen}
        article={article}
        onClickLike={onClickLike}
      />
      <CommentListComponent articleId={article.id} />
      {ad ? (
        <AdWrapper isBorder={!ad}>
          <img src={ad.ad_content} alt="ad" />
        </AdWrapper>
      ) : (
        <AdWrapper isBorder={!!ad}>
          🚀 XRPL 기반 광고 | 빠르고 저렴한 트랜잭션
        </AdWrapper>
      )}
    </ArticleContainer>
  );
};

export default ArticleComponent;
