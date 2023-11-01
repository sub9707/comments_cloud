import styled from "styled-components";

export const InputWrapper = styled.div`
  width: 100%;
  :where(.title, li, li i, .details) {
    display: flex;
    align-items: center;
  }
`;
export const ContentInput = styled.input`
  display: flex;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 16px;
  width: 98%;
`;
export const ContentUl = styled.ul`
  width: 100%;
  display: block;
  flex-wrap: wrap;
  padding: 7px;
  margin: 12px 0;
  border-radius: 5px;
  border: 1px solid #a6a6a6;
  li {
    display: inline-block;
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
export const Content = styled.div`
  margin: 10px 0;
  margin-inline: 3em;
  p {
    font-size: 15px;
  }
`;
export const Details = styled.div`
  justify-content: space-between;
  margin-inline: 3em;
`;
export const Button = styled.button`
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
