import { Button, Modal } from "react-bootstrap";
import { ModalContainer, ModalContent } from "@styles/ModalStyle/ModalStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBoardModal,
  selectBoardData,
} from "@/store/Modal/AdminBoardModal";
import styled from "styled-components";
import { JustifyCenter, JustifyStart } from "@styles/FlexBoxStlye";
import { closeModal } from "@/store/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { deleteError } from "@api/ErrorBoard";

function AdminBoardModal() {
  const boardData = useSelector(selectBoardData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderItem = (key: string, value: any) => (
    <JustifyStart key={key} style={{ marginBottom: "0.7em" }}>
      <ItemHeader>{key}: </ItemHeader>
      <ItemHeader>{value}</ItemHeader>
    </JustifyStart>
  );
  const BooleanItem = (key: string, value: any) =>
    renderItem(key, value ? "해결됨" : "미해결");

  const items = [
    renderItem("Board_Id", boardData?.id),
    renderItem("Writer_Id", boardData?.writer_id),
    renderItem("글제목", boardData?.title),
    renderItem("조회수", boardData?.views),
    renderItem("좋아요", boardData?.likes),
    renderItem("작성일자", boardData?.write_date),
    BooleanItem("해결여부", boardData?.error_solved),
    renderItem("글공개여부", boardData?.publicCheck),
  ];
  const handleDeleteClick = async () => {
    try {
      await deleteError(boardData?.id);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(closeModal());
      dispatch(clearBoardModal());
      navigate(0);
    }
  };
  const handleNavigateClick = () => {
    navigate(`/myError/${boardData.id}`);
  };
  const handleCloseClick = () => {
    dispatch(closeModal());
    dispatch(clearBoardModal());
  };
  return (
    <ModalContainer style={{ width: "50vw", height: "50vh" }}>
      <Modal.Header>
        <Modal.Title
          style={{ fontSize: "1.5em", fontWeight: "700", marginTop: "1em" }}>
          게시물 정보관리
        </Modal.Title>
      </Modal.Header>
      <ModalContent>{items}</ModalContent>
      <JustifyCenter style={{ gap: "1em" }}>
        <Button variant="danger" onClick={handleDeleteClick}>
          게시물 삭제
        </Button>
        <Button variant="outline-primary" onClick={handleNavigateClick}>
          게시물로 이동
        </Button>
        <Button variant="outline-danger" onClick={handleCloseClick}>
          닫기
        </Button>
      </JustifyCenter>
    </ModalContainer>
  );
}

export default AdminBoardModal;

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
