import { checkPassword } from "@api/user";
import { setPasswordChecked } from "@/store/Utils/PasswordSet";
import { JustifyCenter } from "@styles/FlexBoxStlye";
import { MainContainer } from "@styles/PageContainer";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, ButtonGroup, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RootState } from "@store/index";

function PasswordConfirm() {
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const userPersist = localStorage.getItem("persist:root");
  const parsedUserPersist = JSON.parse(userPersist || "");
  const userData = JSON.parse(parsedUserPersist.user);
  const userId = userData.data.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmClick = async () => {
    try {
      const result = await checkPassword(userId, password);
      setIsValid(!result);
      if (result) {
        dispatch(setPasswordChecked(true));
        navigate(`/passwordChange`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {};

  return (
    <MainContainer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}>
      <PWHeader>비밀번호 변경을 위해 현재 비밀번호를 입력해주세요</PWHeader>
      <PWForm>
        <InputGroup hasValidation>
          <InputGroup.Text>비밀번호</InputGroup.Text>
          <Form.Control
            type="password"
            required
            isInvalid={isValid}
            value={password}
            onChange={handlePasswordChange}
          />
          <Form.Control.Feedback type="invalid">
            비밀번호가 일치하지 않습니다.
          </Form.Control.Feedback>
        </InputGroup>
        <JustifyCenter>
          <ButtonGroup style={{ marginTop: "3em" }}>
            <Button
              variant="primary"
              style={{ width: "5em" }}
              onClick={handleConfirmClick}>
              확인
            </Button>
            <Button
              variant="outline-primary"
              style={{ width: "5em" }}
              onClick={handleCancelClick}>
              취소
            </Button>
          </ButtonGroup>
        </JustifyCenter>
      </PWForm>
    </MainContainer>
  );
}

export default PasswordConfirm;
// eslint-disable-next-line react-refresh/only-export-components
export const PWHeader = styled.h4`
  font-family: "LotteMartHappy";
`;
// eslint-disable-next-line react-refresh/only-export-components
export const PWForm = styled.form`
  margin-top: 5em;
  width: 40%;
`;
