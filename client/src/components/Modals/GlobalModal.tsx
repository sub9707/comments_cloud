import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import WriteModal from "./WriteConfirm";
import { closeModal, selectModal } from "../../store/Modal/Modal";
import styled from "styled-components";
import NoticeContentModal from "./NoticeContentModal";
import { clearData } from "../../store/Modal/NoticeModal";
import MyErrorView from "./MyErrorViewModal";

import { useRef } from "react";
import { clearReplies } from "../../store/DataThunk/RepliesSlice";

const MODAL_TYPES = {
  WriteModal: "WriteModal",
  NoticeModal: "NoticeModal",
  MyErrorModal: "MyErrorModal",
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
  {
    type: MODAL_TYPES.MyErrorModal,
    component: <MyErrorView />,
  },
];

export default function GlobalModal() {
  const { modalType, isOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  // 바깥 영역 클릭하면 닫히도록 설정
  const backgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
      dispatch(clearData());
      dispatch(clearReplies());
    }
  };

  const renderModal = () => {
    return findModal?.component;
  };
  return (
    <BlackBackground onClick={backgroundClick}>
      <Container>
        <Modal.Dialog ref={scrollRef}>
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
