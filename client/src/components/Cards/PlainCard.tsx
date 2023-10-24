import Card from "react-bootstrap/Card";
import { CardDataType } from "../../types/Components-type";

export default function PlainCard(props: CardDataType) {
  const { title, content } = props;
  return (
    <Card
      style={{
        width: "18rem",
        height: "9em",
        cursor: "pointer",
      }}>
      <Card.Body>
        <Card.Title style={{ marginBlock: "0.5em" }}>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
}
