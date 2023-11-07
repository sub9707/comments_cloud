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
import { CloseButton } from "react-bootstrap";
import { closeModal } from "../../store/Modal";
import SharePopOver from "../Cards/SharePopOverCard";
import { useState } from "react";

export default function MyErrorView() {
  const dispatch = useDispatch();
  const [toggleSharePop, setToggleSharePop] = useState<boolean>(false);
  const { data } = useSelector((state: RootState) => state.myError);
  const handleToggleDefault = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && toggleSharePop === true)
      setToggleSharePop(false);
  };
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
