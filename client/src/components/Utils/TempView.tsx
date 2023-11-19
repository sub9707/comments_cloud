import styled, { keyframes } from "styled-components";

export default function TempView() {
  const text = "개발 진행중인 서비스입니다";
  const letters = text.split("");

  return (
    <div
      style={{
        width: "100%",
        height: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <img
        style={{ width: "50%", height: "70%" }}
        src="images/underCon.png"
        alt="대체이미지"
      />
      {/* <h1>개발 진행중인 서비스입니다.</h1> */}
      <WaviyContainer>
        <div className="waviy">
          {letters.map((char, index) => (
            <Letter
              key={index}
              style={{ animationDelay: `calc(0.05s * ${index})` }}>
              {char}
            </Letter>
          ))}
        </div>
      </WaviyContainer>
    </div>
  );
}
const WaviyContainer = styled.div`
  position: relative;
  font-size: 60px;

  .waviy {
    display: flex;
  }
`;

const animate = keyframes`
  0%, 40%, 100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-20px);
  }
`;
const Letter = styled.span`
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  animation: ${animate} 1s infinite;
`;
