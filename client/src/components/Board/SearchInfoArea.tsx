import { useSelector } from "react-redux";
import { RootState } from "../../store";

function SearchInfoArea() {
  const dataCounts = useSelector((state: RootState) => state.boardSearch.count);
  return <div>총 {dataCounts}개의 검색 결과가 있습니다.</div>;
}

export default SearchInfoArea;
