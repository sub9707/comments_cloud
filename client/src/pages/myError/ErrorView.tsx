import { useNavigate, useParams } from "react-router-dom";
import { MainContainer } from "../../styles/PageContainer";
import { useEffect } from "react";
import { getBoardError } from "../../api/ErrorBoard";
import { useDispatch, useSelector } from "react-redux";
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
import { JustifyCenter, JustifyStart } from "../../styles/FlexBoxStlye";
import LikeButton from "../../components/MyError/LikeButton";
import TagsArea from "../../components/MyError/TagsArea";
import { RootState } from "../../store";

function ErrorView() {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.data);

  const fetchData = async () => {
    try {
      if (boardId) {
        const result = await getBoardError(+boardId);
        const isPublic: boolean = result?.publicCheck;
        console.log("공개? :" + isPublic);
        const writer: number = result?.writer_id;
        if (!isPublic && writer !== user?.id) {
          alert("접근 권한이 없습니다.");
          navigate(-1);
          return;
        }
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
    if (boardId) fetchData();
  }, [boardId]);

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
      <JustifyStart>
        <TagsArea />
      </JustifyStart>
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
