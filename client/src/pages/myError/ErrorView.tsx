import { useParams } from "react-router-dom";
import { MainContainer } from "../../styles/PageContainer";
import { useEffect } from "react";
import { getBoardError } from "../../api/ErrorBoard";
import { useDispatch } from "react-redux";
import { setMyErrorData } from "../../store/Modal/MyErrorModal";
import {
  CommentArea,
  ContentInfoWrapper,
} from "../../styles/ModalStyle/ErrorModalView";
import ContentControl from "../../components/MyError/ContentControl";
import { DottedDivision } from "../../styles/UtilityElements";
import ContentsArea from "../../components/MyError/ContentsArea";
import ErrorBoardTitle from "../../components/MyError/ErrorBoardTitle";
import WriteCommentArea from "../../components/MyError/WriteCommentArea";
import CommentCard from "../../components/Cards/CommentCard";

function ErrorView() {
  const { boardId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (boardId) {
          const result = await getBoardError(+boardId);
          dispatch(setMyErrorData(result));
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    })();
  }, []);

  return (
    <MainContainer>
      <br />
      {/*본문 타이틀 영역*/}
      <ErrorBoardTitle />
      {/*본문 Info 영역*/}
      <ContentInfoWrapper>
        <ContentControl />
      </ContentInfoWrapper>
      <DottedDivision />
      {/*본문 HTML 컨텐츠 영역*/}
      <ContentsArea />
      <br />
      {/*댓글 영역*/}
      <DottedDivision />
      <br />
      {/*댓글 추가 영역*/}
      <WriteCommentArea />
      <br />
      {/*댓글 목록*/}
      <CommentArea>
        <CommentCard />
      </CommentArea>
      <br />
    </MainContainer>
  );
}

export default ErrorView;
