import styled, { keyframes } from "styled-components";

const showLayer = keyframes`
  50% {
    z-index: 1;
  }
  100% {
    z-index: 1;
  }
`;

const hideLayer = keyframes`
  0% {
    z-index: 1;
  }
  49.999% {
    z-index: 1;
  }
`;

const showLogin = keyframes`
  0% {
    background: #d7e7f1;
    transform: translate(40%, 10px);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    background-color: #fff;
    transform: translate(35%, -20px);
  }
`;

const hideLogin = keyframes`
  0% {
    background-color: #fff;
    transform: translate(35%, -20px);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    background: #d7e7f1;
    transform: translate(40%, 10px);
  }
`;

const showSignup = keyframes`
  0% {
    background: #d7e7f1;
    transform: translate(-40%, 10px) scaleY(.8);
  }
  50% {
    transform: translate(0, 0) scaleY(.8);
  }
  100% {
    background-color: #fff;
    transform: translate(-35%, -20px) scaleY(1);
  }
`;

const hideSignup = keyframes`
  0% {
    background-color: #fff;
    transform: translate(-35%, -20px) scaleY(1);
  }
  50% {
    transform: translate(0, 0) scaleY(.8);
  }
  100% {
    background: #d7e7f1;
    transform: translate(-40%, 10px) scaleY(.8);
  }
`;

const FormsSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled.h1`
  font-size: 32px;
  letter-spacing: 1px;
  color: #fff;
`;

const FormsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 30px;
`;

const FormWrapper = styled.div`
  animation: ${hideLayer} 0.3s ease-out forwards;

  &.is-active {
    animation: ${showLayer} 0.3s ease-in forwards;
  }
`;

const Switcher = styled.button`
  position: relative;
  cursor: pointer;
  display: block;
  margin-right: auto;
  margin-left: auto;
  padding: 0;
  text-transform: uppercase;
  font-family: inherit;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: #999;
  background-color: transparent;
  border: none;
  outline: none;
  transform: translateX(0);
  transition: all 0.3s ease-out;

  &.switcher-login {
    color: #fff;
    transform: translateX(90px);
  }

  &.switcher-signup {
    color: #fff;
    transform: translateX(-90px);
  }
`;

const Underline = styled.span`
  position: absolute;
  bottom: -5px;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  width: 100%;
  height: 2px;
  transition: all 0.3s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: inherit;
    display: block;
    width: inherit;
    height: inherit;
    background-color: currentColor;
    transition: transform 0.2s ease-out;
  }
`;

const Form = styled.form`
  overflow: hidden;
  min-width: 400px;
  margin-top: 50px;
  padding: 30px 25px;
  border-radius: 5px;
  transform-origin: top;

  &.form-login {
    animation: ${hideLogin} 0.3s ease-out forwards;
  }

  .is-active &.form-login {
    animation: ${showLogin} 0.3s ease-in forwards;
  }

  &.form-signup {
    animation: ${hideSignup} 0.3s ease-out forwards;
  }

  .is-active &.form-signup {
    animation: ${showSignup} 0.3s ease-in forwards;
  }
  @media (max-width: 500px) {
    min-width: 300px;
  }
`;

const Fieldsets = styled.fieldset`
  position: relative;
  opacity: 0;
  margin: 0;
  padding: 0;
  border: 0;
  transition: all 0.3s ease-out;

  .is-active & {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.4s ease-in, transform 0.35s ease-in;
  }
`;

const Legend = styled.legend`
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  clip: rect(0 0 0 0);
`;

const InputBlock = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #a1b4b4;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 8px;
  padding-right: 15px;
  padding-left: 15px;
  font-size: 16px;
  line-height: 40px;
  color: #3b4465;
  background: #eef9fe;
  border: 1px solid #cddbef;
  border-radius: 2px;
`;

const SubmitButton = styled.button`
  opacity: 0;
  display: block;
  min-width: 120px;
  margin: 30px auto 10px;
  font-size: 18px;
  line-height: 40px;
  border-radius: 25px;
  border: none;
  transition: all 0.3s ease-out;

  .is-active & {
    opacity: 1;
    transform: translateX(0);
    transition: all 0.4s ease-in;
  }
`;

const LoginButton = styled(SubmitButton)`
  color: #fbfdff;
  background: #192d52;
  transform: translateX(-30%);
`;

const SignupButton = styled(SubmitButton)`
  color: #192d52;
  background: white;
  box-shadow: inset 0 0 0 2px #192d52;
  transform: translateX(30%);
`;

const ErrorPrint = styled.p`
  color: red;
  font-size: large;
`;

export {
  FormsSection,
  SectionTitle,
  FormsWrapper,
  FormWrapper,
  Switcher,
  Underline,
  Form,
  Fieldsets,
  Legend,
  InputBlock,
  Label,
  Input,
  LoginButton,
  SignupButton,
  ErrorPrint,
};
