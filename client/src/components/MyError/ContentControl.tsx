import React, { useState } from "react";
import {
  ContentInfoLeft,
  ContentInfoRight,
  ControlInfo,
} from "../../styles/ModalStyle/ErrorModalView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEye,
  faShareFromSquare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { formatRelativeTime } from "../../utils/Calculation";
import SharePopOver from "../Cards/SharePopOverCard";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

function ContentControl() {
  const [toggleSharePop, setToggleSharePop] = useState<boolean>(false);
  const { data } = useSelector((state: RootState) => state.myError);
  return (
    <>
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
    </>
  );
}

export default ContentControl;
