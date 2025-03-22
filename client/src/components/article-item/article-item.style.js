import styled from '@emotion/styled';

export const ArticleItemContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;

  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`;

export const ArticleLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  font-size: 16px;
  color: #DDD;
`;

export const ArticleRightContent = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
`

export const IconBtn = styled.div`
  cursor: pointer;
`