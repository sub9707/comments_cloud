import { useParams } from "react-router-dom";
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

export default function UserProfile() {
  const { userId } = useParams();

  return (
    <MainContainer>
      <PageHeader>프로필</PageHeader>
      <ProfileBox>
        <ProfileLeft>
          <ProfileInfo />
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
