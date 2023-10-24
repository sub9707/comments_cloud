import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import ImageCard from "../../components/Cards/ImgCard";
import { useState, useEffect } from "react";
import PlainCard from "../../components/Cards/PlainCard";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ColStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function MainPage() {
  const tempData = [
    {
      title: "서비스 소개",
      content: "트러블 슈터의 소개입니다",
      link: "/service",
    },
    {
      title: "공지사항",
      content: "",
      link: "/notice",
    },
    {
      title: "내 에러 노트",
      content: "에러를 기록하고 관리하세요",
      link: "/myError",
    },
    {
      title: "모두의 에러 노트",
      content: "다른 사람과 에러를 공유하고 생각을 나누세요",
      link: "/board",
    },
  ];
  const [showElements, setShowElements] = useState(window.innerWidth <= 500);

  const updateVisibility = () => {
    setShowElements(window.innerWidth <= 500);
  };

  useEffect(() => {
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);
  return (
    <MainContainer>
      {showElements ? (
        <MobileContainer>
          <PlainCard {...tempData[0]} />
          <PlainCard {...tempData[1]} />
          <PlainCard {...tempData[2]} />
          <PlainCard {...tempData[3]} />
        </MobileContainer>
      ) : (
        <>
          <Row style={{ height: "50%" }}>
            <Col style={ColStyle}>
              <ImageCard {...tempData[0]} ImgUrl="/images/Note.png" />
            </Col>
            <Col style={ColStyle}>
              <ImageCard {...tempData[1]} ImgUrl="/images/notice.png" />
            </Col>
          </Row>
          <Row style={{ height: "50%" }}>
            <Col style={ColStyle}>
              <ImageCard {...tempData[2]} ImgUrl="/images/MyError.png" />
            </Col>
            <Col style={ColStyle}>
              <ImageCard {...tempData[3]} ImgUrl="/images/Board.png" />
            </Col>
          </Row>
        </>
      )}
    </MainContainer>
  );
}
