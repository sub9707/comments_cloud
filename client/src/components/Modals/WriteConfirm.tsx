import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/Modal";
import { ButtonRight } from "../../styles/AdminPageStyle";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../store";

export default function WriteModal() {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const { locate } = useSelector((state: RootState) => state.modal);
  const handleModalConfirm = () => {
    dispatch(closeModal());
    naviagate(locate);
  };
  const handleModalClose = () => {
    dispatch(closeModal());
  };
  return (
    <>
      <Modal.Header>
        <Modal.Title style={{ fontSize: "1.4em" }}>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size="sm"
            style={{ marginRight: "0.5em" }}
          />
          주의
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size="sm"
            style={{ marginLeft: "0.5em" }}
          />
        </Modal.Title>
      </Modal.Header>
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
