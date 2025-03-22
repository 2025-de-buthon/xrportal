import React from "react";
import { ArticleProfileContainer } from "./article-profile.style";
import ProfileCard from "./profile-card/profile-card";

const WRITER_INFO = {
  type: "WRITER",
  name: "Kimin Kim",
  userId: "0xFE2b...7c18",
};

const OWNER_INFOR = {
  type: "OWNER",
  name: "adasdas",
  userId: "0x12934u1991",
};

const ArticleProfile = () => {
  return (
    <>
      <ArticleProfileContainer>
        <ProfileCard info={WRITER_INFO} />
        <ProfileCard info={OWNER_INFOR} />
      </ArticleProfileContainer>
    </>
  );
};

export default ArticleProfile;
