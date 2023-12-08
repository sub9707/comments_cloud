import Lottie from "lottie-react";
import styled from "styled-components";
import note from "../../utils/lotties/note.json";

function BannerRight() {
  return (
    <BannerRightBox>
      <Lottie animationData={note} />
    </BannerRightBox>
  );
}

export default BannerRight;

const BannerRightBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
