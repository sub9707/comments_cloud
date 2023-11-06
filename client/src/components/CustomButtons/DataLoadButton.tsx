import { Spinner } from "react-bootstrap";
import styled from "styled-components";

interface IloadBtn {
  isLoading: boolean;
}

export default function LoadButton(props: IloadBtn) {
  const { isLoading } = props;
  return (
    <ButtonBox loading={isLoading}>
      <span>
        {isLoading && <Spinner size="sm" style={{ marginRight: "0.5em" }} />}
        {isLoading ? "불러오는 중.." : "목록 불러오기"}
      </span>
    </ButtonBox>
  );
}

const ButtonBox = styled.button<{ loading: boolean }>`
  width: 17em;
  height: 3em;
  background-color: #8782d6;
  margin-bottom: 1em;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 3.125rem;
  border: none;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.2);
  color: white;
  font-weight: 500;
  overflow: hidden;
  &::before {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: ${(props) => (props.loading ? "100%" : "0%")};
    height: 100%;
    background-color: #82d68d;
    transition: width 2s cubic-bezier(0.27, 0.99, 0.77, 0.93);
  }
  span {
    position: absolute;
    line-height: 0;
  }
`;
