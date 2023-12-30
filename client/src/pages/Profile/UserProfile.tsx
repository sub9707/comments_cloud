import { useNavigate, useParams } from "react-router-dom";
import {
  MainContainer,
  ProfileBox,
  ProfileLeft,
  ProfileRight,
} from "@styles/PageContainer";
import { HeaderFourth, PageHeader } from "@styles/TextStyle";
import ProfileInfo from "@components/UserProfile/ProfileInfo";
import ActivityGraph from "@components/UserProfile/ActivityGraph";
import RecentErrors from "../myError/RecentErrors";
import {
  JustifyBetween,
  JustifyCenter,
  JustifyEnd,
} from "@styles/FlexBoxStlye";
import { Button, Form } from "react-bootstrap";
import { userStateType } from "@/store/Utils/User";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLikedListPublic,
  checkLikedListPublic,
  userFindById,
} from "@api/user";
import { useEffect, useRef, useState } from "react";
import LikedErrors from "../myError/LikedErrors";
import LikedNoteList from "@components/UserProfile/LikedNoteList";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  clearLikedList,
  fetchLikedList,
} from "@/store/DataThunk/LikedListSlice";
import { RootState } from "@/store";
import { setOffset } from "@/store/Utils/Pagination";
import { addMessage } from "@/store/Utils/Alert";
import styled from "styled-components";

export default function UserProfile() {
  const { userId } = useParams();
  const user = useSelector((state: userStateType) => state.user.data);
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMoreData, setHasMoreData] = useState<boolean>(false);
  const [isPublicList, setIsPublicList] = useState<boolean>(false);
  const offset = useSelector((state: RootState) => state.pagination.offset);
  const totalCount = useSelector(
    (state: RootState) => state.LikedBoardListSlice.total_count
  );
  const navigate = useNavigate();

  const userFind = async () => {
    try {
      const result = await userFindById(userId || "");
      const data = result[0];
      if (!data) {
        alert("존재하지 않는 사용자입니다.");
        navigate(-1);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clickFetchHandler = async () => {
    setHasMoreData(totalCount > offset);
    if (!userId || !hasMoreData) return;
    await dispatch(fetchLikedList({ userId: +userId, offset }));
    dispatch(setOffset(offset + 10));
  };

  const checkListPublic = async () => {
    if (!userId) return;
    const result = await checkLikedListPublic(userId || "");
    setIsPublicList(result?.liked_list_public === 1 ? true : false);
    if (result?.liked_list_public) {
      try {
        await dispatch(fetchLikedList({ userId: +userId, offset }));
        await dispatch(setOffset(offset + 10));
      } catch (error) {
        console.error(error);
      } finally {
        setHasMoreData(totalCount > offset);
      }
    }
  };

  const handleTogglePublic = async () => {
    try {
      await changeLikedListPublic(userId || "");
      setIsPublicList(!isPublicList);
      dispatch(
        addMessage({
          id: "unique_id",
          text: `공개 설정이 변경되었습니다.`,
          type: "success",
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userFind();
    checkListPublic();
    return () => {
      dispatch(setOffset(0));
      dispatch(clearLikedList());
    };
  }, []);

  return (
    <MainContainer>
      <JustifyBetween>
        <PageHeader>유저 프로필</PageHeader>
        {user?.id === parseInt(userId || "") && (
          <ProfileEditBox>
            <p
              className="text-underline-hover"
              onClick={() => navigate(`/passwordConfirm`)}>
              비밀번호 변경
            </p>
            <Button
              style={{ height: "2.5em", marginTop: "2em" }}
              variant="outline-primary"
              onClick={() => navigate(`/user/edit/${userId}`)}>
              프로필 수정
            </Button>
          </ProfileEditBox>
        )}
      </JustifyBetween>
      <ProfileBox>
        <ProfileLeft>
          <ProfileInfo userId={userId || ""} />
        </ProfileLeft>
        <ProfileRight ref={containerRef}>
          <HeaderFourth>노트 작성 추이</HeaderFourth>
          <ActivityGraph userId={userId || ""} />
          <br />
          <HeaderFourth>최근 작성 노트</HeaderFourth>
          <RecentErrors />
          <br />
          <HeaderFourth>인기 작성 노트</HeaderFourth>
          <LikedErrors />
          <br />
          <JustifyBetween>
            <HeaderFourth>좋아요 누른 노트</HeaderFourth>
            {+(userId || "") === user?.id ? (
              <Form.Check
                type="switch"
                label="공개 설정"
                onClick={handleTogglePublic}
                checked={isPublicList}
              />
            ) : null}
          </JustifyBetween>
          <br />
          {isPublicList ? (
            <>
              <LikedNoteList />
              {hasMoreData ? (
                <JustifyEnd
                  className="text-underline-hover"
                  onClick={clickFetchHandler}>
                  노트 더보기
                </JustifyEnd>
              ) : null}
            </>
          ) : (
            <JustifyCenter>리스트가 비공개로 설정되었습니다.</JustifyCenter>
          )}
          <br />
        </ProfileRight>
      </ProfileBox>
    </MainContainer>
  );
}

const ProfileEditBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  p {
    margin: 0;
    margin-top: 2em;
    opacity: 0.7;
  }
`;
