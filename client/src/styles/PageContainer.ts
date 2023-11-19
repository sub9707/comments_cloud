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
  height: 90%;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;
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
  min-height: 68vh;
  height: auto;
  margin-block: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TableCard = styled.div`
  width: 99%;
  height: auto;
  border-radius: 13px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

export const ScrollTarget = styled.div`
  width: 100%;
  height: 50px;
  margin-top: calc(100% - 85%);
  background-color: red;
`;

export const WidthMaxCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const ProfileBox = styled.div`
  width: 100%;
  height: 78vh;
  display: flex;
  box-sizing: border-box;
`;
export const ProfileLeft = styled.div`
  width: 25%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
`;
export const ProfileRight = styled.div`
  width: 75%;
  height: auto;
  display: block;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

export const ProfileImgArea = styled.div`
  position: relative;
  width: 15em;
  height: 15em;
  margin-top: 1.5em;
`;

export const ProfileCircle = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 8px solid white;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

export const ProfileChangeButton = styled.label`
  position: absolute;
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  bottom: 1em;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    210deg,
    #9f89ff 0,
    #4b5efb 50%,
    #0039d9 100%
  );
  border: none;
  transition: scale 0.1s linear;
  &:hover {
    scale: 0.95;
  }
`;

export const ProfileInfoArea = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5em;
`;

export const InfoText = styled.p`
  font: larger;
  color: #6f6f6f;
  line-height: 1em;
`;
