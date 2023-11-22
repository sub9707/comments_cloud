import styled from "styled-components";

export const PageHeader = styled.h2`
  color: black;
  font-size: 2em;
  font-family: LotteMartHappy;
  margin-top: 1.5em;
  margin-left: 1em;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    background-color: #a2a8d3;
    width: 3px;
    height: 90%;
    bottom: 2px;
    left: -0.5em;
  }
`;

export const AccordionDate = styled.p`
  color: black;
  opacity: 0.7;
  font-size: 1em;
`;

export const HeaderFourth = styled.h4`
  font-size: 1.5em;
  font-weight: 700;
`;
