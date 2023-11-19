import React, { useEffect, useState } from "react";
import { TableCard, WidthMaxCenter } from "../../styles/PageContainer";
import { OverlayTrigger, Table } from "react-bootstrap";
import { ErrorTableData, ErrorTableHead } from "../../styles/TableStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SolvedBadge from "../Badges/SolvedTag";
import PublicBadge from "../Badges/PublicTag";
import LoadButton from "../CustomButtons/DataLoadButton";
import { useDispatch } from "react-redux";
import { MyErrorTablePropType } from "../../types/TableTypes";
import { getMyErrorCount, getMyErrors } from "../../api/ErrorBoard";
import { setMyErrorData } from "../../store/Modal/MyErrorModal";
import { openModal } from "../../store/Modal/Modal";
import PopoverCard from "../Cards/PopoverCard";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";
import LoadingPage from "../../pages/LoadingPage";

function MyErrorTable() {
  const [loading, setLoading] = useState<boolean>(false);
  const [plusLoading, setPlusLoading] = useState<boolean>(false);
  const [data, setData] = useState<MyErrorTablePropType[]>([]);
  const [totalCount, setTotalCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [dataEnd, setDataEnd] = useState<boolean>(false);
  const dispatch = useDispatch();

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

  const handleModalOpen = (board: MyErrorTablePropType) => {
    dispatch(setMyErrorData(board));
    dispatch(openModal({ modalType: "MyErrorModal", isOpen: true }));
  };

  useEffect(() => {
    fetchData();
    setOffset(offset + 12);
  }, []);

  useEffect(() => {
    if (totalCount !== undefined && data.length >= totalCount) {
      // 만약 데이터를 모두 가져왔다면 dataEnd를 true로
      setDataEnd(true);
    }
  }, [totalCount, data]);
  if (loading) return <LoadingPage />;
  else
    return (
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
                <ErrorTableData onClick={() => handleModalOpen(board)}>
                  {board?.title}
                </ErrorTableData>
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
                    solved={`${board?.error_solved === 1 ? "해결" : "미해결"}`}
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
    );
}

export default MyErrorTable;