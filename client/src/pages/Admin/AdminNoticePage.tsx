import { Button } from "react-bootstrap";
import { ButtonRight, PageBox, PageHeader } from "../../styles/AdminPageStyle";
import { useNavigate } from "react-router-dom";
import AdminBoardTable from "../../components/Table/AdminBoardTable";
import { useEffect, useState } from "react";
import { NoticeTablePropType } from "../../types/TableTypes";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function AdminNoticePage() {
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const [data, setData] = useState<NoticeTablePropType[]>([]);
  const navigate = useNavigate();
  const handleWriteBtnClick = () => {
    navigate("/admin/notice/write");
  };
  const handleRouteClick = () => {
    navigate("/notice");
  };
  // data Fetching
  const fetchData = async () => {
    try {
      const response = await axios.get("/notice/notices");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("fetched");
  }, [isOpen]);
  return (
    <PageBox>
      <PageHeader style={{ marginBottom: "1em" }}>
        공지사항 관리 페이지
      </PageHeader>
      <ButtonRight>
        <Button
          style={{ marginRight: "1em" }}
          variant="primary"
          size="lg"
          onClick={handleRouteClick}>
          공지사항으로
        </Button>
        <Button variant="primary" size="lg" onClick={handleWriteBtnClick}>
          공지글 작성
        </Button>
      </ButtonRight>
      <AdminBoardTable data={data} />
    </PageBox>
  );
}
