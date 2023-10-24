import Card from "react-bootstrap/Card";
import { useState } from "react";
import { DesktopCardDataType } from "../../types/Components-type";
import { useNavigate } from "react-router-dom";
import {
  boxShadowed,
  plainBox,
  CardStyle,
  CardImageStyle,
} from "../../styles/CardStyle";

export default function ImageCard(props: DesktopCardDataType) {
  const router = useNavigate();
  const { title, content, ImgUrl, link } = props;
  const [mouseHovered, setMouseHovered] = useState<boolean>(false);
  const ClickRouteHandler = () => {
    router(link);
  };

  return (
    <Card
      style={{
        ...CardStyle,
        boxShadow: mouseHovered ? boxShadowed : plainBox,
      }}
      onMouseOver={() => setMouseHovered(true)}
      onMouseOut={() => setMouseHovered(false)}
      onClick={ClickRouteHandler}>
      <Card.Img
        variant="top"
        src={ImgUrl}
        style={{ ...CardImageStyle, scale: mouseHovered ? "1.1" : "1" }}
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
