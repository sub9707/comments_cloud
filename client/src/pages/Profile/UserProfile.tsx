import { useNavigate, useParams } from "react-router-dom";
import {
  MainContainer,
  ProfileBox,
  ProfileLeft,
  ProfileRight,
} from "../../styles/PageContainer";
import { HeaderFourth, PageHeader } from "../../styles/TextStyle";

import ProfileInfo from "../../components/UserProfile/ProfileInfo";
import ActivityGraph from "../../components/UserProfile/ActivityGraph";
import RecentErrors from "../myError/RecentErrors";
import { JustifyBetween } from "../../styles/FlexBoxStlye";
import { Button } from "react-bootstrap";
import { userStateType } from "../../store/Utils/User";
import { useSelector } from "react-redux";
import { userFindById } from "../../api/user";
import { useEffect } from "react";
import LikedErrors from "../myError/LikedErrors";

export default function UserProfile() {
  const { userId } = useParams();
  const user = useSelector((state: userStateType) => state.user.data);

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

  useEffect(() => {
    userFind();
  }, []);

  return (
    <MainContainer>
      <JustifyBetween>
        <PageHeader>유저 프로필</PageHeader>
        {user?.id === parseInt(userId || "") && (
          <Button
            style={{ height: "2.5em", marginTop: "2em" }}
            variant="outline-primary"
            onClick={() => navigate(`/user/edit/${userId}`)}>
            프로필 수정
          </Button>
        )}
      </JustifyBetween>
      <ProfileBox>
        <ProfileLeft>
          <ProfileInfo userId={userId || ""} />
        </ProfileLeft>
        <ProfileRight>
          <HeaderFourth>노트 작성 추이</HeaderFourth>
          <ActivityGraph userId={userId || ""} />
          <br />
          <HeaderFourth>최근 작성 노트</HeaderFourth>
          <RecentErrors />
          <br />
          <HeaderFourth>인기 작성 노트</HeaderFourth>
          <LikedErrors />
        </ProfileRight>
      </ProfileBox>
    </MainContainer>
  );
}
