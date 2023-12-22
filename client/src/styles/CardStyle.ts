import styled from "styled-components";

export const CardWrapper = styled.div`
  width: 28em;
  height: 9em;
  background-color: #e9eef5c6;
  display: block;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 1em;
`;

export const CardTitle = styled.h4`
  margin: 0;
  height: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  font-weight: 600;
`;
export const CardBody = styled.div`
  width: 100%;
  display: flex;
`;
export const CardSubTitle = styled.p`
  width: 80%;
  margin-bottom: 0;
  margin-top: 1em;
  color: grey;
  height: 2.7em;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  line-height: 1.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
export const CardNicKName = styled.div`
  opacity: 0.7;
  font-size: 0.9em;
  margin: 0;
  display: flex;
  align-items: flex-end;
  width: 20%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  white-space: nowrap;
`;
export const CardInfo = styled.div`
  width: 100%;
  height: 2.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BadgeWrapper = styled.div`
  width: 70%;
  height: 90%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: 0.2em;
  gap: 0.3em;
  &::-webkit-scrollbar {
    display: none;
  }
  cursor: default;
`;
export const DateInfo = styled.p`
  color: grey;
  margin: 0;
`;
