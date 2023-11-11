import styled from "styled-components";
import { CommentData } from "../../types/BoardTypes";
import { formatRelativeTime } from "../../utils/Calculation";

export default function CommentReplyCard(props: CommentData) {
  const { id, content, write_date, nickname } = props;
  return (
    <CardBox>
      <CardProfile src={"/images/Default_ProfileImg.png"} />
      <ReplyBox>
        <ReplyInfoWrapper>
          <ReplyWriter>
            <p>{nickname}</p>
            <p>{formatRelativeTime(write_date)}</p>
          </ReplyWriter>
          <ReplyControl>
            <p>수정</p>
            <p>삭제</p>
          </ReplyControl>
        </ReplyInfoWrapper>
        <ReplyContent>{content}</ReplyContent>
      </ReplyBox>
    </CardBox>
  );
}

const CardBox = styled.div`
  width: 95%;
  min-height: 3em;
  height: auto;
  display: flex;
  margin-bottom: 0.8em;
`;
const CardProfile = styled.img`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background-color: black;
  margin-right: 0.5em;
`;
const ReplyBox = styled.div`
  width: 100%;
  display: block;
`;
const ReplyInfoWrapper = styled.div`
  width: 100%;
  min-height: 1em;
  height: auto;
  display: flex;
  justify-content: space-between;
`;
const ReplyWriter = styled.div`
  color: black;
  font-size: small;
  display: flex;
  gap: 0.5em;
  margin-left: 0.5em;
  p {
    margin: 0;
  }
  p:nth-child(2) {
    color: grey;
    font-size: smaller;
    margin-top: 0.1em;
  }
`;
const ReplyControl = styled.div`
  font-size: small;
  display: flex;
  gap: 1em;
  p {
    margin: 0;
  }
`;
const ReplyContent = styled.div`
  height: auto;
  padding-inline: 0.5em;
  padding-block: 0.3em;
  word-break: break-all;
`;