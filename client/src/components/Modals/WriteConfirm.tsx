import { useDispatch } from "react-redux";
import { closeModal } from "../../store/Modal";
import { ButtonRight } from "../../styles/AdminPageStyle";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function WriteModal() {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const handleModalConfirm = () => {
    dispatch(closeModal());
    naviagate("/admin/notice");
  };
  const handleModalClose = () => {
    dispatch(closeModal());
  };
  return (
    <>
      <h4 style={{ marginBottom: "1em", marginTop: "0.5em" }}>
        이 페이지를 벗어나면 작성한 내용이 사라집니다.
      </h4>
      <ButtonRight>
        <Button style={{ marginRight: "1em" }} onClick={handleModalConfirm}>
          목록으로
        </Button>
        <Button variant="outline-primary" onClick={handleModalClose}>
          계속 작성
        </Button>
      </ButtonRight>
    </>
  );
}
