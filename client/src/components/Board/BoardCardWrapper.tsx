import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CommunityBoardCard from "../Cards/CommunityBoardCard";
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import { getAllBoards } from "../../api/boards";
import { BoardFetchType } from "../../types/board";

function BoardCardWrapper() {
  const [boardData, setBoardData] = useState<BoardFetchType[]>([]);
  const fetchData = async () => {
    try {
      const result = await getAllBoards(0);
      setBoardData(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(boardData);
  return (
    <Container style={containerStyle}>
      {boardData.map((data, _idx) => (
        <JustifyCenter>
          <CommunityBoardCard {...data} />
        </JustifyCenter>
      ))}
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
