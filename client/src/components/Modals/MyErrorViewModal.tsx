import { Modal } from "react-bootstrap";
import { ModalContainer } from "../../styles/ModalStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

export default function MyErrorView() {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.myError);

  return (
    <ModalContainer>
      <Modal.Header>test</Modal.Header>
      <p>{JSON.stringify(data)}</p>
    </ModalContainer>
  );
}
