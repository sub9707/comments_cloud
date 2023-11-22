import { useNavigate, useParams } from "react-router-dom";
import {
  MainContainer,
  ProfileBox,
  ProfileLeft,
  ProfileRight,
} from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";

import ProfileInfo from "../../components/UserProfile/ProfileInfo";
import ActivityGraph from "../../components/UserProfile/ActivityGraph";
import RecentErrors from "../myError/RecentErrors";
import { JustifyBetween } from "../../styles/FlexBoxStlye";
import { Button } from "react-bootstrap";
import { userStateType } from "../../store/Utils/User";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const { userId } = useParams();
  const user = useSelector((state: userStateType) => state.user.data);
  const naviagte = useNavigate();

  return (
    <MainContainer>
      <JustifyBetween>
        <PageHeader>프로필 [userID: #{userId}]</PageHeader>
        {user?.id === parseInt(userId || "") && (
          <Button
            style={{ height: "2.5em", marginTop: "2em" }}
            variant="outline-primary"
            onClick={() => naviagte(`/user/edit/${userId}`)}>
            프로필 수정
          </Button>
        )}
      </JustifyBetween>
      <ProfileBox>
        <ProfileLeft>
          <ProfileInfo userId={userId || ""} />
        </ProfileLeft>
        <ProfileRight>
          <h4>노트 작성 추이</h4>
          <ActivityGraph />
          <br />
          <h4>최근 작성 노트</h4>
          <RecentErrors />
          <br />
          <h4>인기 작성 노트</h4>
          <RecentErrors />
        </ProfileRight>
      </ProfileBox>
    </MainContainer>
  );
}
