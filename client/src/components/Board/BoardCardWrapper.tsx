import React from "react";
import { Container } from "react-bootstrap";
import CommunityBoardCard from "../Cards/CommunityBoardCard";
import { JustifyCenter } from "../../styles/FlexBoxStlye";

function BoardCardWrapper() {
  return (
    <Container style={containerStyle}>
      <JustifyCenter>
        <CommunityBoardCard />
      </JustifyCenter>
      <JustifyCenter>
        <CommunityBoardCard />
      </JustifyCenter>
      <JustifyCenter>
        <CommunityBoardCard />
      </JustifyCenter>
      <JustifyCenter>
        <CommunityBoardCard />
      </JustifyCenter>
      <JustifyCenter>
        <CommunityBoardCard />
      </JustifyCenter>
      <JustifyCenter>
        <CommunityBoardCard />
      </JustifyCenter>
    </Container>
  );
}

export default BoardCardWrapper;

const containerStyle = {
  display: "grid",
  gridTemplateRows: "1fr 1fr 1fr",
  gridTemplateColumns: "1fr 1fr",
  gridGap: "1em",
  width: "90%",
  margin: "0 auto",
};
