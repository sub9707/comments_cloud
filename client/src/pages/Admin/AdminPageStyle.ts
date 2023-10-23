import styled from "styled-components";

export const PageContainer = styled.div`
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #e4e4ef;
`;

export const Page1920Container = styled.div`
  max-width: 1920px;
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content: center;
`;

export const Page1440Container = styled.div`
  width: 100%;
  max-width: 1440px;
  min-height: 100vh;
  height: auto;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  display: flex;
  justify-content: center;
  padding-block: 3em;
`;

export const PageBox = styled.div`
  width: 90%;
  height: auto;
`;

export const PageHeader = styled.h1`
  font-size: 2em;
  color: gray;
  font-weight: 700;
`;
// UserPage
