import CommunityBoardCard from "../../components/Cards/CommunityBoardCard";
import CommunityBoardCardPH from "../../components/Cards/CommunityBoardCardPH";
import TempView from "../../components/Utils/TempView";
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import { MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";

export default function BoardPage() {
  return (
    <MainContainer>
      <PageHeader>모두의 에러</PageHeader>
      <JustifyCenter style={{ gap: "1em" }}>
        <CommunityBoardCard />
        <CommunityBoardCardPH />
      </JustifyCenter>
    </MainContainer>
  );
}
