import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ContentText,
  ServiceBox,
  ServiceTitle,
  TitleWrapper,
} from "./ServiceInfoOne";
import { faCompass } from "@fortawesome/free-regular-svg-icons";

function ServiceInfoThree() {
  return (
    <ServiceBox>
      <TitleWrapper>
        <FontAwesomeIcon icon={faCompass} size="xl" />
        <ServiceTitle>Text Sample</ServiceTitle>
      </TitleWrapper>
      <ContentText>
        Text Sample. This must be the texts of the subtitle or content Texts.
      </ContentText>
    </ServiceBox>
  );
}

export default ServiceInfoThree;
