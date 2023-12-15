import { Button, Modal } from "react-bootstrap";
import { ButtonCenter } from "../../styles/AdminPageStyle";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/Modal/Modal";
import { RootState } from "../../store";
import { clearData } from "../../store/Modal/NoticeModal";
import { useState } from "react";
import { deleteNotice } from "../../api/notice";
import {
  ModalContainer,
  ModalContent,
} from "../../styles/ModalStyle/ModalStyle";

export default function NoticeContentModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { id, title, content } = useSelector(
    (state: RootState) => state.notice
  );
  const handleModalClose = () => {
    dispatch(closeModal());
    dispatch(clearData());
  };
  const handleDeleteNotice = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteNotice(id);
      setIsLoading(false);
      dispatch(closeModal());
      dispatch(clearData());
    } catch (error) {
      console.error(error);
    }
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
        <Button
          variant="danger"
          style={{ marginRight: "1em" }}
          onClick={() => handleDeleteNotice(id)}
          disabled={isLoading}>
          {isLoading ? "삭제 중" : "공지 삭제"}
        </Button>
        <Button variant="outline-primary" onClick={handleModalClose}>
          창닫기
        </Button>
      </ButtonCenter>
    </ModalContainer>
  );
}
