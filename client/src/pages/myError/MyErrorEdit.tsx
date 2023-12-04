import { useEffect, useState } from "react";
import { MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Stack,
} from "react-bootstrap";
import { SolvedArea } from "../../styles/TableStyle";
import PopoverCard from "../../components/Cards/PopoverCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { ErrorWriteFormValues } from "../../types/react-hook-form";
import TagInputs from "../../components/Table/TagInputs";
import ReactQuill from "react-quill";
import { DevTool } from "@hookform/devtools";
import { editError, getBoardError } from "../../api/ErrorBoard";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/Utils/Alert";
import { userStateType } from "../../store/Utils/User";

function MyErrorSearch() {
  const user = useSelector((state: userStateType) => state.user.data);
  const { boardId } = useParams();
  const [tags, setTags] = useState<string[]>([]);
  const [prevData, setPrevData] = useState<ErrorWriteFormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    watch,
    // formState: { errors, isDirty, isValid },
  } = useForm<ErrorWriteFormValues>();

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

  const submitHandler = async (data: any) => {
    // 글 작성
    try {
      console.table(data);
      setIsLoading(true);
      await editError({ ...data, tags, boardId });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(
        addMessage({
          id: "unique_id",
          text: `게시글이 수정되었습니다.`,
          type: "success",
        })
      );
      navigate("/myError");
    }
  };

  const handleWriteCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    (async () => {
      try {
        if (boardId) {
          const errorData = await getBoardError(+boardId);
          setPrevData(errorData);
        }
      } catch (error) {
        console.error("기존 데이터 fetch Error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (prevData) {
      setValue("title", prevData.title);
      setValue("tags", prevData.tags);
      setValue("error_solved", prevData.error_solved);
      setValue("error_state", prevData.error_state);
      setValue("error_cause", prevData.error_cause);
      setValue("error_process", prevData.error_process);
      setValue("error_result", prevData.error_result);
      setValue("publicCheck", prevData.publicCheck);
      setTags(JSON.parse(prevData.tags.toString()));
    }
  }, [prevData, setValue]);

  useEffect(() => {
    if (!user || !prevData) return;
    if (prevData.writer_id !== user?.id) {
      alert("게시글 수정 권한이 없습니다.");
      navigate(-1);
    }
  }, [user, prevData, navigate]);

  return (
    <MainContainer>
      <PageHeader>에러 수정 #{boardId}</PageHeader>
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
                    maxLength={200}
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
                      overlay={PopoverCard({
                        headerText: "정보",
                        bodyText: "작성한 에러가 해결된 에러인지 체크",
                      })}
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
                  value={watch("error_state")}
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
                  value={watch("error_cause")}
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
                  value={watch("error_process")}
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
                  value={watch("error_result")}
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
        <DevTool control={control} />
      </PageWrapper>
    </MainContainer>
  );
}

export default MyErrorSearch;
