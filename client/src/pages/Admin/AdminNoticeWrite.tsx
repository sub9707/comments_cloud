import styled from "styled-components";
import {
  ButtonCenter,
  PageBox,
  PageHeader,
  PageWrapper,
} from "../../styles/AdminPageStyle";
import ReactQuill from "react-quill";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/Modal";

export default function AdminNoticeWrite() {
  const dispatch = useDispatch();

  const handleWriteCancel = () => {
    dispatch(openModal({ modalType: "WriteModal", isOpen: true }));
  };

  return (
    <PageBox>
      <PageHeader>공지사항 작성</PageHeader>
      <PageWrapper>
        {" "}
        <Table>
          <tbody>
            <TableRow>
              <LeftCell>
                <Label>공지 제목</Label>
              </LeftCell>
              <RightCell>
                <Input type="text" maxLength={100} />
              </RightCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>공지 내용</Label>
              </LeftCell>
              <ContentCell>
                <ReactQuill
                  style={{ width: "100%", height: "60vh" }}
                  modules={modules}
                />
              </ContentCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>첨부파일</Label>
              </LeftCell>
              <RightCell>
                <Input style={{ border: "none" }} type="file" multiple />
              </RightCell>
            </TableRow>
          </tbody>
        </Table>
        <ButtonCenter>
          <Button variant="primary" size="lg" style={{ marginRight: "1em" }}>
            게시글 등록
          </Button>
          <Button variant="outline-dark" size="lg" onClick={handleWriteCancel}>
            작성 취소
          </Button>
        </ButtonCenter>
      </PageWrapper>
    </PageBox>
  );
}

const modules = {
  toolbar: {
    container: [
      ["image"],
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "underline", "italic"],
      ["link"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
    ],
  },
};
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d6cfdb;
  margin-bottom: 2em;
`;

const TableRow = styled.tr``;

const LeftCell = styled.td`
  background-color: #d6cfdb;
  padding: 10px;
  text-align: center;
  border: 1px solid #d6cfdb;
`;

const RightCell = styled.td`
  padding: 10px;
  border: 1px solid #d6cfdb;
`;

const ContentCell = styled.td`
  height: auto;
  padding: 10px;
  padding-bottom: 4em;
  border: 1px solid #d6cfdb;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #d6cfdb;
`;
