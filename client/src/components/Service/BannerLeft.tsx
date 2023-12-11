import styled from "styled-components";
import { motion } from "framer-motion";

function BannerLeft() {
  return (
    <BannerLeftBox>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: "1" }}>
        <MainTitleH1>Example Bold Title Text</MainTitleH1>
      </motion.div>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: "1", delay: 0.3 }}>
        <SubTitleText>
          Subtitle Text. Just Take any Texts in this Area. <br />I Guess This
          must be two lines.
        </SubTitleText>
      </motion.div>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: "1", delay: 0.5 }}>
        <ServiceButtonArea>
          <ServiceButton>Action</ServiceButton>
          <ServiceInfoText>
            111111111111111111111111111111111111111111111111111111
          </ServiceInfoText>
        </ServiceButtonArea>
      </motion.div>
    </BannerLeftBox>
  );
}

export default BannerLeft;

const BannerLeftBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
  margin-left: 2em;
`;

const MainTitleH1 = styled.h1`
  font-family: ONE-Mobile-Title;
  font-weight: 700;
  color: #6b3fbd;
`;
const SubTitleText = styled.p`
  margin: 0;
  margin-top: 1em;
  color: #5528a7;
`;
const ServiceButtonArea = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 2em;
  align-items: center;
`;
export const ServiceButton = styled.button`
  background-color: #7528f1;
  width: 7em;
  height: 2.5em;
  border: none;
  color: white;
`;
const ServiceInfoText = styled.p`
  width: 21em;
  height: 3em;
  font-size: 1em;
  word-wrap: break-word;
  margin: 0;
  margin-left: 1em;
  color: #5528a7;
`;
