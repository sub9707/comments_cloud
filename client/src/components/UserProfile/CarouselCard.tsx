import { Card } from "react-bootstrap";
import { recentErrorType } from "../../types/users";
import { useNavigate } from "react-router-dom";
import { formatRelativeTime } from "../../utils/Calculation";

function CarouselCard(props: recentErrorType) {
  const { title, error_solved, id, likes, views, write_date, tags } = props;
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginBlock: "1em",
        paddingInline: "0.5em",
      }}>
      <Card className="text-center" style={CardBodyStyle}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{tags}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          {formatRelativeTime(write_date)}
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
