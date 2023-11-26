import { Card } from "react-bootstrap";
import { recentErrorType } from "../../types/users";
import { useNavigate } from "react-router-dom";
import { JustifyBetween } from "../../styles/FlexBoxStlye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useRef, useState } from "react";

function CarouselCard(props: recentErrorType) {
  const { title, error_solved, id, likes, views, write_date, tags } = props;
  const tagArray = JSON.parse(tags);
  const navigate = useNavigate();

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
        <Card.Body style={{ paddingBottom: "0.5em" }}>
          <Card.Title>{title}</Card.Title>
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

const CardBodyStyle = {
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
  gap: 0.3em;
  &::-webkit-scrollbar {
    display: none;
  }
  cursor: default;
`;
const TagBadge = styled.div`
  width: auto;
  height: 70%;
  background-color: #514a64;
  border-radius: 7px;
  color: white;
  padding-bottom: 1em;
  padding-inline: 0.3em;
  font-size: medium;
`;
