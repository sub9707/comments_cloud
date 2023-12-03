import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BoardRankType } from "../../types/board";
import {
  getDailyRanks,
  getMonthlyRanks,
  getWeeklyRanks,
} from "../../api/boards";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { JustFlex, JustifyCenter } from "../../styles/FlexBoxStlye";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { initRankToggle } from "../../store/Toggle/RankingToggle";

function RankingBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isShow = useSelector((state: RootState) => state.RankToggle);
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

  useEffect(() => {
    dispatch(initRankToggle());
  });

  console.log(rankData);

  return (
    <JustifyCenter>
      <RankBox>
        <RankBoxLine>
          {rankData.slice(0, 5).map((data, index) => (
            <JustFlex>
              <p
                key={index}
                className="text-underline-hover"
                onClick={() => navigate(`/myError/${data?.id}`)}>
                <strong>{index + 1}</strong>&nbsp;
                {data?.title}
              </p>
              <NewIcon src="/images/new.png" alt="newIcon" />
            </JustFlex>
          ))}
        </RankBoxLine>
        <DivisionLine />
        <RankBoxLine>
          {rankData.slice(5, 10).map((data, index) => (
            <JustFlex>
              <p
                key={index + 5}
                className="text-underline-hover"
                onClick={() => navigate(`/myError/${data?.id}`)}>
                <strong>{index + 6}</strong>&nbsp;{data?.title}
              </p>
              <NewIcon src="/images/new.png" alt="newIcon" />
            </JustFlex>
          ))}
        </RankBoxLine>
      </RankBox>
    </JustifyCenter>
  );
}

export default RankingBox;

const RankBox = styled.div`
  width: 85%;
  height: 16vh;
  background-color: #f0f0f0;
  position: relative;
  display: flex;
  padding-block: 1em;
  position: relative;
`;

const RankBoxLine = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  p {
    width: auto;
    margin-left: 1em !important;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    padding-right: 0.2em;
  }
`;
const DivisionLine = styled.div`
  width: 0.1em;
  height: 100%;
  background-color: #555555;
  border-radius: 15px;
  opacity: 0.6;
`;

const NewIcon = styled.img`
  width: 1em;
  height: 1em;
  margin-bottom: 0.1em;
  margin-left: 0.2em;
`;
