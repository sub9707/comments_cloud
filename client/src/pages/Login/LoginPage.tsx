import { useEffect, useState } from "react";
import {
  LoginPageContainer,
  PageActualWrapper,
  PageContainer,
} from "@styles/PageContainer";
import {
  ErrorPrint,
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
  NoLogin,
  SectionTitle,
  SignupButton,
  Switcher,
  Underline,
} from "@styles/LoginStyle";
import registerUser, { loginUser } from "@api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoggedIn, setRefreshToken } from "@/store/Utils/Cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormValues, RegisterFormValues } from "@/types/react-hook-form";
import { setUser } from "@/store/Utils/User";
import SpinnerOne from "@components/Utils/Spinner";
import { addMessage } from "@/store/Utils/Alert";
import { setAccessToken } from "@api/token";
import { validatePassword } from "@utils/StringForm";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormValues>();
  const {
    register: registerReg,
    handleSubmit: handleSubmitReg,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormValues>();
  // 패널 state
  const [activeForm, setActiveForm] = useState<string>("login");
  // error 문 state
  const [loginError, setLoginError] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");

  // 로그인 진행 SubmitHandler
  const onSubmitLogin: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      setIsLoading(true);
      const result = await loginUser(data.email, data.password);
      if (result) {
        console.log(result);
        setRefreshToken(result.refreshToken);
        setAccessToken({
          code: result.code,
          message: result.message,
          accessToken: result.accessToken,
          expiresIn: 15 * 60 * 1000,
        });
        dispatch(
          setUser({
            name: result.user.name,
            email: result.user.email,
            id: result.userId,
            rule: result.user.rule,
            profile_img: result.user.profileImg,
          })
        );
        dispatch(
          addMessage({
            id: "unique_id",
            text: `로그인 했습니다.`,
            type: "info",
          })
        );
        navigate("/");
      } else {
        console.log("로그인 실패:", result);
      }
    } catch (error: any) {
      setLoginError("로그인 정보를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };
  // 회원가입 진행 SubmitHandler
  const onSubmitReg: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      setIsLoading(true);
      await registerUser(data.email, data.name, data.password);
      setActiveForm("login");
      dispatch(
        addMessage({
          id: "unique_id",
          text: `회원가입 성공!`,
          type: "success",
        })
      );
      setRegisterError("");
      setIsLoading(false);
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      if (error.response) {
        setRegisterError(error.response.data);
      } else {
        setRegisterError("네트워크 오류가 발생했습니다.");
      }
      setIsLoading(false);
    }
  };

  const validatePasswordMatch = (value: string) =>
    value === getValues("password") || "비밀번호가 일치하지 않습니다.";

  // settings Info
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 회원가입 로그인 FORM 전환
  const handleSwitchForm = (form: string) => {
    setActiveForm(form);
  };

  // test 계정 로그인 handler
  const handleAdminLogin = async () => {
    try {
      setIsLoading(true);
      const result = await loginUser("admin@admin", "adminadmin@314");
      if (result) {
        setRefreshToken(result.refreshToken);
        setAccessToken({
          code: result.code,
          message: result.message,
          accessToken: result.accessToken,
          expiresIn: 15 * 60 * 1000,
        });
        dispatch(
          setUser({
            name: result.user.name,
            email: result.user.email,
            id: result.userId,
            rule: result.user.rule,
            profile_img: result.user.profileImg,
          })
        );
        dispatch(
          addMessage({
            id: "unique_id",
            text: `로그인 했습니다.`,
            type: "info",
          })
        );
        navigate("/");
      } else {
        console.log("로그인 실패:", result);
      }
    } catch (error: any) {
      console.log(error);
      setLoginError("로그인 정보를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  return (
    <PageContainer>
      <PageActualWrapper>
        <LoginPageContainer>
          <FormsSection>
            <SectionTitle>
              <img src="/images/LogoInv.webp" alt="로고" />
            </SectionTitle>
            {/* 로그인 FORM */}
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
                      로그인을 위해 이메일과 비밀번호를 입력하세요.
                    </Legend>
                    <InputBlock>
                      <Label htmlFor="login-email">이메일</Label>
                      <Input
                        id="login-email"
                        type="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email을 입력해주세요.",
                          },
                        })}
                      />
                    </InputBlock>
                    <InputBlock>
                      <Label htmlFor="login-password">비밀번호</Label>
                      <Input
                        id="login-password"
                        type="password"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "비밀번호를 입력해주세요.",
                          },
                        })}
                      />
                    </InputBlock>
                  </Fieldsets>
                  {loginError && activeForm === "login" && (
                    <ErrorPrint>{loginError}</ErrorPrint>
                  )}
                  {loginErrors.email && (
                    <ErrorPrint>{loginErrors.email.message}</ErrorPrint>
                  )}
                  {loginErrors.password && (
                    <ErrorPrint>{loginErrors.password.message}</ErrorPrint>
                  )}
                  <LoginButton
                    type="submit"
                    className="btn-login"
                    disabled={isLoading}>
                    {isLoading ? <SpinnerOne /> : "로그인"}
                  </LoginButton>
                </Form>
              </FormWrapper>

              {/* 회원가입 FORM */}

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
                    <InputBlock>
                      <Label htmlFor="signup-email">이메일</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        {...registerReg("email", {
                          required: true,
                        })}
                      />
                    </InputBlock>
                    <InputBlock>
                      <Label htmlFor="signup-email">이름</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        {...registerReg("name", {
                          required: true,
                          maxLength: 20,
                        })}
                      />
                    </InputBlock>
                    <InputBlock>
                      <Label htmlFor="signup-password">비밀번호</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        {...registerReg("password", {
                          required: true,
                          minLength: {
                            value: 10,
                            message: "비밀번호는 10글자 이상으로 등록해주세요.",
                          },
                          validate: validatePassword,
                        })}
                      />
                    </InputBlock>
                    <InputBlock>
                      <Label htmlFor="signup-password-confirm">
                        비밀번호 확인
                      </Label>
                      <Input
                        id="signup-password-confirm"
                        type="password"
                        {...registerReg("passwordConfirm", {
                          required: "비밀번호를 다시 입력해주세요.",
                          validate: validatePasswordMatch,
                        })}
                      />
                    </InputBlock>
                  </Fieldsets>
                  {registerError && activeForm === "signup" && (
                    <ErrorPrint>{registerError}</ErrorPrint>
                  )}
                  {errors.password && (
                    <ErrorPrint>{errors.password.message}</ErrorPrint>
                  )}
                  {errors.passwordConfirm && (
                    <ErrorPrint>{errors.passwordConfirm.message}</ErrorPrint>
                  )}
                  <SignupButton
                    type="submit"
                    className="btn-signup"
                    disabled={isLoading}>
                    {isLoading ? <SpinnerOne /> : "회원가입"}
                  </SignupButton>
                </Form>
              </FormWrapper>
            </FormsWrapper>
            <NoLogin onClick={() => navigate("/")}>로그인없이 이용하기</NoLogin>
            <NoLogin onClick={handleAdminLogin}>테스트 계정 로그인</NoLogin>
          </FormsSection>
        </LoginPageContainer>
      </PageActualWrapper>
    </PageContainer>
  );
}
