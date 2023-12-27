import { MainContainer } from "@styles/PageContainer";
import { PageHeader } from "@styles/TextStyle";
import SearchBox from "@components/MyError/SearchBox";
import { JustifyCenter } from "@styles/FlexBoxStlye";
import SearchResult from "@components/MyError/SearchResult";
import { useSelector } from "react-redux";
import { MyErrorSearchDataType } from "@/types/BoardTypes";
import SpinnerOne from "@components/Utils/Spinner";

function MyErrorSearch() {
  const loading = useSelector((state: MyErrorSearchDataType) => state.loading);
  return (
    <MainContainer>
      <PageHeader>나의 에러 검색</PageHeader>
      <br />
      <JustifyCenter>
        <SearchBox />
      </JustifyCenter>
      <JustifyCenter>
        {loading ? <SpinnerOne /> : <SearchResult />}
      </JustifyCenter>
    </MainContainer>
  );
}

export default MyErrorSearch;
