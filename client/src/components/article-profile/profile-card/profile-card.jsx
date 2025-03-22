import React from 'react';
import { ProfileCardContainer, ProfileCardContent } from "./profile-card.style";


const ProfileCard = ({info}) => {
  return (
    <ProfileCardContainer>
      <h2>{info.type === 'OWNER' ? 'Owner': "Writer"}</h2>
      <ProfileCardContent>
        <img src="" alt="profile"></img>
        <div className="profileInfo">
          <span className="name">{info.name}</span>
          <span className="id">{info.userId}</span>
        </div>
      </ProfileCardContent>
    </ProfileCardContainer>
  );
};

export default ProfileCard;