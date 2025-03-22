import React from 'react';
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw"; // 추가된 부분
import "highlight.js/styles/a11y-dark.css";
import { MarkdownPreviewContainer } from './markdown-preview.style';

const MarkdownPreview = ({ markdown }) => {
  return (
    <MarkdownPreviewContainer>
      <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
        {markdown}
      </ReactMarkdown>
    </MarkdownPreviewContainer>
  );
};

export default MarkdownPreview;