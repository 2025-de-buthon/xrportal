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

const ArticleProfile = ({ article }) => {
  const writerInfo = {
    type: "WRITER",
    name: article.writer_name,
    userId: article.writer_id,
  };

  const ownerInfo = {
    type: "OWNER",
    name: article.owner_name,
    userId: article.owner_id,
  };

  return (
    <>
      <ArticleProfileContainer>
        <ProfileCard info={writerInfo} />
        <ProfileCard info={ownerInfo} />
      </ArticleProfileContainer>
    </>
  );
};

export default ArticleProfile;
