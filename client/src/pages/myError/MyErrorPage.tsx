import { ContentBox, MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";

import "react-toastify/dist/ReactToastify.css";
import MyErrorTable from "../../components/Table/MyErrorTable";
import MyErrorMenu from "../../components/Menu/MyErrorMenu";

export default function MyErrorPage() {
  return (
    <MainContainer>
      <PageHeader>나의 에러 관리</PageHeader>
      <MyErrorMenu />
      <ContentBox>
        <MyErrorTable />
      </ContentBox>
    </MainContainer>
  );
}
