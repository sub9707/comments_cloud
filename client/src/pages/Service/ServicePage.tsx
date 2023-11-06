import TempView from "../../components/TempView";
import { MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";

export default function ServicePage() {
  return (
    <MainContainer>
      <PageHeader>서비스 소개</PageHeader>
      <TempView />
    </MainContainer>
  );
}
