import { useState } from "react";
import {
  LoginPageContainer,
  PageActualWrapper,
  PageContainer,
} from "../PageContainer";
import {
  Fieldsets,
  Form,
  FormWrapper,
  FormsSection,
  FormsWrapper,
  Input,
  InputBlock,
  Label,
  Legend,
  LoginButton,
  SectionTitle,
  SignupButton,
  Switcher,
  Underline,
} from "./LoginStyle";
import registerUser, { loginUser } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRefreshToken } from "../../store/Cookie";
import { SET_TOKEN } from "../../store/Auth";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  LoginFormValues,
  RegisterFormValues,
} from "../../types/react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { register: registerReg, handleSubmit: handleSubmitReg } =
    useForm<RegisterFormValues>();
  // register Info
  const [activeForm, setActiveForm] = useState<string>("login");

  const onSubmitLogin: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      setIsLoading(true);
      const result = await loginUser(data.email, data.password);
      if (result) {
        setRefreshToken(result.refreshToken);
        dispatch(SET_TOKEN(result.accessToken));
      }
      console.log("로그인 성공:", result);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };
  const onSubmitReg: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      setIsLoading(true);
      const result = await registerUser(data.email, data.name, data.password);
      console.log("회원가입 성공:", result);
      setActiveForm("login");
      setIsLoading(false);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  // settings Info
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSwitchForm = (form: string) => {
    setActiveForm(form);
  };

  return (
    <PageContainer>
      <PageActualWrapper>
        <LoginPageContainer>
          <FormsSection>
            <SectionTitle>트러블노트 (개발중)</SectionTitle>
            <FormsWrapper>
              <FormWrapper
                className={activeForm === "login" ? "is-active" : ""}>
                <Switcher
                  className={`switcher switcher-login ${
                    activeForm === "login" ? "is-active" : ""
                  }`}
                  onClick={() => handleSwitchForm("login")}>
                  로그인
                  <Underline
                    style={{
                      opacity: activeForm === "login" ? "1" : "0",
                    }}></Underline>
                </Switcher>
                <Form
                  className={`form form-login ${
                    activeForm === "login" ? "is-active" : ""
                  }`}
                  onSubmit={handleSubmit(onSubmitLogin)}>
                  <Fieldsets>
                    <Legend>
                      Please, enter your email and password for login.
                    </Legend>
                    <InputBlock>
                      <Label htmlFor="login-email">이메일</Label>
                      <Input
                        id="login-email"
                        type="email"
                        {...(register("email"), { required: true })}
                      />
                    </InputBlock>
                    <InputBlock>
                      <Label htmlFor="login-password">비밀번호</Label>
                      <Input
                        id="login-password"
                        type="password"
                        {...(register("password"), { required: true })}
                      />
                    </InputBlock>
                  </Fieldsets>
                  <LoginButton
                    type="submit"
                    className="btn-login"
                    disabled={isLoading}>
                    로그인
                  </LoginButton>
                </Form>
              </FormWrapper>
              <FormWrapper
                className={activeForm === "signup" ? "is-active" : ""}>
                <Switcher
                  className={`switcher switcher-signup ${
                    activeForm === "signup" ? "is-active" : ""
                  }`}
                  onClick={() => handleSwitchForm("signup")}
                  disabled={isLoading}>
                  회원가입
                  <Underline
                    style={{
                      opacity: activeForm === "login" ? "0" : "1",
                    }}></Underline>
                </Switcher>
                <Form
                  className={`form form-signup ${
                    activeForm === "signup" ? "is-active" : ""
                  }`}
                  onSubmit={handleSubmitReg(onSubmitReg)}>
                  <Fieldsets>
                    <Legend>
                      Please, enter your email, password, and password
                      confirmation for sign up.
                    </Legend>
                    <InputBlock>
                      <Label htmlFor="signup-email">이메일</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        {...(registerReg("email"), { required: true })}
                      />
                    </InputBlock>
                    <InputBlock>
                      <Label htmlFor="signup-email">이름</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        {...(registerReg("name"),
                        { required: true, maxLength: 20 })}
                      />
                    </InputBlock>
                    <InputBlock>
                      <Label htmlFor="signup-password">비밀번호</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        {...(registerReg("password"),
                        { required: true, minLength: 10 })}
                      />
                    </InputBlock>
                    <InputBlock>
                      <Label htmlFor="signup-password-confirm">
                        비밀번호 확인
                      </Label>
                      <Input
                        id="signup-password-confirm"
                        type="password"
                        {...(registerReg("passwordConfirm"),
                        { required: true, minLength: 10 })}
                      />
                    </InputBlock>
                  </Fieldsets>
                  <SignupButton type="submit" className="btn-signup">
                    회원가입
                  </SignupButton>
                </Form>
              </FormWrapper>
            </FormsWrapper>
          </FormsSection>
        </LoginPageContainer>
      </PageActualWrapper>
    </PageContainer>
  );
}
