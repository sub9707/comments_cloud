import { faClone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addMessage } from "../../store/Utils/Alert";
import { CloseButton } from "react-bootstrap";
import { RootState } from "../../store";

type propstype = {
  setisopen: Dispatch<SetStateAction<boolean>>;
};

export default function SharePopOver(props: propstype) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.myError);
  const handleCopyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(
        (inputRef.current as HTMLInputElement).value
      );
    }
    dispatch(
      addMessage({
        id: "unique_id",
        text: `클립보드에 복사되었습니다.`,
        type: "info",
      })
    );
  };

  return (
    <SharePopBox>
      <CloseButton
        style={{ position: "absolute", top: 0, right: 0, scale: "0.7" }}
        onClick={() => props.setisopen(false)}
      />
      <HeaderText>공유하기</HeaderText>
      <InputLabel>URL</InputLabel>
      <InputTagBox>
        <ShareInput
          ref={inputRef}
          type="text"
          value={`https://comments-cloud.vercel.app/myError/${data?.id}`}
          readOnly
        />
        <FontAwesomeIcon
          icon={faClone}
          style={{
            position: "absolute",
            right: "0.5em",
            top: "0.4em",
            cursor: "pointer",
          }}
          onClick={handleCopyToClipboard}
        />
      </InputTagBox>
    </SharePopBox>
  );
}

const SharePopBox = styled.div`
  cursor: default;
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
  &:hover {
    font-weight: 100 !important;
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
  width: 100%;
  padding-right: 1.7em;
  padding-left: 0.3em;
  color: #868686;
  &:focus {
    outline: none;
  }
`;
