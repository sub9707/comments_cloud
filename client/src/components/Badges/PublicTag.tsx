import styled from "styled-components";
import { PublicBadgeType } from "../../types/Components-type";
import { useDispatch } from "react-redux";
import { addMessage } from "../../store/Alert";

export default function PublicBadge(props: PublicBadgeType) {
  const dispatch = useDispatch();
  const handleClickPublic = () => {
    if (props.ispublic === "true") props.setTemp(false);
    else props.setTemp(true);
    dispatch(
      addMessage({
        id: "unique_id",
        text: `게시글이 ${
          props.ispublic === "true" ? "비공개" : "공개"
        }로 전환되었습니다.`,
        type: "success",
      })
    );
  };
  return (
    <BadgeBox ispublic={props.ispublic} onClick={handleClickPublic}>
      {props.ispublic === "true" ? "공개" : "비공개"}
    </BadgeBox>
  );
}

const BadgeBox = styled.div<{ ispublic: string }>`
  cursor: pointer;
  font-size: small;
  width: 50px;
  height: 22px;
  background-image: ${(props) =>
    props.ispublic === "true"
      ? "linear-gradient(0deg,hsl(225deg 100% 71%) 0%,hsl(228deg 100% 73%) 11%,hsl(233deg 100% 74%) 22%,hsl(238deg 100% 75%) 33%,hsl(244deg 100% 75%) 44%,hsl(250deg 100% 74%) 56%,hsl(256deg 100% 73%) 67%,hsl(262deg 100% 72%) 78%,hsl(268deg 100% 71%) 89%,hsl(273deg 100% 69%) 100%)"
      : "linear-gradient(0deg,hsl(0deg 0% 36%) 0%,hsl(344deg 0% 39%) 11%,hsl(344deg 0% 41%) 22%,hsl(344deg 0% 43%) 33%,hsl(344deg 0% 46%) 44%,hsl(344deg 0% 48%) 56%,hsl(344deg 0% 51%) 67%,hsl(344deg 0% 53%) 78%,hsl(344deg 0% 56%) 89%,hsl(0deg 0% 58%) 100%)"};
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
