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
        <UserGraph graphdata={userGraphData} legendName="사용자" />
      </JustifyCenter>
    </PageBox>
  );
}

const TitleHeader = styled.h1`
  font-size: 2em;
`;
