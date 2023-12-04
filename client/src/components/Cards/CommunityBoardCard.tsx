import {
  BadgeWrapper,
  CardInfo,
  CardSubTitle,
  CardTitle,
  CardWrapper,
  DateInfo,
} from "../../styles/CardStyle";
import { BoardFetchType } from "../../types/board";
import { formatRelativeTime } from "../../utils/Calculation";
import { useNavigate } from "react-router-dom";
import SolvedBadge from "../Badges/SolvedTag";
import { RemoveHtmlTags } from "../../utils/StringForm";

function CommunityBoardCard(props: BoardFetchType) {
  const navigate = useNavigate();
  return (
    <CardWrapper>
      <CardTitle
        className="text-underline-hover"
        onClick={() => navigate(`/myError/${props.id}`)}>
        {props.title}
      </CardTitle>
      <CardSubTitle>{RemoveHtmlTags(props.error_cause)}</CardSubTitle>
      <CardInfo>
        <BadgeWrapper></BadgeWrapper>
        <>
          <SolvedBadge solved={props.error_solved ? "해결" : "미해결"} />
          <DateInfo>{formatRelativeTime(props.write_date)}</DateInfo>
        </>
      </CardInfo>
    </CardWrapper>
  );
}

export default CommunityBoardCard;
