import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { motion } from "framer-motion";

function ServiceInfoOne() {
  return (
    <ServiceBox>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: "1", delay: 1.3 }}>
        <TitleWrapper>
          <FontAwesomeIcon icon={faCompass} size="xl" />
          <ServiceTitle>Text Sample</ServiceTitle>
        </TitleWrapper>
        <ContentText>
          Text Sample. This must be the texts of the subtitle or content Texts.
        </ContentText>
      </motion.div>
    </ServiceBox>
  );
}

export default ServiceInfoOne;

export const ServiceBox = styled.div`
  width: 30%;
  padding: 2em;
  color: #6940bb;
`;
export const TitleWrapper = styled.div`
  display: flex;
  gap: 0.8em;
`;
export const ServiceTitle = styled.h3`
  font-size: 1.3em;
  font-family: ONE-Mobile-Title;
`;
export const ContentText = styled.p`
  font-size: 0.8em;
  font-family: ONE-Mobile-Title;
  margin-top: 1em;
`;
