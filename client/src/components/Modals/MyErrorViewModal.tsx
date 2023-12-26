import { ModalContainer } from "@styles/ModalStyle/ModalStyle";
import { useDispatch } from "react-redux";

import {
  BottomButton,
  DottedDivision,
  TopButton,
} from "@styles/UtilityElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { CloseButton } from "react-bootstrap";
import { closeModal } from "@/store/Modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import CommentCard from "../Cards/CommentCard";
import { clearReplies } from "@/store/DataThunk/RepliesSlice";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  CommentArea,
  ContentInfoWrapper,
} from "@styles/ModalStyle/ErrorModalView";
import ErrorBoardTitle from "../MyError/ErrorBoardTitle";
import ContentControl from "../MyError/ContentControl";
import ContentsArea from "../MyError/ContentsArea";
import WriteCommentArea from "../MyError/WriteCommentArea";
import { JustifyStart } from "@styles/FlexBoxStlye";
import TagsArea from "../MyError/TagsArea";
import { clearMyErrorData } from "@/store/Modal/MyErrorModal";

export default function MyErrorView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const [toggleSharePop, setToggleSharePop] = useState<boolean>(false);

  const handleToggleDefault = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && toggleSharePop === true)
      setToggleSharePop(false);
  };

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
  useEffect(() => {
    return () => {
      dispatch(clearMyErrorData());
    };
  }, []);

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
      <br />
      {/*본문 타이틀 영역*/}
      <ErrorBoardTitle />
      {/*본문 Info 영역*/}
      <ContentInfoWrapper>
        <ContentControl />
      </ContentInfoWrapper>
      <DottedDivision />
      {/*본문 HTML 컨텐츠 영역*/}
      <ContentsArea />
      <br />
      <JustifyStart>
        <TagsArea />
      </JustifyStart>
      {/*댓글 영역*/}
      <DottedDivision />
      <br />
      {/*댓글 추가 영역*/}
      <WriteCommentArea />
      <br />
      {/*댓글 목록*/}
      <CommentArea>
        <CommentCard />
      </CommentArea>
      <br />
    </ModalContainer>
  );
}
