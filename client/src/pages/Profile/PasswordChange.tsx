import { setPasswordChecked } from "@/store/Utils/PasswordSet";
import { RootState } from "@store/index";
import { MainContainer } from "@styles/PageContainer";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PWForm, PWHeader } from "./PasswordConfirm";
import { Button, ButtonGroup, Form, InputGroup } from "react-bootstrap";
import { JustifyCenter } from "@styles/FlexBoxStlye";
import { validatePassword } from "@utils/Calculation";
import { passwordChange } from "@api/user";
import { addMessage } from "@store/Utils/Alert";

export default function PasswordChange() {
  const authenticated = useSelector(
    (state: RootState) => state.PasswordCheckedSlice.Authenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordNotSame, setPasswordNotSame] = useState<boolean>(false);
  const [isInValid, setIsInValid] = useState<boolean>(false);
  const userPersist = localStorage.getItem("persist:root");
  const parsedUserPersist = JSON.parse(userPersist || "");
  const userData = JSON.parse(parsedUserPersist.user);
  const userId = userData.data.id;

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const handleConfirmClick = async () => {
    if (password !== passwordConfirm) {
      setPasswordNotSame(true);
      return;
    }
    const result = validatePassword(password);
    if (result) {
      try {
        await passwordChange(userId, password);
      } catch (error) {
        console.error(error);
      } finally {
        navigate(`/user/${userId}`);
        dispatch(
          addMessage({
            id: "unique_id",
            text: `비밀번호가 변경되었습니다.`,
            type: "success",
          })
        );
      }
    } else {
      setIsInValid(true);
    }
  };

  useEffect(() => {
    if (!authenticated) {
      navigate(`/passwordConfirm`);
    }
    return () => {
      dispatch(setPasswordChecked(false));
    };
  }, []);

  return (
    <MainContainer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}>
      <PWHeader>변경할 비밀번호를 입력해주세요.</PWHeader>
      <PWForm>
        <InputGroup hasValidation>
          <InputGroup.Text>비밀번호</InputGroup.Text>
          <Form.Control
            type="password"
            required
            isInvalid={isInValid}
            value={password}
            onChange={handlePasswordChange}
          />
          <Form.Control.Feedback type="invalid">
            영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상
          </Form.Control.Feedback>
        </InputGroup>
        <br />
        <InputGroup hasValidation>
          <InputGroup.Text>비밀번호 확인</InputGroup.Text>
          <Form.Control
            type="password"
            required
            isInvalid={passwordNotSame}
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          <Form.Control.Feedback type="invalid">
            동일한 비밀번호를 입력해주세요.
          </Form.Control.Feedback>
        </InputGroup>
        <JustifyCenter>
          <ButtonGroup style={{ marginTop: "3em" }}>
            <Button
              variant="primary"
              style={{ width: "5em" }}
              onClick={handleConfirmClick}>
              변경
            </Button>
            <Button variant="outline-primary" style={{ width: "5em" }}>
              취소
            </Button>
          </ButtonGroup>
        </JustifyCenter>
      </PWForm>
    </MainContainer>
  );
}
