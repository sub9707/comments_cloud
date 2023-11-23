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
import { faHome, faWrench } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { userStateType } from "../../store/Utils/User";
import { useEffect, useMemo, useState } from "react";
import { getUserInfo, updateUserInfo } from "../../api/user";
import styled from "styled-components";
import { Button, Form, InputGroup } from "react-bootstrap";
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import { UserInfoType } from "../../types/users";
import { useForm } from "react-hook-form";
import { UpdateFormValue } from "../../types/react-hook-form";
import { isInSevenDays } from "../../utils/Calculation";
import Lottie from "lottie-react";
import checkLottie from "../../utils/lotties/check.json";
import { DevTool } from "@hookform/devtools";
import { ErrorPrint } from "../../styles/LoginStyle";
import { addMessage } from "../../store/Utils/Alert";

export default function UserProfileFix() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: userStateType) => state.user.data);
  const [userData, setUserData] = useState<UserInfoType>();
  const [nicknameValid, setNicknameValid] = useState<boolean>(false);
  const [nicknameChange, setNicknameChange] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdateFormValue>({
    defaultValues: useMemo(
      () => ({
        name: userData?.name,
        nickname: userData?.nickname,
        homepage: userData?.homepage,
        profile_message: userData?.profile_message,
      }),
      [userData]
    ),
  });
  const fetchUserData = async () => {
    try {
      const result = await getUserInfo(user?.id.toString());
      setUserData(result[0]);
      if (!result[0]?.nickname_change_date) setNicknameValid(true);
      else if (isInSevenDays(result[0].nickname_change_date)) {
        setNicknameValid(true);
      }
      setImagePreview(result[0].profileImg);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setValue("profile_Image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSumbitClick = async (data: any) => {
    try {
      const response = await updateUserInfo(data?.id, data?.profile_Image, {
        name: data?.name,
        nickname: data?.nickname,
        profile_message: data?.profile_message,
        homepage: data?.homepage,
        curImageUrl: userData?.profileImg || "",
      });
      console.log("result: ", response);
    } catch (error) {
      console.error(error);
    } finally {
      navigate(`/user/${data?.id}`);
      dispatch(
        addMessage({
          id: "unique_id",
          text: "프로필이 수정되었습니다",
          type: "success",
        })
      );
    }
  };

  const handleNicknameChange = () => {
    event?.preventDefault();
    if (nicknameChange === false) {
      setNicknameChange(true);
    }
  };
  useEffect(() => {
    if (parseInt(userId || "") !== user?.id) {
      navigate(`/user/edit/${user?.id}`);
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    reset(userData);
  }, [reset, userData]);

  return (
    <MainContainer>
      <PageHeader>프로필 수정</PageHeader>
      <ProfileBox>
        <ProfileEditForm onSubmit={handleSubmit(handleSumbitClick)}>
          <ProfileImgArea>
            <ProfileCircle src={imagePreview} alt="프로필 이미지" />
            <ProfileChangeButton htmlFor="file">
              <FontAwesomeIcon
                icon={faWrench}
                style={{ color: "white", cursor: "pointer" }}
                size="2x"
              />
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                {...register("profile_Image", { onChange: handleFileChange })}
              />
            </ProfileChangeButton>
          </ProfileImgArea>
          <ProfileInfoForm>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
              <Form.Control
                disabled
                value={userData?.email || ""}
                style={{ backgroundColor: "#d1d1d1" }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">이름</InputGroup.Text>
              <Form.Control
                type="text"
                {...register("name", {
                  required: "이름을 입력하세요",
                })}
              />
            </InputGroup>
            <ErrorPrint>{errors.name?.message}</ErrorPrint>
            <InputGroup className="mb-3 position-relative">
              <InputGroup.Text id="basic-addon3">닉네임</InputGroup.Text>
              <Form.Control
                disabled={!nicknameValid || nicknameChange}
                style={{
                  backgroundColor: nicknameValid ? "white" : "#d1d1d1",
                }}
                {...register("nickname")}
              />
              <ChangeButton
                disabled={!nicknameValid}
                onClick={() => handleNicknameChange()}>
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
              <Form.Control {...register("homepage")} />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>프로필 메시지</InputGroup.Text>
              <Form.Control
                style={{ minHeight: "10em" }}
                as="textarea"
                aria-label="With textarea"
                {...register("profile_message")}
              />
            </InputGroup>
          </ProfileInfoForm>
          <br />
          <JustifyCenter style={{ gap: "1em" }}>
            <Button disabled={!isDirty} type="submit">
              수정내용 변경
            </Button>
            <Button variant="outline-primary" onClick={() => navigate(-1)}>
              취소하기
            </Button>
          </JustifyCenter>
        </ProfileEditForm>
        <DevTool control={control} />
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
