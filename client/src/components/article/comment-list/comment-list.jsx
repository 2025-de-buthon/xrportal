import React from "react";
import {
  CommentContainer,
  CommentInputForm,
  CommentItemContainer,
  CommentList,
  CommentWrapper,
  ProfileContainer,
  RespondBtnContainer,
} from "./comment-list.style";

const COMMENTS = [
  {
    id: 1,
    name: "asdaasd",
    userId: "0x1238581",
    comment: "사용자1: 좋은 정보 감사합니다!",
    createdAt: "2025년 3월 25일",
    likeCount: 7,
  },
  {
    id: 2,
    name: "asdaasd",
    userId: "0x12385810x12385810x12385810x1238581",
    comment: "사용자1: 좋은 정보 감사합니다!",
    createdAt: "2025년 3월 25일",
    likeCount: 7,
  },
  {
    id: 3,
    name: "asdaasd",
    userId: "0x1238581",
    comment: "사용자1: 좋은 정보 감사합니다!",
    createdAt: "2025년 3월 25일",
    likeCount: 7,
  },
];

const CommentItem = ({ comment }) => {
  console.log(comment);

  return (
    <CommentItemContainer>
      <ProfileContainer>
        <img src="" alt="profile" />
        <div className="profileInfo">
          <span style={{ color: "#FFFFFF" }}>{comment.name}</span>
          <span style={{ color: "#AAAAAA" }}>{comment.userId}</span>
        </div>
      </ProfileContainer>
      <CommentContainer>
        <div className="commentHeader">
          <span className="createdAt">{comment.createdAt}</span>
          <span className="like">👍🏼 {comment.likeCount}</span>
        </div>
        <div className="content">{comment.comment}</div>
      </CommentContainer>
    </CommentItemContainer>
  );
};

const CommentListComponent = () => {
  return (
    <CommentWrapper>
      <CommentInputForm>
        <h2>Comments</h2>
        <textarea
          resize={false}
          multiline={true}
          placeholder="댓글을 입력하세요."
        ></textarea>
        <RespondBtnContainer>
          <button>Respond</button>
        </RespondBtnContainer>
      </CommentInputForm>
      <CommentList>
        {COMMENTS.map((v, i) => (
          <CommentItem comment={v} key={i} />
        ))}
      </CommentList>
    </CommentWrapper>
  );
};

export default CommentListComponent;
