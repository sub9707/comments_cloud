import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CommentData, ReplyData } from "../../types/BoardTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/Modal";
import CommentReplyCard from "./CommentReplyCard";
import { addMessage } from "../../store/Alert";
import { ChangeEvent, useMemo, useState, useEffect } from "react";
import {
  updateReply,
  deleteReply,
  fetchReplies,
} from "../../store/DataThunk/RepliesSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  checkReplyCheck,
  getAllComments,
  getCommentsCount,
  postReplyCancelLike,
  postReplyLike,
  writeComment,
} from "../../api/ErrorBoard";
import { Button, Form, InputGroup } from "react-bootstrap";

type CommentCardStateTpye = {
  cur: number;
  board: number;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CommentCard(props: ReplyData & CommentCardStateTpye) {
  const [replyLiked, setReplyLiked] = useState<boolean>(false);
  const [toggleUpdate, setToggleUpdate] = useState<number>(-1);
  const [commentsData, setCommentsData] = useState<CommentData[]>([]);
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [viewComments, setviewComments] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
  const [replyClickData, setReplyClickData] = useState<number>(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  const {
    content,
    likes,
    profileImg,
    write_date,
    writer_id,
    cur,
    id,
    board,
    nickname,
  } = props;
  const [likesNum, setLikesNum] = useState<number>(likes);
  const [inputValue, setInputValue] = useState<string>(content);
  const memoizedContent = useMemo(() => {
    return inputValue;
  }, [inputValue]);
  const handleProfileClick = () => {
    navigate(`/user/${writer_id}`);
    dispatch(closeModal());
  };
  const handleUpdateToggle = () => {
    if (toggleUpdate === cur) {
      setToggleUpdate(-1);
      setInputValue(content);
    } else {
      setToggleUpdate(cur);
    }
  };
  const handleUpdateFunc = async () => {
    dispatch(updateReply({ replyId: id, content: inputValue }));
    setToggleUpdate(-1);
    dispatch(
      addMessage({
        id: "unique_id",
        text: `댓글이 수정되었습니다`,
        type: "success",
      })
    );
  };
  const handleUpdateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleDeleteFunc = async () => {
    try {
      dispatch(deleteReply(id));
      dispatch(
        addMessage({
          id: "unique_id",
          text: `댓글이 삭제되었습니다`,
          type: "success",
        })
      );
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(fetchReplies(board));
    }
  };

  const handleViewReplies = async () => {
    const result = await getAllComments(id);
    setCommentsData(result);
    setviewComments(true);
  };

  const getCountFunc = async (contentId: number) => {
    const result = await getCommentsCount(contentId);
    setCommentsCount(result);
  };

  const submitCommentData = async () => {
    try {
      await writeComment(id, 3, commentInput);
      alert("댓글이 등록되었습니다.");
      setCommentInput("");
    } catch (err) {
      console.error(err);
    } finally {
      handleViewReplies();
    }
  };
  const handleCancelComment = () => {
    setCommentInput("");
    setReplyClickData(-1);
  };

  const handleLikeClick = async () => {
    if (replyLiked) {
      await postReplyCancelLike(id, 2);
      setReplyLiked(false);
      setLikesNum(likesNum - 1);
    } else {
      await postReplyLike(id, 2);
      setReplyLiked(true);
      setLikesNum(likesNum + 1);
    }
  };

  useEffect(() => {
    getCountFunc(id);
  }, [id]);

  useEffect(() => {
    const checkLiked = async () => {
      const response = await checkReplyCheck(id, 2);
      if (response.isLiked) {
        setReplyLiked(true);
      } else {
        setReplyLiked(false);
      }
    };
    checkLiked();
  }, [id]);

  return (
    <CardContainer>
      <CardLeft>
        <CardProfile
          src={profileImg || "/images/Default_ProfileImg.png"}
          alt="프로필 Img"
        />
        <CommentLikes>
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="2x"
            color={replyLiked ? "black" : "grey"}
            style={{ cursor: "pointer", scale: "0.8", opacity: 0.8 }}
            onClick={handleLikeClick}
          />
          <LikeNum>{likesNum}</LikeNum>
        </CommentLikes>
      </CardLeft>
      <CardRight>
        <CardInfoArea>
          <WriterWrapper>
            <InfoText
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}>
              {nickname}
            </InfoText>
            <InfoText>{write_date}</InfoText>
          </WriterWrapper>
          <ControlWrapper>
            <InfoText onClick={handleUpdateToggle}>
              {toggleUpdate === -1 ? "수정" : "취소"}
            </InfoText>
            <InfoText
              onClick={
                toggleUpdate === -1 ? handleDeleteFunc : handleUpdateFunc
              }>
              {toggleUpdate === -1 ? "삭제" : "완료"}
            </InfoText>
          </ControlWrapper>
        </CardInfoArea>
        {toggleUpdate === cur && (
          <CommentArea>
            <input
              type="text"
              value={inputValue}
              onChange={handleUpdateChange}
            />
          </CommentArea>
        )}
        {toggleUpdate < 0 && <CommentArea>{memoizedContent}</CommentArea>}

        <CommentContol>
          <InfoText
            style={{ marginLeft: "1em", marginTop: "1em", cursor: "pointer" }}
            onClick={() => setReplyClickData(cur)}>
            답글달기
          </InfoText>
          {commentsCount > 0 ? (
            <InfoText
              style={{
                marginLeft: "1em",
                marginTop: "1em",
                cursor: "pointer",
                display: viewComments ? "none" : "flex",
              }}
              onClick={handleViewReplies}>
              답글보기({commentsCount})
            </InfoText>
          ) : null}
        </CommentContol>
        <CommentReplyArea>
          {commentsData?.map((data, _idx) => (
            <CommentReplyCard
              key={_idx}
              {...data}
              handleViewReplies={handleViewReplies}
            />
          ))}
        </CommentReplyArea>
        {cur === replyClickData ? (
          <CommentReplyArea>
            <InputGroup>
              <Form.Control
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="댓글 입력"
              />
              <Button variant="primary" onClick={submitCommentData}>
                등록
              </Button>
              <Button variant="outline-primary" onClick={handleCancelComment}>
                취소
              </Button>
            </InputGroup>
          </CommentReplyArea>
        ) : null}
      </CardRight>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 100%;
  min-height: 3em;
  height: auto;
  display: flex;
  margin-bottom: 1em;
`;

const CardLeft = styled.div`
  width: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CardRight = styled.div`
  width: 95%;
  display: block;
`;

const CardProfile = styled.img`
  width: 3em;
  height: 3em;
  border-radius: 50%;
  background-color: black;
`;

const CommentLikes = styled.div`
  width: 100%;
  min-height: 5em;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5em;
`;

const LikeNum = styled.p`
  font-size: large;
  margin: 0;
  font-weight: 700;
`;
const CardInfoArea = styled.div`
  width: 100%;
  height: 2em;
  display: flex;
  justify-content: space-between;
  padding-inline: 1em;
  margin-left: 1em;
`;
const InfoText = styled.p`
  font-size: medium;
  color: grey;
  cursor: pointer;
`;
const WriterWrapper = styled.div`
  width: auto;
  display: flex;
  gap: 1em;
`;
const ControlWrapper = styled.div`
  width: auto;
  display: flex;
  gap: 1em;
`;
const CommentArea = styled.div`
  width: 92%;
  height: auto;
  background-color: #f7f5e7;
  padding-block: 1em;
  padding-inline: 1.5em;
  margin-left: 1em;
  word-break: break-all;
  input {
    width: 100%;
    height: auto;
    border: none;
    word-break: break-all;
    outline: none;
    background-color: #fcfbf1;
  }
`;
const CommentContol = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentReplyArea = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
