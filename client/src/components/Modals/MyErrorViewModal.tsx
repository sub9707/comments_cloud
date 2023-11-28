import { ModalContainer } from "../../styles/ModalStyle/ModalStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  BottomButton,
  DottedDivision,
  TopButton,
} from "../../styles/UtilityElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCaretDown,
  faCaretUp,
  faEye,
  faShareFromSquare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { formatRelativeTime } from "../../utils/Calculation";
import DOMPurify from "dompurify";
import { CloseButton, OverlayTrigger, Tooltip } from "react-bootstrap";
import { closeModal } from "../../store/Modal/Modal";
import SharePopOver from "../Cards/SharePopOverCard";
import React, { useEffect, useRef, useState } from "react";
import CommentCard from "../Cards/CommentCard";
import {
  addReply,
  clearReplies,
  fetchReplies,
} from "../../store/DataThunk/RepliesSlice";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ErrorReplyType } from "../../types/BoardTypes";
import { userStateType } from "../../store/Utils/User";
import {
  AddCommentArea,
  CommentArea,
  CommentInput,
  CommentSubmitBtn,
  CommentSubmitBtnGroup,
  ContentInfoLeft,
  ContentInfoRight,
  ContentInfoWrapper,
  ContentViewArea,
  ControlInfo,
  SubHeader,
  SubTitleHeader,
  TitleHeader,
} from "../../styles/ModalStyle/ErrorModalView";

export default function MyErrorView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: userStateType) => state.user.data);
  const { data } = useSelector((state: RootState) => state.myError);
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const [toggleSharePop, setToggleSharePop] = useState<boolean>(false);
  const [toggleComment, setToggleComments] = useState<boolean>(true);
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

  const handleAddReply = () => {
    try {
      if (data) {
        const props: ErrorReplyType = {
          content: replyWrite,
          content_id: data?.id,
          writer_id: user?.id,
        };
        dispatch(addReply(props));
        alert("댓글이 등록되었습니다.");
      }
      setReplyWrite("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleDefault = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && toggleSharePop === true)
      setToggleSharePop(false);
  };

  useEffect(() => {
    if (data) {
      dispatch(fetchReplies({ boardId: data?.id, offset: 0 }));
    }
  }, [dispatch, data]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  return (
    <ModalContainer onClick={handleToggleDefault} ref={scrollRef}>
      <CloseButton
        style={{ position: "fixed", top: "10%", right: "24%" }}
        onClick={() => {
          dispatch(closeModal()), dispatch(clearReplies());
        }}
      />
      <TopButton onClick={scrollToTop}>
        <FontAwesomeIcon icon={faCaretUp} />
        <p>Top</p>
      </TopButton>
      <BottomButton onClick={scrollToBottom}>
        <p>Btm</p>
        <FontAwesomeIcon icon={faCaretDown} />
      </BottomButton>
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
      <AddCommentArea>
        <CommentInput value={replyWrite} onChange={handleInputChange} />
        <CommentSubmitBtnGroup>
          <CommentSubmitBtn
            style={{ backgroundColor: "#8782d6", color: "white" }}
            onClick={handleAddReply}>
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
      <br />
      {/*댓글 목록*/}
      {toggleComment && (
        <>
          <CommentArea>
            <CommentCard />
          </CommentArea>
        </>
      )}
      <br />
    </ModalContainer>
  );
}
