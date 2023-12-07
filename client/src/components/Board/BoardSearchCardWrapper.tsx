import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CommunityBoardCard from "../Cards/CommunityBoardCard";
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import { BoardFetchType } from "../../types/board";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearReplies } from "../../store/DataThunk/RepliesSlice";
import { fetchBoardSearchData } from "../../store/DataThunk/BoardSearchSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { setTotalCount } from "../../store/Utils/Pagination";

function BoardSearchCardWrapper() {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const { offset } = useSelector((state: RootState) => state.pagination);
  const search = useSelector((state: RootState) => state.boardSearch.search);
  const boardData = useSelector((state: RootState) => state.boardSearch.data);
  const boardTotalCount = useSelector(
    (state: RootState) => state.boardSearch.count
  );

  useEffect(() => {
    dispatch(clearReplies());
  }, []);

  useEffect(() => {
    dispatch(setTotalCount(boardTotalCount));
  }, [boardTotalCount]);

  useEffect(() => {
    dispatch(fetchBoardSearchData({ search, offset }));
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

export default BoardSearchCardWrapper;

const containerStyle = {
  display: "grid",
  gridTemplateRows: "1fr 1fr 1fr",
  gridTemplateColumns: "1fr 1fr",
  gridGap: "1em",
  width: "90%",
  margin: "0 auto",
};
