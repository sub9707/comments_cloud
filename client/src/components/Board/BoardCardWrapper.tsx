import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CommunityBoardCard from "../Cards/CommunityBoardCard";
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import { getAllBoards } from "../../api/boards";
import { BoardFetchType } from "../../types/board";
import { useDispatch, useSelector } from "react-redux";
import { clearPagination, setTotalCount } from "../../store/Utils/Pagination";
import { RootState } from "../../store";

function BoardCardWrapper() {
  const [boardData, setBoardData] = useState<BoardFetchType[]>([]);
  const dispatch = useDispatch();
  const { offset } = useSelector((state: RootState) => state.pagination);

  const fetchData = async (offset: number) => {
    try {
      const result = await getAllBoards(offset);
      setBoardData(result.data);
      dispatch(setTotalCount(result.totalCount));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(clearPagination());
  }, []);

  useEffect(() => {
    fetchData(offset);
  }, [offset]);

  return (
    <Container style={containerStyle}>
      {boardData.map((data, _idx) => (
        <JustifyCenter key={_idx}>
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
