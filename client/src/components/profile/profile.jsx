import React from 'react';
import { Container, ProfileImgContainer, ProfileInfoContainer } from './profile.style';

const ProfileComponent = () => {
  return (
    <Container>
      <ProfileImgContainer></ProfileImgContainer>
      <ProfileInfoContainer>
        <span style={{ fontSize: "14px", color: "white" }}>Profile Name</span>
        <span style={{ fontSize: "14px", color: "#8000FF" }}>3 XRP</span>
      </ProfileInfoContainer>
    </Container>
  );
};

export default ProfileComponent;