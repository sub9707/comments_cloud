import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BoardRankType } from "../../types/board";
import {
  getDailyRanks,
  getMonthlyRanks,
  getWeeklyRanks,
} from "../../api/boards";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { JustifyCenter } from "../../styles/FlexBoxStlye";

function RankingBox() {
  const [rankData, setRankData] = useState<BoardRankType[]>([]);
  const tabState = useSelector((state: RootState) => state.BoardRankTab);

  const fetchRankData = async () => {
    if (tabState.daily) {
      try {
        const result = await getDailyRanks();
        setRankData(result);
      } catch (error) {
        console.error(error);
      }
    } else if (tabState.weekly) {
      try {
        const result = await getWeeklyRanks();
        setRankData(result);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const result = await getMonthlyRanks();
        setRankData(result);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchRankData();
  }, [tabState]);

  console.log(rankData);

  return (
    <JustifyCenter>
      <RankBox>
        <RankBoxLine>
          {rankData.slice(0, 5).map((data, index) => (
            <p key={index} className="">
              #{index + 1}&nbsp;
              {data?.title}
            </p>
          ))}
        </RankBoxLine>
        <RankBoxLine>
          {rankData.slice(5, 10).map((data, index) => (
            <p key={index + 5}>
              #{index + 6}&nbsp;{data?.title}
            </p>
          ))}
        </RankBoxLine>
      </RankBox>
    </JustifyCenter>
  );
}

export default RankingBox;

const RankBox = styled.div`
  width: 85%;
  height: 15vh;
  background-color: beige;
  position: relative;
  display: flex;
  padding: 10px 20px;
`;

const RankBoxLine = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  line-height: 0.7em;
`;
