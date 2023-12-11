import styled from "styled-components";
import { ServiceDataType } from "../../types/Components-type";
import { motion, Variants } from "framer-motion";

function ErrorBannerLeft(
  props: ServiceDataType & { reversed: boolean } & {
    onRef: React.RefObject<HTMLDivElement>;
  }
) {
  const { title, subtitle, list, reversed } = props;

  const cardVariants: Variants = {
    offscreen: {
      x: reversed ? 200 : -300,
      opacity: 0,
    },
    onscreen: {
      x: reversed ? 50 : 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 3,
      },
    },
  };
  return (
    <ErrorBannerBox
      initial="offscreen"
      whileInView="onscreen"
      variants={cardVariants}
      viewport={{ root: props.onRef, once: true }}>
      <ErrorBannerTitle>{title}</ErrorBannerTitle>
      <ErrorBannerSubtitle>{subtitle}</ErrorBannerSubtitle>
      <ul>
        {list.map((data, _idx) => (
          <li key={_idx}>{data}</li>
        ))}
      </ul>
    </ErrorBannerBox>
  );
}

export default ErrorBannerLeft;

const ErrorBannerBox = styled(motion.div)`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5em;
  ul {
    padding-inline: 1em;
  }
  color: #5528a7;
`;

const ErrorBannerTitle = styled.h4`
  font-family: "ONE-Mobile-Title";
`;
const ErrorBannerSubtitle = styled.p``;
