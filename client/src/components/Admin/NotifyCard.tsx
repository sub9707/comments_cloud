import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import styled from "styled-components";

type cardPropsType = {
  textData: string;
  subText: string;
  icons: IconProp;
};

function NotifyCard(props: cardPropsType) {
  const { textData, subText, icons } = props;
  return (
    <Card
      style={{
        width: "20%",
        height: "90%",
        display: "flex",
        justifyContent: "center",
      }}>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <FontAwesomeIcon icon={icons} size="4x" color="black" />
        <br />
        <CardMainText>{textData}</CardMainText>
        <CardSubText>{subText}</CardSubText>
      </Card.Body>
    </Card>
  );
}

export default NotifyCard;

const CardMainText = styled.h1`
  font-size: 2em;
  font-family: "ONE-Mobile-Title";
  color: #474747;
`;
const CardSubText = styled.h3`
  font-size: 1em;
  font-weight: 700;
  color: #9b9b9b;
`;
