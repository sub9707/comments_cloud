import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  ContentViewArea,
  SubTitleHeader,
} from "../../styles/ModalStyle/ErrorModalView";
import DOMPurify from "dompurify";

function ContentsArea() {
  const { data } = useSelector((state: RootState) => state.myError);
  const sections = [
    { title: "에러 상황", content: data?.error_state },
    { title: "에러 원인", content: data?.error_cause },
    { title: "해결 과정", content: data?.error_process },
    { title: "결과", content: data?.error_result },
  ];
  return (
    <>
      {sections.map((section, index) => (
        <div key={index}>
          <SubTitleHeader>{section.title}</SubTitleHeader>
          <ContentViewArea
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(section.content || ""),
            }}
          />
        </div>
      ))}
    </>
  );
}

export default ContentsArea;
