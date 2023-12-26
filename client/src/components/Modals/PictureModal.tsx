import React from "react";
import { ModalContainer } from "@styles/ModalStyle/ModalStyle";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { JustifyCenter } from "@styles/FlexBoxStlye";

function PictureModal() {
  const imgSrc = useSelector(
    (state: RootState) => state.pictureModalSlice.picSource
  );
  return (
    <ModalContainer
      style={{
        width: "50vw",
        height: "50vh",
      }}>
      <JustifyCenter>
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={imgSrc}
          alt="확대사진"
        />
      </JustifyCenter>
    </ModalContainer>
  );
}

export default PictureModal;
