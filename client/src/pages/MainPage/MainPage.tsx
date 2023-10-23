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
          <PlainCard />
          <PlainCard />
          <PlainCard />
          <PlainCard />
        </MobileContainer>
      ) : (
        <>
          <Row style={{ height: "50%" }}>
            <Col style={ColStyle}>
              <ImageCard />
            </Col>
            <Col style={ColStyle}>
              <ImageCard />
            </Col>
          </Row>
          <Row style={{ height: "50%" }}>
            <Col style={ColStyle}>
              <ImageCard />
            </Col>
            <Col style={ColStyle}>
              <ImageCard />
            </Col>
          </Row>
        </>
      )}
    </MainContainer>
  );
}
