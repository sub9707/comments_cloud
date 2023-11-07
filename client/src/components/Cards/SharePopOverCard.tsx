import { faClone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export default function SharePopOver() {
  return (
    <SharePopBox>
      <HeaderText>공유하기</HeaderText>
      <InputLabel>URL</InputLabel>
      <InputTagBox>
        <ShareInput type="text" readOnly />
        <FontAwesomeIcon
          icon={faClone}
          style={{ position: "absolute", right: "0.5em", top: "0.4em" }}
        />
      </InputTagBox>
    </SharePopBox>
  );
}

const SharePopBox = styled.div`
  position: absolute;
  display: block;
  height: auto;
  background-color: #ebebeb;
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
  width: 13em;
  left: 1.5em;
  top: 0;
  z-index: 99;
  box-shadow: rgba(136, 165, 191, 0.48) 3px 1px 8px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  border: 1px solid #a0a0a0a2;
  /* 생성한 꼬리 스타일 */
  &::before {
    content: "";
    position: absolute;
    top: 0%;
    left: 0%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: #e7e7e7 transparent transparent transparent;
  }
`;

const HeaderText = styled.p`
  font-size: small;
  margin-bottom: 0.5em !important;
`;
const InputLabel = styled.p`
  font-size: x-small;
  margin-bottom: 0.2em !important;
`;
const InputTagBox = styled.div`
  position: relative;
`;
const ShareInput = styled.input`
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
