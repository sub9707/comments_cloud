import styled from "styled-components";

export const ModalContainer = styled.div`
  position: relative;
  width: 50vw;
  height: 80vh;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ModalContent = styled.div`
  height: 60vh;
  margin-block: 2em;
`;
