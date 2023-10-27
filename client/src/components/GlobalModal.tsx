import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import WriteModal from "./Modals/WriteConfirm";
import { selectModal } from "../store/Modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const MODAL_TYPES = {
  WriteModal: "WriteModal",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.WriteModal,
    component: <WriteModal />,
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

  const renderModal = () => {
    return findModal?.component;
  };
  return (
    <BlackBackground>
      <Container>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
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
