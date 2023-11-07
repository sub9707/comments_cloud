import Card from "react-bootstrap/Card";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DesktopCardDataType } from "../../types/Components-type";

export default function ImageCard(props: DesktopCardDataType) {
  const router = useNavigate();
  const { title, content, ImgUrl, link } = props;
  const [mouseHovered, setMouseHovered] = useState<boolean>(false);
  const imageRef = useRef(null);
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
        className={`${mouseHovered ? "rotate-animation" : ""}`}
        variant="top"
        src={ImgUrl}
        style={{
          ...CardImageStyle,
          scale: mouseHovered ? "1.1" : "1",
        }}
        ref={imageRef}
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

// 절대 경로 오류로 컴포넌트에 스타일 위치
const CardImageStyle = {
  width: "100%",
  height: "60%",
  objectFit: "contain" as const,
  transition: "scale 0.7s ease-out",
};

const CardStyle = {
  width: "85%",
  height: "23em",
  transition: "all 0.3s ease-out",
  cursor: "pointer",
};
export const boxShadowed =
  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset";
export const plainBox = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
