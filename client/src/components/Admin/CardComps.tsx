import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NotifyCard from "./NotifyCard";
import { getDashboardData } from "../../api/admin";
import {
  boardCountType,
  repliesCountType,
  userCountDataType,
  userLoginDataType,
} from "../../types/admin";
import {
  faArrowRightToBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClipboard,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
// 오늘 가입자 수 / 총 가입자 수
// 오늘 접속자 수
// 오늘 작성 수 / 총 게시물 수
// 오늘 달린 댓글 수 /총 댓글 수
function CardComps() {
  const [boardCountData, setBoardCountData] = useState<boardCountType>();
  const [repliesCountData, setRepliesCountData] = useState<repliesCountType>();
  const [userCountData, setUserCountData] = useState<userCountDataType>();
  const [userLoginData, setUserLoginData] = useState<userLoginDataType>();

  const fetchDashboard = async () => {
    const result = await getDashboardData();
    setBoardCountData(result.boardCount.data);
    setRepliesCountData(result.repliesCount.data);
    setUserCountData(result.userCountData.data);
    setUserLoginData(result.userLoginData.data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <SimpleMenu>
      <NotifyCard
        textData={`${userCountData?.todayCount} / ${userCountData?.totalCount}`}
        subText="오늘 가입 수 / 총 가입자 수"
        icons={faUsers}
      />
      <NotifyCard
        textData={`${userLoginData?.loginCount}`}
        subText="오늘 접속자 수"
        icons={faArrowRightToBracket}
      />
      <NotifyCard
        textData={`${boardCountData?.todayBoard} / ${boardCountData?.totalBoard}`}
        subText="오늘 작성 게시물 / 총 게시물"
        icons={faClipboard}
      />
      <NotifyCard
        textData={`${repliesCountData?.todayReplies} / ${repliesCountData?.totalReplies}`}
        subText="오늘 댓글 수 / 총 댓글 수"
        icons={faCommentDots}
      />
    </SimpleMenu>
  );
}

export default CardComps;

const SimpleMenu = styled.div`
  width: 95%;
  height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2em;
`;
