import styled from "styled-components";

export const CardWrapper = styled.div`
  width: 25em;
  height: 9em;
  background-color: #e9eef5c6;
  display: block;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 1em;
`;

export const CardTitle = styled.h4`
  margin: 0;
  height: 1em;
`;
export const CardSubTitle = styled.p`
  margin-bottom: 0;
  margin-top: 0.5em;
  color: grey;
  height: 3em;
  background-color: yellow;
`;
export const CardInfo = styled.div`
  width: 100%;
  height: 2.5em;
  margin-top: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BadgeWrapper = styled.div`
  width: 70%;
  height: 100%;
  background-color: blue;
`;
export const DateInfo = styled.p`
  color: grey;
  margin: 0;
`;
