import { Card } from "react-bootstrap";
import { recentErrorType } from "../../types/users";
import { JustifyBetween, JustifyEnd } from "../../styles/FlexBoxStlye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useRef, useState } from "react";
import SolvedBadge from "../Badges/SolvedTag";

interface CardTitleStyleProps extends React.CSSProperties {
  height: string;
  width: string;
  overflow: "hidden";
  textOverflow: "ellipsis";
  display: "-webkit-box" | "-moz-box";
  WebkitLineClamp: number;
  WebkitBoxOrient: "vertical";
  MozBoxOrient: "vertical";
  MozBoxLineClamp: number;
}

function CarouselCard(props: recentErrorType) {
  const { title, error_solved, likes, views, write_date, tags } = props;
  const tagArray = JSON.parse(tags);

  const tagWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

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
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginBlock: "1em",
        paddingInline: "0.5em",
      }}>
      <Card className="text-center" style={CardBodyStyle}>
        <JustifyEnd style={{ paddingTop: "0.5em", paddingRight: "0.5em" }}>
          <SolvedBadge solved={error_solved ? "해결" : "미해결"} />
        </JustifyEnd>

        <Card.Body style={{ paddingBottom: "0.5em", paddingTop: "0.5em" }}>
          <Card.Title className="text-underline-hover" style={CardTitleStyle}>
            {title}
          </Card.Title>
          <TagWrapper
            ref={tagWrapperRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}>
            {tagArray.map((tag: string, _idx: number) => (
              <TagBadge key={_idx}>{tag}</TagBadge>
            ))}
          </TagWrapper>
          <Card.Text style={{ opacity: 0.7 }}>
            {write_date.substring(0, write_date.length - 5)}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <JustifyBetween>
            <InfoFooterText>
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "0.3em" }} />
              {views}
            </InfoFooterText>
            <InfoFooterText>
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{ marginRight: "0.3em" }}
              />
              {likes}
            </InfoFooterText>
          </JustifyBetween>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default CarouselCard;

const CardTitleStyle: CardTitleStyleProps = {
  wordBreak: "break-all",
  textAlign: "start",
  height: "3.5em",
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  MozBoxOrient: "vertical",
  MozBoxLineClamp: 3,
  cursor: "pointer",
};

const CardBodyStyle = {
  height: "15em",
  background:
    "linear-gradient(90deg, #dfe5eb 0%, rgba(255,255,255,1) 10%, rgba(255,255,255,1) 80%, rgba(207,215,223,1) 100%)",
  borderRadius: "16px",
  border: `3px solid white`,
  boxShadow:
    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
};

const InfoFooterText = styled.p`
  margin-bottom: 0;
`;
const TagWrapper = styled.div`
  width: 100%;
  height: 2em;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: 0.2em;
  gap: 0.3em;
  &::-webkit-scrollbar {
    display: none;
  }
  cursor: default;
`;
export const TagBadge = styled.div`
  width: auto;
  height: 70%;
  background-color: #514a64;
  border-radius: 7px;
  color: white;
  padding-bottom: 1em;
  padding-inline: 0.3em;
  font-size: medium;
`;
