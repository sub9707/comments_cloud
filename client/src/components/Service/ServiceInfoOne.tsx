import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ServiceInfoDataType } from "../../types/Components-type";

function ServiceInfoOne(props: ServiceInfoDataType) {
  const { title, subtitle, delay } = props;
  return (
    <ServiceBox>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: "1", delay: delay }}>
        <TitleWrapper>
          <FontAwesomeIcon icon={faCompass} size="xl" />
          <ServiceTitle>{title}</ServiceTitle>
        </TitleWrapper>
        <ContentText>{subtitle}</ContentText>
      </motion.div>
    </ServiceBox>
  );
}

export default ServiceInfoOne;

const ServiceBox = styled.div`
  width: 30%;
  padding: 2em;
  color: #4d46ad;
`;
const TitleWrapper = styled.div`
  display: flex;
  gap: 0.8em;
`;
const ServiceTitle = styled.h3`
  font-size: 1.3em;
  font-family: ONE-Mobile-Title;
`;
const ContentText = styled.p`
  font-size: 0.8em;
  font-family: ONE-Mobile-Title;
  margin-top: 1em;
`;
