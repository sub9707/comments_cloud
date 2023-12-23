import React from "react";
import { ModalContainer } from "../../styles/ModalStyle/ModalStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function PictureModal() {
  const imgSrc = useSelector(
    (state: RootState) => state.pictureModalSlice.picSource
  );
  return (
    <ModalContainer
      style={{
        minWidth: "40vw",
        width: "auto",
        minHeight: "50vh",
        height: "auto",
      }}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={imgSrc}
        alt="확대사진"
      />
    </ModalContainer>
  );
}

export default PictureModal;
