import { useNavigate, useParams } from "react-router-dom";
import {
  InfoText,
  MainContainer,
  ProfileBox,
  ProfileChangeButton,
  ProfileCircle,
  ProfileImgArea,
  ProfileLeft,
  ProfileRight,
} from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { userStateType } from "../../store/Utils/User";
import { useEffect } from "react";

export default function UserProfileFix() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: userStateType) => state.user.data);

  useEffect(() => {
    if (parseInt(userId || "") !== user?.id) {
      navigate(`/user/edit/${user?.id}`);
    }
  }, []);

  return (
    <MainContainer>
      <PageHeader>프로필 수정</PageHeader>
      <ProfileBox>
        <ProfileLeft>
          <ProfileImgArea>
            <ProfileCircle
              src={`/images/Default_ProfileImg.png`}
              alt="프로필 이미지"
            />
            <ProfileChangeButton htmlFor="file">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "white" }}
                size="2x"
              />
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
              />
            </ProfileChangeButton>
          </ProfileImgArea>
        </ProfileLeft>
        <ProfileRight>{userId}</ProfileRight>
      </ProfileBox>
    </MainContainer>
  );
}
