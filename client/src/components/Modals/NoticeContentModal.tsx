import { Button, Modal } from "react-bootstrap";
import { ButtonCenter } from "../../styles/AdminPageStyle";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/Modal";
import styled from "styled-components";
import { RootState } from "../../store";
import { clearData } from "../../store/NoticeModal";

export default function NoticeContentModal() {
  const dispatch = useDispatch();
  const { title, content } = useSelector((state: RootState) => state.notice);
  const handleModalClose = () => {
    dispatch(closeModal());
    dispatch(clearData());
  };
  return (
    <ModalContainer>
      <Modal.Header>
        <Modal.Title style={{ fontSize: "1.4em", marginTop: "1em" }}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <ModalContent dangerouslySetInnerHTML={{ __html: content }} />
      <ButtonCenter>
        <Button style={{ marginRight: "1em" }}>공지 수정</Button>
        <Button variant="outline-primary" onClick={handleModalClose}>
          창닫기
        </Button>
      </ButtonCenter>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 50vw;
  height: 80vh;
`;
const ModalContent = styled.div`
  height: 60vh;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-block: 2em;
`;
