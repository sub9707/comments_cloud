import styled from "styled-components";

export default function TagInputs() {
  return (
    <InputWrapper>
      <Content className="title">
        <ContentUl>
          <ContentInput spellCheck="false" />
        </ContentUl>
      </Content>
      <Details className="details">
        <p>
          <span>10</span>개의 태그가 등록가능합니다.
        </p>
        <Button>Remove All</Button>
      </Details>
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  width: 100%;
  :where(.title, li, li i, .details) {
    display: flex;
    align-items: center;
  }
`;
const ContentInput = styled.textarea`
  flex: 1;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 16px;
`;
const ContentUl = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  margin: 12px 0;
  border-radius: 5px;
  border: 1px solid #a6a6a6;
  li {
    color: #333;
    margin: 4px 3px;
    list-style: none;
    border-radius: 5px;
    background: #f2f2f2;
    padding: 5px 8px 5px 10px;
    border: 1px solid #e3e1e1;
  }
  li i {
    height: 20px;
    width: 20px;
    color: #808080;
    margin-left: 8px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 50%;
    background: #dfdfdf;
    justify-content: center;
  }
`;
const Content = styled.div`
  margin: 10px 0;
  p {
    font-size: 15px;
  }
`;
const Details = styled.div`
  justify-content: space-between;
`;
const Button = styled.button`
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  padding: 9px 15px;
  border-radius: 5px;
  background: #5372f0;
  transition: background 0.3s ease;
  :hover {
    background: #2c52ed;
  }
`;
