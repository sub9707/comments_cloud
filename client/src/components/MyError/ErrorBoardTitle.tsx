import React from "react";
import { TitleHeader } from "../../styles/ModalStyle/ErrorModalView";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ErrorBoardTitle() {
  const { data } = useSelector((state: RootState) => state.myError);
  return (
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
  );
}

export default ErrorBoardTitle;
