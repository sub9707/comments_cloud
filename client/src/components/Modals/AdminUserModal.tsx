import { Button, Modal } from "react-bootstrap";
import {
  ModalContainer,
  ModalContent,
} from "../../styles/ModalStyle/ModalStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { DottedDivision } from "../../styles/UtilityElements";
import styled from "styled-components";
import { JustFlex, JustifyCenter } from "../../styles/FlexBoxStlye";
import { closeModal } from "../../store/Modal/Modal";
import { deleteUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

function AdminUserModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.adminUserModalSlice);
  const handleDeleteClick = async () => {
    try {
      await deleteUser(userData?.id);
      alert("삭제되었습니다.");
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
    } finally {
      navigate(0);
    }
  };
  const handleClickClose = () => {
    dispatch(closeModal());
  };
  return (
    <ModalContainer style={{ width: "30vw", height: "50vh" }}>
      <Modal.Header>
        <Modal.Title
          style={{ fontSize: "1.4em", fontWeight: "600", marginTop: "1em" }}>
          유저 관리
        </Modal.Title>
      </Modal.Header>
      <DottedDivision />
      <ModalContent>
        <JustFlex>
          <ItemHeader>ID :</ItemHeader>
          <ItemText>{userData?.id}</ItemText>
        </JustFlex>
        <br />
        <JustFlex>
          <ItemHeader>Name :</ItemHeader>
          <ItemText>{userData?.name}</ItemText>
        </JustFlex>
        <br />
        <JustFlex>
          <ItemHeader>Nickname :</ItemHeader>
          <ItemText>{userData?.nickname}</ItemText>
        </JustFlex>
        <br />
        <JustFlex>
          <ItemHeader>Nickname_change_date :</ItemHeader>
          <ItemText>{userData?.nickname_change_date}</ItemText>
        </JustFlex>
        <br />
        <JustFlex>
          <ItemHeader>RegisterDate :</ItemHeader>
          <ItemText>{userData?.registerDate}</ItemText>
        </JustFlex>
        <br />
        <JustFlex>
          <ItemHeader>last_login :</ItemHeader>
          <ItemText>{userData?.last_login}</ItemText>
        </JustFlex>
        <br />
        <JustifyCenter style={{ gap: "1em" }}>
          <Button variant="danger" onClick={handleDeleteClick}>
            회원삭제
          </Button>
          <Button variant="outline-danger" onClick={handleClickClose}>
            닫기
          </Button>
        </JustifyCenter>
      </ModalContent>
    </ModalContainer>
  );
}

export default AdminUserModal;

const ItemHeader = styled.p`
  margin: 0;
  font-size: larger;
  font-weight: 700;
  margin-right: 0.5em;
`;
const ItemText = styled.p`
  margin: 0;
  font-size: larger;
`;
