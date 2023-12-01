import React from "react";
import {
  BadgeWrapper,
  CardInfo,
  CardSubTitle,
  CardWrapper,
  DateInfo,
} from "../../styles/CardStyle";
import { CardTitle } from "react-bootstrap";

function CommunityBoardCard() {
  return (
    <CardWrapper>
      <CardTitle>Test Title Sample</CardTitle>
      <CardSubTitle>Test SubTitle Sample is This.</CardSubTitle>
      <CardInfo>
        <BadgeWrapper></BadgeWrapper>
        <DateInfo>2000.00.00</DateInfo>
      </CardInfo>
    </CardWrapper>
  );
}

export default CommunityBoardCard;
