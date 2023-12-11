import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ContentText,
  ServiceBox,
  ServiceTitle,
  TitleWrapper,
} from "./ServiceInfoOne";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";

function ServiceInfoThree() {
  return (
    <ServiceBox>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: "1", delay: 1.9 }}>
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

export default ServiceInfoThree;
