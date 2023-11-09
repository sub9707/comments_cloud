import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { ReplyData } from "../../types/BoardTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/Modal";
import CommentReplyCard from "./CommentReplyCard";

type CommentCardStateTpye = {
  cur: number;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
};
export default function CommentCard(props: ReplyData & CommentCardStateTpye) {
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
  } = props;
  const handleProfileClick = () => {
    navigate(`/user/${writer_id}`);
    dispatch(closeModal());
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
            <InfoText>수정</InfoText>
            <InfoText>삭제</InfoText>
          </ControlWrapper>
        </CardInfoArea>
        <CommentArea>{content}</CommentArea>
        <CommentContol>
          <InfoText
            style={{ marginLeft: "1em", marginTop: "1em", cursor: "pointer" }}
            onClick={() => setIdx(cur)}>
            답글달기
          </InfoText>
          <InfoText
            style={{ marginLeft: "1em", marginTop: "1em", cursor: "pointer" }}>
            답글보기
          </InfoText>
        </CommentContol>
        <CommentReplyArea>
          <CommentReplyCard />
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
`;
const CommentContol = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentReplyArea = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
`;
