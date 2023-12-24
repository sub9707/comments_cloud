import {
  ButtonCenter,
  ContentCell,
  Input,
  Label,
  LeftCell,
  PageBox,
  PageHeader,
  PageWrapper,
  RightCell,
  Table,
  TableRow,
  modules,
} from "../../styles/AdminPageStyle";
import ReactQuill from "react-quill";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/Modal/Modal";
import { useForm } from "react-hook-form";
import { NoticeWriteValues } from "../../types/react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { writeNotice } from "../../api/notice";

export default function AdminNoticeWrite() {
  const navigate = useNavigate();
  // use-hook-form Data 변수
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [multipleImages, setMultipleImages] = useState<string[]>([]);
  const { register, handleSubmit, setValue, watch } =
    useForm<NoticeWriteValues>();
  const editorContent = watch("content");
  const onEditorStateChange = (editorState: string) => {
    setValue("content", editorState);
  };
  const changeMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setMultipleImages((prevImages) => prevImages.concat(imageArray));
    }
  };

  const onSubmit = async (data: NoticeWriteValues) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      if (data.files && data.files.length > 0) {
        Array.from(data.files).forEach((file, index) => {
          formData.append(`file`, file);
        });
      }
      formData.append("title", data.title);
      formData.append("content", data.content);

      await writeNotice(formData);
      setIsLoading(false);
      alert("공지가 등록되었습니다.");
      navigate("/admin/notice");
    } catch (error) {
      console.error("공지 등록 실패:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    register("content", { required: false });
  }, [register]);

  // modal 관련 변수
  const dispatch = useDispatch();
  const handleWriteCancel = () => {
    dispatch(
      openModal({
        modalType: "WriteModal",
        locate: "/admin/notice",
        isOpen: true,
      })
    );
  };

  return (
    <PageBox>
      <PageHeader>공지사항 작성</PageHeader>
      <PageWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <tbody>
              <TableRow>
                <LeftCell>
                  <Label>공지 제목</Label>
                </LeftCell>
                <RightCell>
                  <Input
                    type="text"
                    maxLength={100}
                    {...register("title", { required: true })}
                  />
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
                    value={editorContent}
                    onChange={onEditorStateChange}
                  />
                </ContentCell>
              </TableRow>
              <TableRow>
                <LeftCell>
                  <Label>첨부파일</Label>
                </LeftCell>
                <RightCell>
                  <Input
                    style={{ border: "none" }}
                    type="file"
                    multiple
                    {...register("files")}
                    onChange={changeMultipleFiles}
                  />
                </RightCell>
              </TableRow>
            </tbody>
          </Table>
          <ButtonCenter>
            <Button
              variant="primary"
              size="lg"
              style={{ marginRight: "1em" }}
              type="submit"
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
        </form>
      </PageWrapper>
    </PageBox>
  );
}
