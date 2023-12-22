import {
  BadgeWrapper,
  CardBody,
  CardInfo,
  CardNicKName,
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
import { useEffect, useRef, useState } from "react";
import { TagBadge } from "../UserProfile/CarouselCard";
import { getUserInfo } from "../../api/user";

function CommunityBoardCard(props: BoardFetchType) {
  const navigate = useNavigate();
  const tagArray = JSON.parse(props.tags);
  const tagWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [userName, setName] = useState("");

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (tagWrapperRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - tagWrapperRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && tagWrapperRef.current) {
      tagWrapperRef.current.scrollLeft = startX - e.pageX;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const getUserName = async () => {
    try {
      const result = await getUserInfo(props.writer_id.toString());
      setName(result[0]?.nickname);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <CardWrapper>
      <CardTitle
        className="text-underline-hover"
        onClick={() => navigate(`/myError/${props.id}`)}>
        {props.title}
      </CardTitle>
      <CardBody>
        <CardSubTitle>{RemoveHtmlTags(props.error_cause)}</CardSubTitle>
        <CardNicKName>{userName}</CardNicKName>
      </CardBody>
      <CardInfo>
        <BadgeWrapper
          ref={tagWrapperRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}>
          {tagArray
            ? tagArray.map((tag: string, _idx: number) => (
                <TagBadge key={_idx}>{tag}</TagBadge>
              ))
            : null}
        </BadgeWrapper>
        <>
          <SolvedBadge solved={props.error_solved ? "해결" : "미해결"} />
          <DateInfo>{formatRelativeTime(props.write_date)}</DateInfo>
        </>
      </CardInfo>
    </CardWrapper>
  );
}

export default CommunityBoardCard;
