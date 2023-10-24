import Card from "react-bootstrap/Card";
import { useState } from "react";
import { DesktopCardDataType } from "../../types/Components-type";

const CardImageStyle = {
  width: "100%",
  height: "60%",
  objectFit: "contain" as const,
};

const CardStyle = {
  width: "80%",
  height: "20em",
  transition: "all 0.3s ease-out",
  cursor: "pointer",
};

const boxShadowed =
  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset";
const plainBox = "rgba(0, 0, 0, 0.24) 0px 3px 8px";

export default function ImageCard(props: DesktopCardDataType) {
  const { title, content, ImgUrl } = props;
  const [mouseHovered, setMouseHovered] = useState<boolean>(false);
  return (
    <Card
      style={{
        ...CardStyle,
        boxShadow: mouseHovered ? boxShadowed : plainBox,
      }}
      onMouseOver={() => setMouseHovered(true)}
      onMouseOut={() => setMouseHovered(false)}>
      <Card.Img
        variant="top"
        src={ImgUrl}
        style={CardImageStyle}
        alt="menu Image not loaded"
      />
      <Card.Body style={{ height: "40%" }}>
        <Card.Title
          style={{
            textAlign: "center",
            marginBottom: "0.7em",
            fontSize: "1.8em",
            fontFamily: "LotteMartHappy",
          }}>
          {title}
        </Card.Title>
        <Card.Text style={{ textAlign: "center" }}>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
}
