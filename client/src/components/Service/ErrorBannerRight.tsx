import { Variants, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { openModal } from "../../store/Modal/Modal";
import { setPicture } from "../../store/Modal/PictureModal";

function ErrorBannerRight(
  props: { onRef: React.RefObject<HTMLDivElement> } & { reversed: boolean } & {
    imgSrc: string;
  }
) {
  const dispatch = useDispatch();
  const handleClickPicture = () => {
    dispatch(setPicture(props.imgSrc));
    dispatch(openModal({ modalType: "PictureModal", isOpen: true }));
  };
  const cardVariants: Variants = {
    offscreen: {
      x: props.reversed ? -300 : 300,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 3,
      },
    },
  };
  return (
    <ErrorBannerImgBox
      initial="offscreen"
      whileInView="onscreen"
      variants={cardVariants}
      viewport={{ root: props.onRef, once: true }}>
      <RightImage
        onClick={handleClickPicture}
        src={props.imgSrc}
        style={{ cursor: "pointer" }}
        alt="infoGIF"
      />
    </ErrorBannerImgBox>
  );
}

export default ErrorBannerRight;

const ErrorBannerImgBox = styled(motion.div)`
  width: 40%;
  display: flex;
  align-items: center;
`;

const RightImage = styled.img`
  width: 100%;
  height: 20em;
`;
