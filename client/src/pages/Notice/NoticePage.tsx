import BoardTable from "../../components/Table/BoardTable";
import { ContentBox, MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";

export default function NoticePage() {
  return (
    <MainContainer>
      <PageHeader>공지사항</PageHeader>
      <ContentBox>
        <BoardTable />
      </ContentBox>
    </MainContainer>
  );
}
