import { CardInfo, CardWrapper, DateInfo } from "../../styles/CardStyle";
import { CardTitle, Placeholder } from "react-bootstrap";

function CommunityBoardCardPH() {
  return (
    <CardWrapper>
      <CardTitle>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </CardTitle>
      <div style={{ height: "0.5em" }} />
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} size="sm" />
        <Placeholder xs={12} size="sm" />
      </Placeholder>
      <CardInfo style={{ justifyContent: "flex-end" }}>
        <DateInfo style={{ width: "30%" }}>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} size="sm" />
          </Placeholder>
        </DateInfo>
      </CardInfo>
    </CardWrapper>
  );
}

export default CommunityBoardCardPH;
