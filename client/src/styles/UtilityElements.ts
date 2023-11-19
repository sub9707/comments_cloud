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

export const CheckBoxInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:checked + label {
    background-color: rgb(90, 90, 185);
    color: white;
  }
`;
export const CheckBoxLabel = styled.label`
  padding: 0.5rem 1rem;
  height: 2.25rem;
  margin-top: 0.2em;
  margin-inline: 0.5em;
  cursor: pointer;
  border-radius: 2rem;
  background-color: #ededed;
  font-size: 1em;
  color: black;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
