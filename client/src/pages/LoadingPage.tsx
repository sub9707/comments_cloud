import styled from "styled-components";
import Lottie from "lottie-react";
import loadingLottie from "../utils/lotties/Spinner.json";

export default function LoadingPage() {
  return (
    <ExternalPage>
      <Lottie animationData={loadingLottie} />
    </ExternalPage>
  );
}

const ExternalPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  opacity: 0.6;
`;
