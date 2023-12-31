import { TitleHeader } from "@styles/ModalStyle/ErrorModalView";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ErrorBoardTitle() {
  const { data } = useSelector((state: RootState) => state.myError);
  return (
    <TitleHeader>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{data?.title}</Tooltip>}>
        <p>
          #{data?.id}&nbsp;
          {data?.title}
        </p>
      </OverlayTrigger>
      {data?.error_solved === 1 && (
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>해결된 에러노트</Tooltip>}>
          <img src="/images/success_badge.webp" alt="해결 뱃지" />
        </OverlayTrigger>
      )}
    </TitleHeader>
  );
}

export default ErrorBoardTitle;
