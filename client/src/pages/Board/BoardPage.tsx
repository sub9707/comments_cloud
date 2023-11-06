import TempView from "../../components/TempView";
import { MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";

export default function BoardPage() {
  return (
    <MainContainer>
      <PageHeader>board</PageHeader>
      <TempView />
    </MainContainer>
  );
}
