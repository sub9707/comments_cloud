import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRank,
  setDaily,
  setWeekly,
  setMonthly,
} from "../../store/Toggle/BoardRankTab";
import { setRankToggle } from "../../store/Toggle/RankingToggle";
import styled from "styled-components";
import { RootState } from "../../store";

function RankingTabs() {
  const dispatch = useDispatch();
  const isShow = useSelector((state: RootState) => state.RankToggle);

  useEffect(() => {
    dispatch(clearRank());
  }, []);
  return (
    <Nav
      justify
      variant="tabs"
      defaultActiveKey="daily"
      className="w-50"
      style={{ marginLeft: "5.2em", position: "relative" }}>
      <Nav.Item>
        <Nav.Link eventKey="daily" onClick={() => dispatch(setDaily())}>
          일간 인기 노트
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="weekly" onClick={() => dispatch(setWeekly())}>
          주간 인기 노트
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="monthly" onClick={() => dispatch(setMonthly())}>
          월간 인기 노트
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <ToggleText
          className="text-underline-hover"
          onClick={() => dispatch(setRankToggle())}>
          {isShow?.show ? "접기" : "펼치기"}
        </ToggleText>
      </Nav.Item>
    </Nav>
  );
}

export default RankingTabs;

const ToggleText = styled.p`
  margin: 0;
  font-weight: 600;
  opacity: 0.6;
  margin-top: 0.5em;
`;
