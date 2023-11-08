import styled, { keyframes } from "styled-components";

type BadgeBoxProps = {
  level: number;
};

export default function LevelBadge(props: BadgeBoxProps) {
  return (
    <BadgeWrapper>
      <BadgeBox level={props.level - 1}>
        <LevelText>LV.{props.level}</LevelText>
      </BadgeBox>
      <BadgeGlow level={props.level} />
    </BadgeWrapper>
  );
}
const glow = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 200%;
  }
`;
const BadgeWrapper = styled.div`
  position: relative;
  width: 7em;
  height: 2em;
  margin-bottom: 2em;
`;
const BadgeBox = styled.div<BadgeBoxProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ level }) =>
    level >= 0 && level < levelColorTheme.length
      ? levelColorTheme[level].background
      : "initial"};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  border: 2px solid
    ${({ level }) =>
      level >= 0 && level < levelColorTheme.length
        ? levelColorTheme[level].border
        : "initial"};
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  z-index: 2;
  &::after {
  }
`;
const BadgeGlow = styled.div<BadgeBoxProps>`
  position: absolute;
  content: "";
  top: 0px;
  left: 0;
  right: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  transform: scale(1.5) translateZ(0);
  filter: blur(15px);
  background: ${({ level }) => {
    if (level >= 3) {
      return levelColorTheme[level - 1].background;
    }
    return "transparent";
  }};
  opacity: 0.9;
  background-size: 200% 200%;
  animation: ${glow} 2s linear infinite;
`;

const LevelText = styled.p`
  font-size: large;
  margin: 0;
`;

const levelColorTheme = [
  {
    level: 1,
    background: "linear-gradient(135deg, #cd7f32, #a0522d)",
    border: "#e4a761",
    name: "Bronze",
  },
  {
    level: 2,
    background: "linear-gradient(135deg, #c0c0c0, #808080)",
    border: "#d3d3d3",
    name: "Silver",
  },
  {
    level: 3,
    background: "linear-gradient(135deg, #d88c00, #ffd83c, #ffa600)",
    border: "#ffdb58",
    name: "Gold",
  },
  {
    level: 4,
    background: "linear-gradient(135deg, #55c0e0, #30c774, #00dacf)",
    border: "#66cdaa",
    name: "Platinum",
  },
  {
    level: 5,
    background: "linear-gradient(135deg, #7a49eb, #0099ff, #7e49fa)",
    border: "#add8e6",
    name: "Diamond",
  },
];
