import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EmptyCarouselCard() {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const CardBodyStyle = {
    borderRadius: "16px",
    border: "none",
    height: "15em",
    transition: "all 0.3s ease-out",
  };
  const plusIconStyle = {
    border: "2px solid grey",
    borderRadius: "50%",
    padding: ".3em",
    width: "1em",
    height: "1em",
    color: "grey",
    cursor: "pointer",
  };
  const handleMouseOver = () => {
    if (cardRef.current) cardRef.current.style.border = `1px dotted grey`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.border = `none`;
  };
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginBlock: "1em",
        paddingInline: "0.5em",
      }}>
      <Card
        className="text-center"
        style={CardBodyStyle}
        onClick={() => navigate("/errorWrite")}
        ref={cardRef}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}>
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <FontAwesomeIcon style={plusIconStyle} icon={faPlus} size="2x" />
          <br />
          <h5>새로운 노트 추가</h5>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EmptyCarouselCard;
