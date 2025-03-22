import React from "react";
import {
  HeaderBtn,
  HeaderContainer,
  HeaderContentContainer,
  HeaderText,
  HeaderWrapper,
  Logo,
} from "./header.style";
import { isLogin } from "../../utils/auth";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";

const HeaderComponenet = () => {
  const isLoggedIn = isLogin();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderContentContainer>
          <Link to="/">
            <Logo>
              <img src={LogoImg} width={80} alt="logo" />
            </Logo>
          </Link>
          <HeaderText to="/">홈</HeaderText>
        </HeaderContentContainer>

        {isLoggedIn ? (
          <HeaderContentContainer>
            <Link to="/my/articles">
              <HeaderText>MyPage</HeaderText>
            </Link>
            <Link to="/create/article">
              <HeaderBtn>게시글 작성</HeaderBtn>
            </Link>
            <Link to='/advertise/create'>
              <HeaderBtn>광고 게시</HeaderBtn>
            </Link>
          </HeaderContentContainer>
        ) : (
          <HeaderContentContainer>
            <Link to="/signup">
              <HeaderBtn>회원가입</HeaderBtn>
            </Link>
            <Link to="/login">
              <HeaderBtn>로그인</HeaderBtn>
            </Link>
          </HeaderContentContainer>
        )}
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default HeaderComponenet;
