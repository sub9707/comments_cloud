import { Button } from "react-bootstrap";
import { ButtonRight, PageBox, PageHeader } from "../../styles/AdminPageStyle";
import { useNavigate } from "react-router-dom";
import AdminBoardTable from "../../components/Table/AdminBoardTable";

export default function AdminNoticePage() {
  const navigate = useNavigate();
  const handleWriteBtnClick = () => {
    navigate("/admin/notice/write");
  };
  const handleRouteClick = () => {
    navigate("/notice");
  };
  return (
    <PageBox>
      <PageHeader>공지사항 관리 페이지</PageHeader>
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
      <AdminBoardTable />
    </PageBox>
  );
}
