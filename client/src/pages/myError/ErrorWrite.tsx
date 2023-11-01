import { Button, InputGroup } from "react-bootstrap";
import {
  ButtonCenter,
  CheckBoxArea,
  Input,
  Label,
  LeftCell,
  PageWrapper,
  RightCell,
  Table,
  TableRow,
} from "../../styles/AdminPageStyle";
import { MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import TagInputs from "../../components/Table/TagInputs";

export default function ErrorWrite() {
  return (
    <MainContainer>
      <PageHeader>나의 에러 기록</PageHeader>
      <PageWrapper>
        {" "}
        <Table>
          <tbody>
            <TableRow>
              <LeftCell>
                <Label>에러명 (에러코드)</Label>
              </LeftCell>
              <RightCell>
                <Input type="text" maxLength={100} />
              </RightCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>태그 분류</Label>
              </LeftCell>
              <RightCell>
                <TagInputs />
              </RightCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>에러 상황</Label>
              </LeftCell>
              <RightCell>
                <Input type="text" maxLength={100} />
              </RightCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>에러 원인</Label>
              </LeftCell>
              <RightCell>
                <Input type="text" maxLength={100} />
              </RightCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>해결 과정</Label>
              </LeftCell>
              <RightCell>
                <Input type="text" maxLength={100} />
              </RightCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>결과</Label>
              </LeftCell>
              <RightCell>
                <Input type="text" maxLength={100} />
              </RightCell>
            </TableRow>
          </tbody>
        </Table>
        <CheckBoxArea>
          <InputGroup
            className="mb-3"
            style={{ display: "flex", justifyContent: "center" }}>
            <InputGroup.Checkbox aria-label="Checkbox for error state" />
            <InputGroup.Text>에러 기록을 공개합니다.</InputGroup.Text>
          </InputGroup>
        </CheckBoxArea>
        <ButtonCenter>
          <Button
            variant="primary"
            size="lg"
            style={{ marginRight: "1em" }}
            type="submit">
            게시글 등록
          </Button>
          <Button variant="outline-primary" size="lg">
            작성 취소
          </Button>
        </ButtonCenter>
      </PageWrapper>
    </MainContainer>
  );
}
