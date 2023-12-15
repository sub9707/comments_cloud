import styled from "styled-components";

export const ModalContainer = styled.div`
  position: relative;
  width: 50vw;
  height: 80vh;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ModalContent = styled.div`
  height: auto;
  margin-block: 2em;
`;
