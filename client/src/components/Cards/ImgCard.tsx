import Card from "react-bootstrap/Card";
import alt_Image from "../../assets/photo_alt.png";

const ObjectFitCover = "cover" as const;

const CardImageStyle = {
  width: "100%",
  height: "60%",
  objectFit: ObjectFitCover,
};

export default function ImageCard() {
  return (
    <Card style={{ width: "80%", height: "20em" }}>
      <Card.Img variant="top" src={alt_Image} style={CardImageStyle} />
      <Card.Body style={{ height: "40%" }}>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
