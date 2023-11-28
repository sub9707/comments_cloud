import styled from "styled-components";
import ResultCompOne from "./ResultCompOne";

function SearchResult() {
  return (
    <ResultBox>
      <ResultCompOne />
      <ResultCompOne />
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
