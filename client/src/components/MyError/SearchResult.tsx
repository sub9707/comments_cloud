import styled from "styled-components";
import ResultCompOne from "./ResultCompOne";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

function SearchResult() {
  const searchData = useSelector((state: RootState) => state.mySearch.data);
  return (
    <ResultBox>
      {searchData.map((data, _idx) => (
        <ResultCompOne {...data} key={_idx} />
      ))}
    </ResultBox>
  );
}

export default SearchResult;

const ResultBox = styled.div`
  width: 95%;
  height: 70vh;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  border-radius: 15px;
  overflow: hidden;
`;
