import BoardCardWrapper from "../../components/Board/BoardCardWrapper";
import BoardPagination from "../../components/Board/BoardPagination";
import BoardSearchBox from "../../components/Board/BoardSearchBox";
import ControlBox from "../../components/Board/ControlBox";
import RankingBox from "../../components/Board/RankingBox";
import { JustifyCenter, JustifyEnd } from "../../styles/FlexBoxStlye";
import { MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import RankingTabs from "./RankingTabs";

export default function BoardPage() {
  return (
    <MainContainer>
      <PageHeader>모두의 에러</PageHeader>
      <br />
      <RankingTabs />
      <RankingBox />
      <br />
      <JustifyEnd>
        <ControlBox />
      </JustifyEnd>
      <br />
      <BoardCardWrapper />
      <br />
      <JustifyCenter>
        <BoardSearchBox />
      </JustifyCenter>
      <br />
      <JustifyCenter>
        <BoardPagination />
      </JustifyCenter>
    </MainContainer>
  );
}
