import Lottie from "lottie-react";
import Contact from "@utils/lotties/Contact.json";
import styled from "styled-components";
import { motion } from "framer-motion";

function ContactImage(props: { onRef: React.RefObject<HTMLDivElement> }) {
  return (
    <ImageBox
      initial={{ x: 80, opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: "1" }}
      viewport={{ root: props.onRef, once: true }}>
      <Lottie animationData={Contact} />
    </ImageBox>
  );
}

export default ContactImage;

const ImageBox = styled(motion.div)`
  width: 35%;
  position: absolute;
  bottom: 0;
  right: 5em;
`;
