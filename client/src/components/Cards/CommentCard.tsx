import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CommentData, ReplyData } from "../../types/BoardTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/Modal";
import CommentReplyCard from "./CommentReplyCard";
import { addMessage } from "../../store/Alert";
import React, { ChangeEvent, useMemo, useState, useEffect } from "react";
import { updateReply, deleteReply } from "../../store/DataThunk/RepliesSlice";
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
import { RootState } from "../../store";

export default function CommentCard() {
  const [replyLiked, setReplyLiked] = useState<boolean>(false);
  const [commentsData, setCommentsData] = useState<CommentData[]>([]);
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [viewComments, setviewComments] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
  const [replyClickData, setReplyClickData] = useState<number>(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const replies = useSelector((state: RootState) => state.replies);
  const { data } = useSelector((state: RootState) => state.myError);
  const [toggleUpdate, setToggleUpdate] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>("");
  const memoizedContent = useMemo(() => {
    return inputValue;
  }, [inputValue]);

  const handleProfileClick = () => {
    if (!data) return;
    navigate(`/user/${data?.writer_id}`);
    dispatch(closeModal());
  };

  const handleUpdateFunc = async () => {
    if (!data) return;
    dispatch(updateReply({ replyId: data?.id, content: inputValue }));
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
    if (!data) return;
    try {
      dispatch(deleteReply(data?.id));
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
      // dispatch(fetchReplies({ boardId: id, offset: 0 }));
    }
  };

  const handleViewReplies = async () => {
    if (!data) return;
    const result = await getAllComments(data?.id);
    setCommentsData(result);
    setviewComments(true);
  };

  const getCountFunc = async (contentId: number) => {
    const result = await getCommentsCount(contentId);
    setCommentsCount(result);
  };

  const submitCommentData = async () => {
    if (!data) return;
    try {
      await writeComment(data?.id, 3, commentInput);
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
    if (!data) return;
    if (replyLiked) {
      await postReplyCancelLike(data?.id, 2);
      setReplyLiked(false);
    } else {
      await postReplyLike(data?.id, 2);
      setReplyLiked(true);
    }
  };

  const handleUpdateToggle = (cur: number) => {
    if (toggleUpdate === -1) {
      setToggleUpdate(cur);
    } else {
      setToggleUpdate(-1);
    }
  };

  useEffect(() => {
    if (data) getCountFunc(data?.id);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    const checkLiked = async () => {
      const response = await checkReplyCheck(data?.id, 2);
      if (response.isLiked) {
        setReplyLiked(true);
      } else {
        setReplyLiked(false);
      }
    };
    checkLiked();
  }, [data]);

  return (
    <>
      {replies?.map((reply, _idx) => (
        <React.Fragment key={_idx}>
          <CardContainer>
            <CardLeft>
              <CardProfile
                src={reply?.profileImg || "/images/Default_ProfileImg.png"}
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
                <LikeNum>{reply?.likes}</LikeNum>
              </CommentLikes>
            </CardLeft>
            <CardRight>
              <CardInfoArea>
                <WriterWrapper>
                  <InfoText
                    onClick={handleProfileClick}
                    style={{ cursor: "pointer" }}>
                    {reply?.nickname}
                  </InfoText>
                  <InfoText>{reply?.write_date}</InfoText>
                </WriterWrapper>
                <ControlWrapper>
                  <InfoText onClick={() => handleUpdateToggle(_idx)}>
                    {toggleUpdate ? "수정" : "취소"}
                  </InfoText>
                  <InfoText
                    onClick={
                      toggleUpdate ? handleDeleteFunc : handleUpdateFunc
                    }>
                    {toggleUpdate === -1 ? "삭제" : "완료"}
                  </InfoText>
                </ControlWrapper>
              </CardInfoArea>
              {toggleUpdate === _idx && (
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
                  style={{
                    marginLeft: "1em",
                    marginTop: "1em",
                    cursor: "pointer",
                  }}
                  onClick={() => setReplyClickData(_idx)}>
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
              {_idx === replyClickData ? (
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
                    <Button
                      variant="outline-primary"
                      onClick={handleCancelComment}>
                      취소
                    </Button>
                  </InputGroup>
                </CommentReplyArea>
              ) : null}
            </CardRight>
          </CardContainer>
        </React.Fragment>
      ))}
    </>
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
