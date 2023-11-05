import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Stack,
} from "react-bootstrap";
import {
  ButtonCenter,
  CheckBoxArea,
  ContentCell,
  Input,
  Label,
  LeftCell,
  PageWrapper,
  RightCell,
  Table,
  TableRow,
  modules,
} from "../../styles/AdminPageStyle";
import { MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import TagInputs from "../../components/Table/TagInputs";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import { ErrorWriteFormValues } from "../../types/react-hook-form";
import { SolvedArea } from "../../styles/TableStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import PopoverCard from "../../components/Cards/PopoverCard";
import { useState } from "react";
import { writeError } from "../../api/ErrorBoard";
import { openModal } from "../../store/Modal";
import { useDispatch } from "react-redux";

export default function ErrorWrite() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const { register, handleSubmit, setValue, trigger } =
    useForm<ErrorWriteFormValues>({
      mode: "onChange",
    });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const submitHandler = async (data) => {
    // 글 작성
    try {
      setIsLoading(true);
      const result = await writeError({ ...data, tags, writer_id: 1 });
      console.log("게시글 등록 완료: ", result);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const dispatch = useDispatch();
  const handleWriteCancel = () => {
    dispatch(
      openModal({
        modalType: "WriteModal",
        locate: "/myError",
        isOpen: true,
      })
    );
  };
  const handleStateChange = (value: string) => {
    setValue("error_state", value === "<p><br></p>" ? "" : value);
    trigger("error_state");
  };
  const handleCauseChange = (value: string) => {
    setValue("error_cause", value === "<p><br></p>" ? "" : value);
    trigger("error_cause");
  };
  const handleProcessChange = (value: string) => {
    setValue("error_process", value === "<p><br></p>" ? "" : value);
    trigger("error_process");
  };
  const handleResultChange = (value: string) => {
    setValue("error_result", value === "<p><br></p>" ? "" : value);
    trigger("error_result");
  };

  return (
    <MainContainer>
      <PageHeader>나의 에러 기록</PageHeader>
      <PageWrapper>
        <Table>
          <tbody>
            <TableRow>
              <LeftCell>
                <Label>에러명 (에러코드)</Label>
              </LeftCell>
              <RightCell>
                <Stack direction="horizontal" gap={2}>
                  <Input
                    type="text"
                    maxLength={100}
                    {...register("title", { required: true })}
                  />
                  <SolvedArea>
                    <Form.Check
                      type="checkbox"
                      label="해결 여부"
                      {...register("error_solved")}
                    />
                    <OverlayTrigger
                      trigger="hover"
                      overlay={PopoverCard(
                        "작성한 에러가 해결된 에러인지 체크"
                      )}
                      placement="right">
                      <FontAwesomeIcon
                        icon={faCircleQuestion}
                        style={{ marginLeft: "1em" }}
                      />
                    </OverlayTrigger>
                  </SolvedArea>
                </Stack>
              </RightCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>태그 분류</Label>
              </LeftCell>
              <RightCell>
                <TagInputs tags={tags} setTags={setTags} />
              </RightCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>에러 상황</Label>
              </LeftCell>
              <ContentCell>
                <ReactQuill
                  style={{ width: "100%", height: "20vh" }}
                  modules={modules}
                  onChange={handleStateChange}
                />
              </ContentCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>에러 원인</Label>
              </LeftCell>
              <ContentCell>
                <ReactQuill
                  style={{ width: "100%", height: "20vh" }}
                  modules={modules}
                  onChange={handleCauseChange}
                />
              </ContentCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>해결 과정</Label>
              </LeftCell>
              <ContentCell>
                <ReactQuill
                  style={{ width: "100%", height: "20vh" }}
                  modules={modules}
                  onChange={handleProcessChange}
                />
              </ContentCell>
            </TableRow>
            <TableRow>
              <LeftCell>
                <Label>결과</Label>
              </LeftCell>
              <ContentCell>
                <ReactQuill
                  style={{ width: "100%", height: "20vh" }}
                  modules={modules}
                  onChange={handleResultChange}
                />
              </ContentCell>
            </TableRow>
          </tbody>
        </Table>
        <CheckBoxArea>
          <InputGroup style={{ display: "flex", justifyContent: "center" }}>
            <InputGroup.Text>
              {" "}
              <input
                type="checkbox"
                {...register("publicCheck")}
                style={{ marginRight: "1em" }}
              />
              에러 기록을 공개합니다.
            </InputGroup.Text>
          </InputGroup>
        </CheckBoxArea>
        <ButtonCenter>
          <Button
            variant="primary"
            size="lg"
            style={{ marginRight: "1em" }}
            type="submit"
            onClick={handleSubmit(submitHandler)}
            disabled={isLoading}>
            {isLoading ? "등록 중" : "게시글 등록"}
          </Button>
          <Button
            variant="outline-primary"
            size="lg"
            onClick={handleWriteCancel}>
            작성 취소
          </Button>
        </ButtonCenter>
      </PageWrapper>
    </MainContainer>
  );
}
