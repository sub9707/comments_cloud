import React from "react";
import { MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import SearchBox from "../../components/MyError/SearchBox";
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import SearchResult from "../../components/MyError/SearchResult";

function MyErrorSearch() {
  return (
    <MainContainer>
      <PageHeader>나의 에러 검색</PageHeader>
      <br />
      <JustifyCenter>
        <SearchBox />
      </JustifyCenter>
      <JustifyCenter>
        <SearchResult />
      </JustifyCenter>
    </MainContainer>
  );
}

export default MyErrorSearch;
