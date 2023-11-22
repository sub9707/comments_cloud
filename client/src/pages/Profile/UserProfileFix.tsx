import { useNavigate, useParams } from "react-router-dom";
import {
  MainContainer,
  ProfileBox,
  ProfileChangeButton,
  ProfileCircle,
  ProfileImgArea,
  ProfileInfoForm,
  ProfileLeft,
  ProfileRight,
} from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { userStateType } from "../../store/Utils/User";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../api/user";
import styled from "styled-components";
import { Button, Form, InputGroup } from "react-bootstrap";
import { JustifyCenter } from "../../styles/FlexBoxStlye";

export default function UserProfileFix() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: userStateType) => state.user.data);
  const [profileImgURL, setProfileURL] = useState<string>(
    `/images/Default_ProfileImg.png`
  );

  const fetchUserData = async () => {
    try {
      const result = await getUserInfo(user?.id.toString());
      console.log(result[0]);
      if (result[0].profileImg !== null) setProfileURL(result[0].profileImg);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (parseInt(userId || "") !== user?.id) {
      navigate(`/user/edit/${user?.id}`);
    }
    fetchUserData();
  }, []);

  return (
    <MainContainer>
      <PageHeader>프로필 수정</PageHeader>
      <ProfileBox>
        <ProfileEditForm>
          <ProfileImgArea>
            <ProfileCircle src={profileImgURL} alt="프로필 이미지" />
            <ProfileChangeButton htmlFor="file">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "white", cursor: "pointer" }}
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
          <ProfileInfoForm>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
              <Form.Control
                disabled
                aria-label="Email"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#d1d1d1" }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">이름</InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup className="mb-3 position-relative">
              <InputGroup.Text id="basic-addon3">닉네임</InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon3"
                disabled
                style={{ backgroundColor: "#d1d1d1" }}
              />
              <FontAwesomeIcon
                icon={faCheck}
                size="xl"
                style={{
                  position: "absolute",
                  right: "0.5em",
                  top: "0.3em",
                  color: "green",
                }}
              />
            </InputGroup>
            <p>닉네임은 7일 주기로 변경이 가능합니다.</p>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">
                <FontAwesomeIcon icon={faHome} />
              </InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>프로필 메시지</InputGroup.Text>
              <Form.Control
                style={{ minHeight: "10em" }}
                as="textarea"
                aria-label="With textarea"
              />
            </InputGroup>
          </ProfileInfoForm>
          <br />
          <JustifyCenter style={{ gap: "1em" }}>
            <Button>수정내용 변경</Button>
            <Button variant="outline-primary">취소하기</Button>
          </JustifyCenter>
        </ProfileEditForm>
      </ProfileBox>
    </MainContainer>
  );
}

const ProfileEditForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
