import React from "react";
import { ArticleItemContainer, ArticleLeftContent, ArticleRightContent, IconBtn } from "./article-item.style";
import MoreIcon from "../../assets/more-icon";
import ArrowIcon from '../../assets/arrow-icon';

const ArticleItemComponent = ({ article }) => {
  return (
    <ArticleItemContainer>
      <ArticleLeftContent>
        <span>{article.title}</span>
        <span>{article.createdAt}</span>
      </ArticleLeftContent>
      <ArticleRightContent>
        <IconBtn>
          <MoreIcon color={"#dddddd"} width={16} height={16} />
        </IconBtn>
        <IconBtn>
          <ArrowIcon color={"#dddddd"} width={16} height={16} rotate={270} />
        </IconBtn>
      </ArticleRightContent>
    </ArticleItemContainer>
  );
};

export default ArticleItemComponent;
