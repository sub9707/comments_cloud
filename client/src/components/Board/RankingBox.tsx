import React, { useState } from "react";
import styled from "styled-components";

function RankingBox() {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <>
      {toggle ? (
        <RankBox>
          랭킹 영역
          <p onClick={() => setToggle(!toggle)}>접기(임시)</p>
        </RankBox>
      ) : (
        <p onClick={() => setToggle(!toggle)}>펼치기(임시)</p>
      )}
    </>
  );
}

export default RankingBox;

const RankBox = styled.div`
  width: 100%;
  height: 15vh;
  background-color: beige;
  position: relative;
  p {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0;
  }
`;
