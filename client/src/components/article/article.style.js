import styled from '@emotion/styled';

export const ArticleContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: #222222;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px;

  display: flex;
  flex-direction: column;
  row-gap: 24px;
`

export const ArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  color: #dddddd;

  h1 {
    font-size: 28px;
    font-weight: bold;
  }
`

export const ArticleInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;

  span {
    font-size: 14px;
    color: #AAAAAA;
  }
`

export const Profile = styled.div`
  display : flex;
  column-gap: 4px;
  align-items: center;
  color: #7d7d7d;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
  }
`

export const ArticleContent = styled.div`
  width: 100%;
  font-size: 16px;
  color: #DDDDDD;
  display: flex;
  flex-direction: column;
  row-gap: 24px;

`

export const ArticleBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;

  button {
    border: none;
    border-radius: 6px;
    cursor: pointer;
    padding: 10px 16px;
    color: white;
  }
`

export const LikeBtn = styled.button`
  background-image: linear-gradient(to right, #FF4757, #FF6B81);
`

export const MintBtn = styled.button`
  background-image: linear-gradient(to right, #1E90FF, #7B43E6);
`

export const AdWrapper = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  color: #DDDDDD;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`