import { ModalContainer } from "../../styles/ModalStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import styled from "styled-components";
import { DottedDivision } from "../../styles/UtilityElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEye,
  faShareFromSquare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { formatRelativeTime } from "../../utils/Calculation";
import DOMPurify from "dompurify";
import { Button, CloseButton, Form, InputGroup } from "react-bootstrap";
import { closeModal } from "../../store/Modal";
import SharePopOver from "../Cards/SharePopOverCard";
import { useEffect, useState } from "react";
import CommentCard from "../Cards/CommentCard";
import { ReplyData } from "../../types/BoardTypes";
import { getMyErrorReplies } from "../../api/ErrorBoard";

export default function MyErrorView() {
  const dispatch = useDispatch();
  const [toggleSharePop, setToggleSharePop] = useState<boolean>(false);
  const [toggleComment, setToggleComments] = useState<boolean>(true);
  const { data } = useSelector((state: RootState) => state.myError);
  const [repliesData, setRepliesData] = useState<ReplyData[]>();
  const [replyClickData, setReplyClickData] = useState<number>(-1);

  const handleToggleDefault = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && toggleSharePop === true)
      setToggleSharePop(false);
  };
  const fetchCommentsData = async (boardId: number) => {
    try {
      const result = await getMyErrorReplies(boardId);
      setRepliesData(result);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (data) {
      fetchCommentsData(data?.id);
    }
  }, [data]);
  console.log(repliesData);
  return (
    <ModalContainer onClick={handleToggleDefault}>
      <CloseButton
        style={{ position: "fixed", top: "10%", right: "24%" }}
        onClick={() => dispatch(closeModal())}
      />
      <TitleHeader>
        #{data?.id}&nbsp;
        {data?.title}
      </TitleHeader>
      <ContentInfoWrapper onClick={handleToggleDefault}>
        <ContentInfoLeft>
          <DateInfo>
            <FontAwesomeIcon icon={faCalendarDays} />
            &nbsp; {formatRelativeTime(data?.write_date || "")}
          </DateInfo>
          <PublicInfo>공개됨</PublicInfo>
          <ControlInfo>수정</ControlInfo>
          <ControlInfo>삭제</ControlInfo>
          <ControlInfo>
            <FontAwesomeIcon
              icon={faShareFromSquare}
              onClick={() => setToggleSharePop(!toggleSharePop)}
            />
            {toggleSharePop && <SharePopOver setisopen={setToggleSharePop} />}
          </ControlInfo>
        </ContentInfoLeft>
        <ContentInfoRight>
          <ViewInfo>
            <FontAwesomeIcon icon={faEye} />
            &nbsp;{data?.views}
          </ViewInfo>
          <LikeInfo>
            <FontAwesomeIcon icon={faThumbsUp} /> &nbsp;{data?.likes}
          </LikeInfo>
        </ContentInfoRight>
      </ContentInfoWrapper>
      <DottedDivision />
      <SubTitleHeader onClick={handleToggleDefault}>에러 상황</SubTitleHeader>
      <ContentViewArea
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data?.error_state || ""),
        }}
      />
      <SubTitleHeader>에러 원인</SubTitleHeader>
      <ContentViewArea
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data?.error_cause || ""),
        }}
      />
      <SubTitleHeader>해결 과정</SubTitleHeader>
      <ContentViewArea
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data?.error_process || ""),
        }}
      />
      <SubTitleHeader>결과</SubTitleHeader>
      <ContentViewArea
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data?.error_result || ""),
        }}
      />

      <br />
      <DottedDivision />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SubHeader>댓글({repliesData?.length})</SubHeader>
        <p
          style={{ marginTop: "0.5em", cursor: "pointer" }}
          onClick={() => setToggleComments(!toggleComment)}>
          {toggleComment ? "접기" : "펼치기"}
        </p>
      </div>
      {toggleComment && (
        <>
          <CommentArea>
            {repliesData?.map((reply, _idx) => (
              <>
                <CommentCard
                  {...reply}
                  setIdx={setReplyClickData}
                  cur={_idx}
                  key={_idx}
                />

                {replyClickData === _idx && (
                  <CommentReplyArea>
                    <InputGroup>
                      <Form.Control placeholder="댓글 입력" />
                      <Button variant="primary">등록</Button>
                      <Button
                        variant="outline-primary"
                        onClick={() => setReplyClickData(-1)}>
                        취소
                      </Button>
                    </InputGroup>
                  </CommentReplyArea>
                )}
              </>
            ))}
          </CommentArea>
          <MoreComments>
            <p>댓글 더보기</p>
          </MoreComments>
        </>
      )}
      <br />

      <AddCommentArea>
        <CommentInput />
        <CommentSubmitBtnGroup>
          <CommentSubmitBtn
            style={{ backgroundColor: "#8782d6", color: "white" }}>
            등록하기
          </CommentSubmitBtn>
          <CommentSubmitBtn
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #8782d6",
              color: "#8782d6",
            }}>
            초기화
          </CommentSubmitBtn>
        </CommentSubmitBtnGroup>
      </AddCommentArea>
    </ModalContainer>
  );
}

const TitleHeader = styled.h1`
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: 600;
`;

const SubTitleHeader = styled.h3`
  color: #777777;
  font-weight: 600;
  margin-block: 0.7em;
`;
const SubHeader = styled.h4`
  color: #3d3d3d;
  font-weight: 600;
  margin-block: 0.7em;
  font-size: large;
`;

const ContentInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #7a7a7a;
  p {
    margin: 0;
  }
`;
const ContentViewArea = styled.div`
  width: 100%;
  min-height: 10vh;
  height: auto;
  background-color: #fffff9;
  box-shadow: rgb(114, 114, 114) 0px 0px 5px 2px inset;
  padding: 1em;
`;
const ViewInfo = styled.p``;
const LikeInfo = styled.p``;
const DateInfo = styled.p``;
const PublicInfo = styled.p``;
const ControlInfo = styled.p`
  position: relative;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;
const ContentInfoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
const ContentInfoRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
const CommentArea = styled.div`
  display: block;
  width: 100%;
  height: auto;
`;
const MoreComments = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 2em;
  p {
    margin: 0;
    width: auto;
    color: grey;
    cursor: pointer;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AddCommentArea = styled.div`
  width: 100%;
  height: 7em;
  margin-top: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5em;
`;
const CommentInput = styled.textarea`
  position: relative;
  width: 80%;
  height: 90%;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  outline: none;
`;
const CommentSubmitBtnGroup = styled.div`
  width: 12%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding-top: 0.3em;
`;

const CommentSubmitBtn = styled.button`
  width: 100%;
  height: 2em;
  border: 1px solid #bebebe;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  &:active {
    box-shadow: none;
  }
`;
const CommentReplyArea = styled.div`
  width: 90%;
  margin-left: 5em;
  margin-bottom: 2em;
`;
