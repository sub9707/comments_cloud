import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  clearRank,
  setDaily,
  setWeekly,
  setMonthly,
} from "../../store/Toggle/BoardRankTab";

function RankingTabs() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearRank());
  }, []);
  return (
    <Nav
      justify
      variant="tabs"
      defaultActiveKey="daily"
      className="w-50"
      style={{ marginLeft: "5.2em" }}>
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
    </Nav>
  );
}

export default RankingTabs;
