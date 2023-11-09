import React from "react";
import styled from "styled-components";

export default function CommentReplyCard() {
  return (
    <CardBox>
      <CardProfile src={"/images/Default_ProfileImg.png"} />
      <ReplyBox>
        <ReplyInfoWrapper>
          <ReplyWriter>
            <p>@temp-name</p>
            <p>12일 전</p>
          </ReplyWriter>
          <ReplyControl>
            <p>수정</p>
            <p>삭제</p>
          </ReplyControl>
        </ReplyInfoWrapper>
        <ReplyContent>내용임</ReplyContent>
      </ReplyBox>
    </CardBox>
  );
}

const CardBox = styled.div`
  width: 95%;
  min-height: 3em;
  height: auto;
  display: flex;
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
  p {
    margin: 0;
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
  padding: 0.5em;
  word-break: break-all;
`;
