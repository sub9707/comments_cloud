import { Button } from "react-bootstrap";
import { ButtonRight, PageBox, PageHeader } from "../../styles/AdminPageStyle";
import { useNavigate } from "react-router-dom";

export default function AdminNoticePage() {
  const navigate = useNavigate();
  const handleWriteBtnClick = () => {
    navigate("/admin/notice/write");
  };
  return (
    <PageBox>
      <PageHeader>공지사항 관리 페이지</PageHeader>
      <ButtonRight>
        <Button variant="primary" size="lg" onClick={handleWriteBtnClick}>
          공지글 작성
        </Button>
      </ButtonRight>
    </PageBox>
  );
}
