import { useNavigate, useParams } from "react-router-dom";
import { MainContainer } from "../../styles/PageContainer";
import { useEffect } from "react";
import { getBoardError } from "../../api/ErrorBoard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMyErrorData,
  setMyErrorData,
} from "../../store/Modal/MyErrorModal";
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
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import LikeButton from "../../components/MyError/LikeButton";
import { RootState } from "../../store";

function ErrorView() {
  const { boardId } = useParams();
  const dataState = useSelector((state: RootState) => state.myError);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      if (boardId) {
        const result = await getBoardError(+boardId);
        if (result) dispatch(setMyErrorData(result));
        else {
          alert("존재하지 않는 게시글입니다.");
          navigate(-1);
        }
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    if (!dataState) return;
    if (
      !dataState.data?.publicCheck &&
      user.data.id !== dataState.data?.writer_id
    ) {
      alert("허가되지 않은 접근입니다.");
      navigate(-1);
      dispatch(clearMyErrorData());
      return;
    }
  }, []);

  useEffect(() => {
    fetchData();
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
      <JustifyCenter>
        <LikeButton />
      </JustifyCenter>
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
