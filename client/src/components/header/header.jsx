import React from 'react';
import { HeaderBtn, HeaderContainer, HeaderContentContainer, HeaderText, HeaderWrapper, Logo } from './header.style';

const HeaderComponenet = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderContentContainer>
          <Logo>Logo</Logo>
          <HeaderText>홈</HeaderText>
          <HeaderText>게시물 목록</HeaderText>
        </HeaderContentContainer>
        <HeaderContentContainer>
          <HeaderText>MyPage</HeaderText>
          <HeaderBtn>게시글 작성</HeaderBtn>
          <HeaderBtn>광고 게시</HeaderBtn>
        </HeaderContentContainer>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default HeaderComponenet;