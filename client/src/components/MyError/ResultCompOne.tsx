import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

function ResultCompOne() {
  return (
    <ResultOne>
      <ResultTitle className="text-underline-hover">
        123121231212312
      </ResultTitle>
      <ResultDate>2000.00.00</ResultDate>
      <ResultViews>
        <FontAwesomeIcon icon={faEye} style={{ marginRight: "0.5em" }} />
        123
      </ResultViews>
    </ResultOne>
  );
}

export default ResultCompOne;

const ResultOne = styled.div`
  width: 100%;
  height: 4vh;
  display: flex;
  align-items: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0; /* 아래에 배치 */
    left: 0;
    width: 100%;
    height: 1px; /* 선의 높이, 필요에 따라 조절하세요 */
    background-color: #e2e2e2; /* 선의 색상, 필요에 따라 조절하세요 */
  }
`;

const ResultTitle = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 3em;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ResultViews = styled.div`
  min-width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;
const ResultDate = styled.div`
  width: 15%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;
