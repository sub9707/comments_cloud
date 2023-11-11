import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CommentData, ReplyData } from "../../types/BoardTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/Modal";
import CommentReplyCard from "./CommentReplyCard";
import {
  deleteCommentAll,
  deleteReply,
  getAllReplyComments,
  updateReply,
} from "../../api/ErrorBoard";
import { addMessage } from "../../store/Alert";
import { ChangeEvent, useMemo, useRef, useState } from "react";

type CommentCardStateTpye = {
  cur: number;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CommentCard(props: ReplyData & CommentCardStateTpye) {
  const [toggleUpdate, setToggleUpdate] = useState<number>(-1);
  const [toggleMoreComments, setToggleMoreComments] = useState<boolean>(false);
  const [commentsData, setCommentsData] = useState<CommentData[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    content,
    email,
    likes,
    profileImg,
    write_date,
    writer_id,
    setIdx,
    cur,
    id,
    setLoad,
  } = props;
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
    await updateReply(id, inputValue);
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
      setLoad(true);
      await deleteReply(id);
      await deleteCommentAll(id);
      dispatch(
        addMessage({
          id: "unique_id",
          text: `댓글이 삭제되었습니다`,
          type: "success",
        })
      );
      setLoad(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewReplies = async () => {
    try {
      const data = await getAllReplyComments(id);
      setCommentsData(data);
      setToggleMoreComments(true);
    } catch (err) {
      console.error(err);
    }
  };

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
            color="grey"
            style={{ cursor: "pointer", scale: "0.8", opacity: 0.5 }}
          />
          <LikeNum>{likes}</LikeNum>
        </CommentLikes>
      </CardLeft>
      <CardRight>
        <CardInfoArea>
          <WriterWrapper>
            <InfoText
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}>
              {email}
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
              {" "}
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
            onClick={() => setIdx(cur)}>
            답글달기
          </InfoText>
          <InfoText
            style={{ marginLeft: "1em", marginTop: "1em", cursor: "pointer" }}
            onClick={handleViewReplies}>
            {toggleMoreComments ? "" : "답글보기"}
          </InfoText>
        </CommentContol>
        <CommentReplyArea>
          {commentsData?.map((data, _idx) => (
            <CommentReplyCard key={_idx} {...data} />
          ))}
        </CommentReplyArea>
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
