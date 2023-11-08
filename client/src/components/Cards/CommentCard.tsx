import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export default function CommentCard() {
  return (
    <CardContainer>
      <CardLeft>
        <CardProfile />
        <CommentLikes>
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="2x"
            color="grey"
            style={{ marginBlock: "0.3em", cursor: "pointer" }}
          />
          <LikeNum>0</LikeNum>
        </CommentLikes>
      </CardLeft>
      <CardRight>
        <CardInfoArea>
          <WriterWrapper>
            <InfoText>이메일</InfoText>
            <InfoText>날짜</InfoText>
          </WriterWrapper>
          <ControlWrapper>
            <InfoText>수정</InfoText>
            <InfoText>삭제</InfoText>
          </ControlWrapper>
        </CardInfoArea>
        <CommentArea>1</CommentArea>
      </CardRight>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 100%;
  min-height: 3em;
  height: auto;
  display: flex;
`;

const CardLeft = styled.div`
  width: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;
