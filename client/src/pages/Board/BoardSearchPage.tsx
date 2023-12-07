import BoardPagination from "../../components/Board/BoardPagination";
import BoardResultSearchBox from "../../components/Board/BoardResultSearchBox";
import BoardSearchCardWrapper from "../../components/Board/BoardSearchCardWrapper";
import SearchInfoArea from "../../components/Board/SearchInfoArea";
import { PageHeader } from "../../styles/AdminPageStyle";
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import { MainContainer } from "../../styles/PageContainer";

function BoardSearchPage() {
  return (
    <MainContainer>
      <br />
      <br />
      <PageHeader>에러 검색 페이지</PageHeader>
      <br />
      <SearchInfoArea />
      <br />
      <br />
      <BoardSearchCardWrapper />
      <br />
      <JustifyCenter>
        <BoardResultSearchBox />
      </JustifyCenter>
      <br />
      <JustifyCenter>
        <BoardPagination />
      </JustifyCenter>
    </MainContainer>
  );
}

export default BoardSearchPage;
