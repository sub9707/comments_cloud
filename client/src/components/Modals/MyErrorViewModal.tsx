import { ModalContainer } from "../../styles/ModalStyle/ModalStyle";
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
import {
  Button,
  CloseButton,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { closeModal } from "../../store/Modal";
import SharePopOver from "../Cards/SharePopOverCard";
import React, { useEffect, useState } from "react";
import CommentCard from "../Cards/CommentCard";
import { writeComment, writeReply } from "../../api/ErrorBoard";
import { fetchReplies } from "../../store/DataThunk/RepliesSlice";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export default function MyErrorView() {
  const { data } = useSelector((state: RootState) => state.myError);
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleSharePop, setToggleSharePop] = useState<boolean>(false);
  const [toggleComment, setToggleComments] = useState<boolean>(true);
  const [commentData, setCommentData] = useState<string>("");
  const [replyClickData, setReplyClickData] = useState<number>(-1);
  const [replyWrite, setReplyWrite] = useState<string>("");
  const sections = [
    { title: "에러 상황", content: data?.error_state },
    { title: "에러 원인", content: data?.error_cause },
    { title: "해결 과정", content: data?.error_process },
    { title: "결과", content: data?.error_result },
  ];
  const replies = useSelector((state: RootState) => state.replies);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyWrite(e.target.value);
  };

  const handleReplySubmit = async () => {
    try {
      setLoading(true);
      if (data) {
        await writeReply({
          content: replyWrite,
          writer_id: 3,
          content_id: data?.id,
        });
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    } finally {
      alert("댓글이 등록되었습니댜.");
      setReplyWrite("");
    }
  };

  const handleToggleDefault = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && toggleSharePop === true)
      setToggleSharePop(false);
  };

  const submitCommentData = async (commentId: number) => {
    try {
      setLoading(true);
      await writeComment(commentId, 3, commentData);
      alert("댓글이 등록되었습니다.");
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCancelComment = () => {
    setCommentData("");
    setReplyClickData(-1);
  };

  useEffect(() => {
    if (data) dispatch(fetchReplies(data?.id));
  }, [dispatch, data]);

  return (
    <ModalContainer onClick={handleToggleDefault}>
      <CloseButton
        style={{ position: "fixed", top: "10%", right: "24%" }}
        onClick={() => dispatch(closeModal())}
      />
      <TitleHeader>
        <p>
          #{data?.id}&nbsp;
          {data?.title}
        </p>
        {data?.error_solved === 1 && (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>해결된 에러노트</Tooltip>}>
            <img src="/images/success_badge.png" alt="해결 뱃지" />
          </OverlayTrigger>
        )}
      </TitleHeader>
      <ContentInfoWrapper onClick={handleToggleDefault}>
        <ContentInfoLeft>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} />
            &nbsp; {formatRelativeTime(data?.write_date || "")}
          </p>
          <p>{data?.publicCheck === 1 ? "공개" : "비공개"}</p>
          <p>수정</p>
          <p>삭제</p>
          <ControlInfo>
            <FontAwesomeIcon
              icon={faShareFromSquare}
              onClick={() => setToggleSharePop(!toggleSharePop)}
            />
            {toggleSharePop && <SharePopOver setisopen={setToggleSharePop} />}
          </ControlInfo>
        </ContentInfoLeft>
        <ContentInfoRight>
          <p>
            <FontAwesomeIcon icon={faEye} />
            &nbsp;{data?.views}
          </p>
          <p>
            <FontAwesomeIcon icon={faThumbsUp} /> &nbsp;{data?.likes}
          </p>
        </ContentInfoRight>
      </ContentInfoWrapper>
      <DottedDivision />
      {/*본문 HTML 컨텐츠 영역*/}
      {sections.map((section, index) => (
        <div key={index}>
          <SubTitleHeader>{section.title}</SubTitleHeader>
          <ContentViewArea
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(section.content || ""),
            }}
          />
        </div>
      ))}
      <br />
      {/*댓글 영역*/}
      <DottedDivision />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SubHeader>댓글({replies?.length})</SubHeader>
        <p
          style={{ marginTop: "0.5em", cursor: "pointer" }}
          onClick={() => setToggleComments(!toggleComment)}>
          {toggleComment ? "접기" : "펼치기"}
        </p>
      </div>
      {toggleComment && (
        <>
          <CommentArea>
            {replies?.map((reply, _idx) => (
              <React.Fragment key={_idx}>
                <CommentCard
                  {...reply}
                  setIdx={setReplyClickData}
                  setLoad={setLoading}
                  cur={_idx}
                />
                {replyClickData === _idx && (
                  <CommentReplyArea>
                    <InputGroup>
                      <Form.Control
                        value={commentData}
                        onChange={(e) => setCommentData(e.target.value)}
                        placeholder="댓글 입력"
                      />
                      <Button
                        variant="primary"
                        onClick={() => submitCommentData(reply?.id)}>
                        등록
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={handleCancelComment}>
                        취소
                      </Button>
                    </InputGroup>
                  </CommentReplyArea>
                )}
              </React.Fragment>
            ))}
          </CommentArea>
          <MoreComments>
            <p>댓글 더보기</p>
          </MoreComments>
        </>
      )}
      <br />
      <AddCommentArea>
        <CommentInput value={replyWrite} onChange={handleInputChange} />
        <CommentSubmitBtnGroup>
          <CommentSubmitBtn
            style={{ backgroundColor: "#8782d6", color: "white" }}
            onClick={handleReplySubmit}>
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

const TitleHeader = styled.div`
  width: 100%;
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: 600;
  display: flex;
  align-items: center;
  p {
    font-size: 2.3em;
  }
  img {
    width: 3em;
    height: 3em;
    margin-left: 0.5em;
    object-fit: cover;
    margin-bottom: 1em;
  }
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
