import { Table } from "react-bootstrap";
import {
  ContentBox,
  MainContainer,
  TableCard,
} from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import { ErrorTableData, ErrorTableHead } from "../../styles/TableStyle";
import SolvedBadge from "../../components/Badges/SolvedTag";
import PublicBadge from "../../components/Badges/PublicTag";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

export default function MyErrorPage() {
  const [temp, setTemp] = useState<boolean>(false);

  const notify = () => {};
  return (
    <MainContainer>
      <PageHeader>나의 에러 관리</PageHeader>
      <ContentBox>
        <TableCard>
          <Table hover responsive borderless>
            <thead>
              <tr>
                <ErrorTableHead>제목</ErrorTableHead>
                <ErrorTableHead>작성일자</ErrorTableHead>
                <ErrorTableHead>관련 태그</ErrorTableHead>
                <ErrorTableHead>해결된 문제</ErrorTableHead>
                <ErrorTableHead>공개여부</ErrorTableHead>
                <ErrorTableHead>추천수</ErrorTableHead>
                <ErrorTableHead>조회수</ErrorTableHead>
              </tr>
            </thead>
            <tbody>
              <tr>
                <ErrorTableData>테스트 제목</ErrorTableData>
                <ErrorTableData>2000.00.00</ErrorTableData>
                <ErrorTableData>버튼</ErrorTableData>
                <ErrorTableData>
                  <SolvedBadge solved={"해결"} />
                </ErrorTableData>
                <ErrorTableData>
                  <PublicBadge ispublic={temp.toString()} setTemp={setTemp} />
                </ErrorTableData>
                <ErrorTableData>10,000</ErrorTableData>
                <ErrorTableData>10,000</ErrorTableData>
              </tr>
            </tbody>
          </Table>
        </TableCard>
      </ContentBox>
    </MainContainer>
  );
}
