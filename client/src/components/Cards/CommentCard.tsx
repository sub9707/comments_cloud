import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/Modal/Modal";
import { addMessage } from "../../store/Utils/Alert";
import React, { ChangeEvent, useState, useEffect } from "react";
import {
  updateReply,
  deleteReply,
  fetchReplies,
} from "../../store/DataThunk/RepliesSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  checkReplyCheck,
  postReplyCancelLike,
  postReplyLike,
} from "../../api/ErrorBoard";
import { RootState } from "../../store";
import { userStateType } from "../../store/Utils/User";

export default function CommentCard() {
  const [replyLiked, setReplyLiked] = useState<boolean[]>([]);
  const [replyLikes, setReplyLikes] = useState<number[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const replies = useSelector((state: RootState) => state.replies);
  const { data } = useSelector((state: RootState) => state.myError);
  const [toggleUpdate, setToggleUpdate] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string[]>([]);
  const user = useSelector((state: userStateType) => state.user.data);
  const [userBlocked, setBlocked] = useState<boolean>(false);

  const handleProfileClick = () => {
    if (!data) return;
    navigate(`/user/${data?.writer_id}`);
    dispatch(closeModal());
  };

  const handleUpdateFunc = async (replyId: number, idx: number) => {
    if (!data) return;
    dispatch(updateReply({ replyId, content: inputValue[idx] }));
    dispatch(
      addMessage({
        id: "unique_id",
        text: `댓글이 수정되었습니다`,
        type: "success",
      })
    );
    setToggleUpdate(-1);
  };
  const handleUpdateChange = (
    e: ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const updatedInputValue = [...inputValue];
    updatedInputValue[idx] = e.target.value;
    setInputValue(updatedInputValue);
  };
  const handleDeleteFunc = async (replyId: number) => {
    if (!data) return;
    try {
      dispatch(deleteReply(replyId));
      dispatch(
        addMessage({
          id: "unique_id",
          text: `댓글이 삭제되었습니다`,
          type: "success",
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikeClick = async (idx: number) => {
    if (!data) return;
    if (replyLiked[idx]) {
      await postReplyCancelLike(replies[idx].id, 2);
      setReplyLikes((prevReplyLikes) => {
        const newReplyLikes = [...prevReplyLikes];
        newReplyLikes[idx] = replyLikes[idx] - 1;
        return newReplyLikes;
      });
    } else {
      await postReplyLike(replies[idx].id, 2);
      setReplyLikes((prevReplyLikes) => {
        const newReplyLikes = [...prevReplyLikes];
        newReplyLikes[idx] = replyLikes[idx] + 1;
        return newReplyLikes;
      });
    }
    setReplyLiked((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[idx] = !newLikes[idx];
      return newLikes;
    });
  };

  const handleUpdateToggle = (cur: number) => {
    if (toggleUpdate === -1) {
      setToggleUpdate(cur);
    } else {
      setToggleUpdate(-1);
    }
  };

  // 좋아요 체크
  useEffect(() => {
    if (!data) return;

    const checkLikedForReplies = async () => {
      const newLikes = await Promise.all(
        replies.map(async (reply) => {
          const response = await checkReplyCheck(reply?.id, 2);
          return response.isLiked;
        })
      );

      setReplyLiked(newLikes);
    };
    checkLikedForReplies();

    const likesArray = replies.map((reply) => reply.likes || 0);
    setReplyLikes(likesArray);
  }, [data, replies, setReplyLiked]);

  useEffect(() => {
    if (data) {
      dispatch(fetchReplies({ boardId: data?.id, offset: 0 }));
    }
  }, [data]);

  useEffect(() => {
    setInputValue(replies?.map((reply) => reply.content));
  }, []);

  useEffect(() => {
    if (!user || user?.id === 0) {
      setBlocked(true);
    }
  }, [user]);

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
                  color={replyLiked[_idx] ? "black" : "grey"}
                  style={{ cursor: "pointer", scale: "0.8", opacity: 0.8 }}
                  onClick={() => handleLikeClick(_idx)}
                />
                <LikeNum>{replyLikes[_idx]}</LikeNum>
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
                {user.id === reply.writer_id ? (
                  <ControlWrapper>
                    <InfoText onClick={() => handleUpdateToggle(_idx)}>
                      {toggleUpdate !== _idx ? "수정" : "취소"}
                    </InfoText>
                    <InfoText
                      onClick={
                        toggleUpdate
                          ? () => handleDeleteFunc(reply?.id)
                          : () => handleUpdateFunc(reply?.id, _idx)
                      }>
                      {toggleUpdate !== _idx ? "삭제" : "완료"}
                    </InfoText>
                  </ControlWrapper>
                ) : null}
              </CardInfoArea>
              {toggleUpdate === _idx && (
                <CommentArea>
                  <input
                    type="text"
                    value={inputValue[_idx]}
                    onChange={(e) => handleUpdateChange(e, _idx)}
                  />
                </CommentArea>
              )}
              {toggleUpdate !== _idx && (
                <CommentArea>{reply?.content}</CommentArea>
              )}
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
