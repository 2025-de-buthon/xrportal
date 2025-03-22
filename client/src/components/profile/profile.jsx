import React from "react";
import {
  Container,
  ProfileImgContainer,
  ProfileInfoContainer,
} from "./profile.style";
import useUserStore from "../../store/auth";
import { LoginText } from "../sidebar/sidebar.style";
import { Link } from "react-router-dom";

const ProfileComponent = () => {
  const { user } = useUserStore();

  return (
    <Container>
      {user ? (
        <>
          <ProfileImgContainer></ProfileImgContainer>
          <ProfileInfoContainer>
            <span style={{ fontSize: "14px", color: "white" }}>
              Profile Name
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "4px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#8000FF" }}>3 DBT</span>
              <span style={{ fontSize: "14px", color: "#8000FF" }}>3 XRP</span>
            </div>
          </ProfileInfoContainer>
        </>
      ) : (
        <Link style={{ textDecoration: false }} to="/login">
          <LoginText>로그인</LoginText>
        </Link>
      )}
    </Container>
  );
};

export default ProfileComponent;
