import styled from "styled-components";

export default function SolvedBadge(props: { solved: string }) {
  return <BadgeBox solved={props.solved}>{props.solved}</BadgeBox>;
}

const BadgeBox = styled.div<{ solved: string }>`
  font-size: small;
  width: 50px;
  height: 22px;
  background-image: ${(props) =>
    props.solved === "해결"
      ? "linear-gradient(355deg, hsl(125deg 100% 35%) 0%, hsl(121deg 87% 38%) 13%, hsl(117deg 87% 40%) 26%, hsl(114deg 88% 41%) 39%, hsl(111deg 90% 42%) 52%, hsl(109deg 92% 42%) 64%, hsl(107deg 94% 43%) 76%, hsl(105deg 97% 44%) 88%, hsl(103deg 100% 45%) 100%)"
      : "linear-gradient(0deg,hsl(27deg 100% 59%) 0%,hsl(29deg 100% 58%) 11%,hsl(31deg 100% 57%) 22%,hsl(34deg 100% 57%) 33%,hsl(36deg 100% 56%) 44%,hsl(38deg 100% 55%) 56%,hsl(40deg 100% 54%) 67%,hsl(42deg 100% 53%) 78%,hsl(44deg 100% 51%) 89%,hsl(46deg 100% 50%) 100%)"};
  color: white;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
`;
