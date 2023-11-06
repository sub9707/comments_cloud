import { Button, OverlayTrigger, Table } from "react-bootstrap";
import {
  ContentBox,
  MainContainer,
  TableCard,
  WidthMaxCenter,
} from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import { ErrorTableData, ErrorTableHead } from "../../styles/TableStyle";
import SolvedBadge from "../../components/Badges/SolvedTag";
import PublicBadge from "../../components/Badges/PublicTag";
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { MyErrorTablePropType } from "../../types/TableTypes";
import axios from "../../api/axios";
import LoadingPage from "../LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import PopoverCard from "../../components/Cards/PopoverCard";
import { ButtonRight } from "../../styles/AdminPageStyle";
import { useNavigate } from "react-router-dom";
import LoadButton from "../../components/CustomButtons/DataLoadButton";
import { getMyErrorCount, getMyErrors } from "../../api/ErrorBoard";

export default function MyErrorPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [plusLoading, setPlusLoading] = useState<boolean>(false);
  const [data, setData] = useState<MyErrorTablePropType[]>([]);
  const [totalCount, setTotalCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [dataEnd, setDataEnd] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await await getMyErrors(1, offset);
      const totalData = await getMyErrorCount(1);
      setTotalCount(totalData[0].errorsTotal);
      setData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const LoadData = async () => {
    try {
      setPlusLoading(true);
      const response = await axios.get(`/error?userId=1&offset=${offset}`);
      if (response.data.length === 0) {
        // 만약 더 이상 데이터가 없으면 dataEnd를 true로 설정
        setDataEnd(true);
      } else {
        setData((prev) => [...prev, ...response.data]);
        setOffset(offset + 12);
      }
      setPlusLoading(false);
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
        return "등록된 태그가 없습니다.";
      }
    } catch (error) {
      return "Error parsing input data";
    }
  };
  const handleRouteWrite = () => {
    navigate("/errorWrite");
  };

  useEffect(() => {
    fetchData();
    setOffset(offset + 12);
  }, []);

  useEffect(() => {
    if (totalCount !== undefined && data.length >= totalCount) {
      // 만약 데이터를 모두 가져왔다면 dataEnd를 true로 설정
      setDataEnd(true);
    }
  }, [totalCount, data]);

  return (
    <MainContainer>
      <PageHeader>나의 에러 관리</PageHeader>
      <ButtonRight>
        <Button variant="primary" onClick={handleRouteWrite}>
          새 글 작성
        </Button>
      </ButtonRight>
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
            <WidthMaxCenter>
              {dataEnd ? (
                <p>가져올 데이터가 없습니다.</p>
              ) : (
                <div
                  style={{
                    width: "17em",
                    height: "3em",
                    marginBottom: "1em",
                  }}
                  onClick={LoadData}>
                  <LoadButton isLoading={plusLoading} />
                </div>
              )}
            </WidthMaxCenter>
          </TableCard>
        )}
      </ContentBox>
    </MainContainer>
  );
}
