import Lottie from "lottie-react";
import Contact from "../../utils/lotties/Contact.json";
import styled from "styled-components";

function ContactImage() {
  return (
    <ImageBox>
      <Lottie animationData={Contact} />
    </ImageBox>
  );
}

export default ContactImage;

const ImageBox = styled.div`
  width: 35%;
  position: absolute;
  bottom: 0;
  right: 5em;
`;
