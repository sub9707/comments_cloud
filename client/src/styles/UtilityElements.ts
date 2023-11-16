import styled from "styled-components";

export const DottedDivision = styled.hr`
  border-top: 1px dashed;
  border-bottom: none;
  margin-block: 0.5em;
`;
export const TopButton = styled.div`
  width: 2.5em;
  height: 2.5em;
  background-color: white;
  border-radius: 10px;
  position: fixed;
  right: 24.5em;
  bottom: 8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    font-size: small;
    margin: 0;
  }
`;

export const BottomButton = styled.div`
  width: 2.5em;
  height: 2.5em;
  background-color: white;
  border-radius: 10px;
  position: fixed;
  right: 24.5em;
  bottom: 5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    font-size: small;
    margin: 0;
  }
`;
