import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { closeModal } from "@/store/Modal/Modal";

function NeedLoginModal() {
  const dispatch = useDispatch();
  const handleClickClose = () => {
    dispatch(closeModal());
  };
  return (
    <>
      <br />
      <Modal.Body style={{ display: "flex", marginInline: "1em" }}>
        <FontAwesomeIcon
          icon={faCircleExclamation}
          size="xl"
          style={{ marginTop: "0.2em", marginRight: "0.5em" }}
        />
        <h2 style={{ fontFamily: "Happiness-Sans-Bold" }}>
          로그인이 필요한 서비스입니다.
        </h2>
      </Modal.Body>
      <br />
      <Modal.Footer>
        <Button onClick={handleClickClose}>확인</Button>
      </Modal.Footer>
    </>
  );
}

export default NeedLoginModal;
