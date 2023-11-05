import { OverlayTrigger, Table } from "react-bootstrap";
import {
  ContentBox,
  MainContainer,
  TableCard,
} from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import { ErrorTableData, ErrorTableHead } from "../../styles/TableStyle";
import SolvedBadge from "../../components/Badges/SolvedTag";
import PublicBadge from "../../components/Badges/PublicTag";
import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { MyErrorTablePropType } from "../../types/TableTypes";
import axios from "../../api/axios";
import LoadingPage from "../LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import PopoverCard from "../../components/Cards/PopoverCard";

export default function MyErrorPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<MyErrorTablePropType[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/error?userId=1");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const concatTagData = (str: string) => {
    try {
      const jsonArray = JSON.parse(str);
      if (Array.isArray(jsonArray)) {
        const resultString = jsonArray.join(", ");
        return resultString;
      } else {
        return "등록된 태그가 없습니다";
      }
    } catch (error) {
      return "Error parsing input data";
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <MainContainer>
      <PageHeader>나의 에러 관리</PageHeader>
      <ContentBox>
        {loading ? (
          <LoadingPage />
        ) : (
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
                {data.map((board, _idx) => (
                  <tr key={_idx}>
                    <ErrorTableData>{board?.title}</ErrorTableData>
                    <ErrorTableData>{board?.write_date}</ErrorTableData>
                    <ErrorTableData>
                      <OverlayTrigger
                        trigger="hover"
                        overlay={PopoverCard({
                          headerText: "태그 정보",
                          bodyText: `${concatTagData(board?.tags)}`,
                        })}
                        placement="right">
                        <FontAwesomeIcon icon={faTags} cursor={"pointer"} />
                      </OverlayTrigger>
                    </ErrorTableData>
                    <ErrorTableData>
                      <SolvedBadge
                        solved={`${
                          board?.error_solved === 1 ? "해결" : "미해결"
                        }`}
                      />
                    </ErrorTableData>
                    <ErrorTableData>
                      <PublicBadge
                        ispublic={board?.publicCheck === 1 ? "true" : "false"}
                      />
                    </ErrorTableData>
                    <ErrorTableData>{board?.likes}</ErrorTableData>
                    <ErrorTableData>{board?.views}</ErrorTableData>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableCard>
        )}
      </ContentBox>
    </MainContainer>
  );
}
