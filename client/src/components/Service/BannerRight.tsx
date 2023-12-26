import Lottie from "lottie-react";
import styled from "styled-components";
import note from "@utils/lotties/note.json";
import { motion } from "framer-motion";

function BannerRight() {
  return (
    <BannerRightBox>
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: "1", delay: 1 }}>
        <Lottie animationData={note} />
      </motion.div>
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
