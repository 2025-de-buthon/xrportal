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
    post_id: 1,
    user_id: 1,
    comment_content: "content",
    createdAt: "2025-03-12",
    likeCount: 190,
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

const CommentListComponent = ({ articleId }) => {
  const { user } = useUserStore();
  const [comments, setComments] = useState([]);
  const [commentInputValue, setCommentInputValue] = useState('');

  useEffect(() => {
    if (!articleId) return;
    fetchComments(articleId);
  }, [articleId]);

  const fetchComments = async (id) => {
    try {
      const response = await $api.get(`/comments/${id}/read`);
      if (response.data) {
        setComments(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmitComment = async (e)=> {
    e.preventDefault();
    
    if(!commentInputValue && !user && !articleId) return;

    try {
      const _ = await $api.post('/comments/create', {
        post_id: articleId,
        user_id: user.id,
        comment_content: commentInputValue
      })

      fetchComments();
    } catch(e) {
      console.error('failed to comment submit')
    }
  }

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
