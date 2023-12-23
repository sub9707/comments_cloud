import { PageBox, PageHeader } from "../../styles/AdminPageStyle";
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import CardComps from "../../components/Admin/CardComps";
import styled from "styled-components";
import UserGraph from "../../components/Admin/UserGraph";
import { useEffect, useState } from "react";
import { getUserGraphData } from "../../api/admin";
import { userGraphDataType } from "../../types/admin";

export default function AdminMainPage() {
  const [userGraphData, setUserGraphData] = useState<userGraphDataType[]>([]);
  const fetchUserGraphData = async () => {
    try {
      const userData = await getUserGraphData();

      setUserGraphData([
        {
          data: userData?.data,
          id: "사용자 수",
          color: "hsl(139,33%,51%)",
        },
      ]);
    } catch (error) {
      console.error("Error : ", error);
    }
  };
  useEffect(() => {
    fetchUserGraphData();
  }, []);
  return (
    <PageBox>
      <PageHeader>메인페이지</PageHeader>
      <br />
      <JustifyCenter style={{ flexDirection: "column", alignItems: "center" }}>
        <CardComps />
        <br />
        <TitleHeader>월별 가입자 추세</TitleHeader>
        <UserGraph graphdata={userGraphData} legendName="가입자 (명)" />
      </JustifyCenter>
    </PageBox>
  );
}

const TitleHeader = styled.h1`
  width: 100%;
  font-size: 1.3em;
  font-family: "ONE-Mobile-Title";
  letter-spacing: 0;
  line-height: 1.5em;
  padding-bottom: 15px;
  position: relative;
  margin-bottom: 1em;
  opacity: 0.9;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 5px;
    width: 55px;
    background-color: #111;
  }

  &::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 2px;
    height: 1px;
    width: 95%;
    max-width: 255px;
    background-color: #333;
  }
`;
