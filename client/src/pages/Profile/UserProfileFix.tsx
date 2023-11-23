import { useNavigate, useParams } from "react-router-dom";
import {
  MainContainer,
  ProfileBox,
  ProfileChangeButton,
  ProfileCircle,
  ProfileImgArea,
  ProfileInfoForm,
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
import { UserInfoType } from "../../types/users";
import { useForm } from "react-hook-form";
import { UpdateFormValue } from "../../types/react-hook-form";
import { isInSevenDays } from "../../utils/Calculation";
import Lottie from "lottie-react";
import checkLottie from "../../utils/lotties/check.json";

export default function UserProfileFix() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: userStateType) => state.user.data);
  const [userData, setUserData] = useState<UserInfoType>();
  const [nicknameValid, setNicknameValid] = useState<boolean>(false);
  const [nicknameChange, setNicknameChange] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<UpdateFormValue>();

  const fetchUserData = async () => {
    try {
      const result = await getUserInfo(user?.id.toString());
      setUserData(result[0]);
      if (!result[0]?.nickname_change_date) setNicknameValid(true);
      else if (isInSevenDays(result[0].nickname_change_date)) {
        setNicknameValid(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSumbitClick = async (data: any) => {};

  const handleNicknameChange = () => {
    if (nicknameChange === false) setNicknameChange(true);
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
        <ProfileEditForm onSubmit={handleSubmit(handleSumbitClick)}>
          <ProfileImgArea>
            <ProfileCircle src={userData?.profileImg} alt="프로필 이미지" />
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
                // value={userData?.email || ""}
                aria-label="Email"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#d1d1d1" }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">이름</InputGroup.Text>
              <Form.Control
                // value={userData?.name || ""}
                aria-label="Username"
                aria-describedby="basic-addon2"
                {...register("name")}
              />
            </InputGroup>
            <InputGroup className="mb-3 position-relative">
              <InputGroup.Text id="basic-addon3">닉네임</InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon3"
                disabled={!nicknameValid}
                // value={userData?.nickname || ""}
                style={{ backgroundColor: nicknameValid ? "white" : "#d1d1d1" }}
                {...register("nickname")}
              />
              <ChangeButton
                disabled={!nicknameValid}
                onClick={handleNicknameChange}>
                {nicknameChange ? (
                  <Lottie
                    animationData={checkLottie}
                    loop={false}
                    style={{
                      position: "absolute",
                      bottom: "-0.4em",
                      width: "80%",
                    }}
                  />
                ) : (
                  "변경"
                )}
              </ChangeButton>
            </InputGroup>
            <p>
              닉네임은 <strong>7일 주기</strong>로 변경이 가능합니다.
            </p>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">
                <FontAwesomeIcon icon={faHome} />
              </InputGroup.Text>
              <Form.Control
                // value={userData?.homepage || "www.example.com"}
                aria-label="Username"
                aria-describedby="basic-addon2"
                {...register("homepage")}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>프로필 메시지</InputGroup.Text>
              <Form.Control
                style={{ minHeight: "10em" }}
                as="textarea"
                aria-label="With textarea"
                // value={userData?.profile_message || ""}
                {...register("profile_message")}
              />
            </InputGroup>
          </ProfileInfoForm>
          <br />
          <JustifyCenter style={{ gap: "1em" }}>
            <Button type="submit">수정내용 변경</Button>
            <Button variant="outline-primary" onClick={() => navigate(-1)}>
              취소하기
            </Button>
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

const ChangeButton = styled.button`
  width: 4em;
  height: 2.4em;
  position: absolute;
  right: -4.5em;
  border: 1px solid #d1d1d1;
  border-radius: 0 10px 10px 10px;
`;
