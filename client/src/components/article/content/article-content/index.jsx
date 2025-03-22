import React from 'react';
import { ArticleBtnContainer, ArticleContent, LikeBtn, MintBtn } from '../../article.style';
import MarkdownPreview from '../../../markdown-preview/markdown-preview';

const ArticleContentComponent = ({ setIsMintModalOpen, article }) => {
  return (
    <div>
      <ArticleContent>
        <MarkdownPreview height={null} isBackground={false} markdown={article.post_content}/>
        <ArticleBtnContainer>
          <LikeBtn>Like</LikeBtn>
          <MintBtn onClick={() => setIsMintModalOpen(true)}>Mint</MintBtn>
        </ArticleBtnContainer>
      </ArticleContent>
    </div>
  );
};

export default ArticleContentComponent;