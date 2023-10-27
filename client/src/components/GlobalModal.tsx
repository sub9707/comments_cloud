import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import WriteModal from "./Modals/WriteConfirm";
import { closeModal, selectModal } from "../store/Modal";
import styled from "styled-components";
import NoticeContentModal from "./Modals/NoticeContentModal";
import { clearData } from "../store/NoticeModal";

const MODAL_TYPES = {
  WriteModal: "WriteModal",
  NoticeModal: "NoticeModal",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.WriteModal,
    component: <WriteModal />,
  },
  {
    type: MODAL_TYPES.NoticeModal,
    component: <NoticeContentModal />,
  },
];

export default function GlobalModal() {
  // modal type을 string 형태로 받습니다.
  const { modalType, isOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  // 바깥 영역 클릭하면 닫히도록 설정
  const backgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
      dispatch(clearData());
    }
  };
  const renderModal = () => {
    return findModal?.component;
  };
  return (
    <BlackBackground onClick={backgroundClick}>
      <Container>
        <Modal.Dialog>
          <Modal.Body>{renderModal()}</Modal.Body>
        </Modal.Dialog>
      </Container>
    </BlackBackground>
  );
}
const BlackBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000b3;
  position: fixed;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: auto;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1% 2%;
`;
