import styled from "styled-components";

export const PageContainer = styled.div`
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: #3b4465;
  overflow-x: hidden;
`;

export const PageActualWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const LoginPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageAreaDesign = styled.div`
  position: relative;
  width: 80%;
  height: 85%;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ToolWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: -40px;
  color: white;
  display: flex;
  justify-content: space-between;
`;

export const LogBox = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  font-size: large;
  margin-left: 2%;
  @media (max-width: 1200px) {
    width: 20%;
  }
  @media (max-width: 800px) {
    width: 20%;
  }
  @media (max-width: 500px) {
    width: 30%;
  }
`;

export const PageNavBox = styled.div`
  width: 10%;
  display: flex;
  justify-content: space-around;
  margin-left: 2em;
`;

export const MainContainer = styled.div`
  width: 95%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

export const ContentBox = styled.div`
  width: 100%;
  min-height: 100%;
  height: auto;
  margin-top: 3em;
`;
