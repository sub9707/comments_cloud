import { useState } from "react";
import styled, { CSSProperties } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faFile,
  faHouse,
  faScrewdriverWrench,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  icon: any;
  route: string;
  text: string;
  left: string;
  bottom: string;
}

function AdminButton() {
  const navigate = useNavigate();
  const [onClickAdmin, setOnClickAdmin] = useState<boolean>(false);
  const [hoverbutton, setHoverButton] = useState([false, false, false, false]);

  const updateIndexToValue = (index: number, value: boolean) => {
    setHoverButton((prev) => [
      ...prev.slice(0, index),
      value,
      ...prev.slice(index + 1),
    ]);
  };

  const menuItems: MenuItem[] = [
    {
      icon: faHouse,
      route: "/admin",
      text: "홈으로",
      left: onClickAdmin ? "-3vw" : "0",
      bottom: onClickAdmin ? "8vh" : "0",
    },
    {
      icon: faUsers,
      route: "/admin/user",
      text: "유저",
      left: onClickAdmin ? "1.5vw" : "0",
      bottom: onClickAdmin ? "10vh" : "0",
    },
    {
      icon: faFile,
      route: "/admin/board",
      text: "게시글",
      left: onClickAdmin ? "5vw" : "0",
      bottom: onClickAdmin ? "3.5vh" : "0",
    },
    {
      icon: faCircleQuestion,
      route: "/admin/notice",
      text: "공지",
      left: onClickAdmin ? "4vw" : "0",
      bottom: onClickAdmin ? "-6vh" : "0",
    },
  ];

  return (
    <ButtonWrapper>
      <FontAwesomeIcon
        icon={faScrewdriverWrench}
        size="xl"
        style={{ zIndex: 99 }}
        onClick={() => setOnClickAdmin(!onClickAdmin)}
      />
      <p style={{ position: "absolute", fontSize: "1em", bottom: "-4.5vh" }}>
        관리툴
      </p>
      {menuItems.map((item, index) => (
        <MenuButton
          key={index}
          style={{
            visibility: onClickAdmin ? "visible" : "hidden",
            opacity: onClickAdmin ? 1 : 0,
            left: item.left,
            bottom: item.bottom,
          }}
          onMouseOver={() => updateIndexToValue(index, true)}
          onMouseOut={() => updateIndexToValue(index, false)}
          onClick={() => navigate(item.route)}>
          <FontAwesomeIcon
            style={hoverbutton[index] ? IconStyleHovered : IconStyle}
            icon={item.icon}
            size="xl"
          />
          <HiddenText hoverbutton={hoverbutton[index]}>{item.text}</HiddenText>
        </MenuButton>
      ))}
    </ButtonWrapper>
  );
}

export default AdminButton;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 5vw;
  bottom: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5em;
  height: 3.5em;
  background-color: #00000097;
  color: white;
  border-radius: 50%;
  cursor: pointer;
`;

const HiddenText = styled.p<{ hoverbutton: boolean }>`
  position: absolute;
  font-size: 1em;
  bottom: ${(props) => (props.hoverbutton ? "-0.3vh" : "-4vh")};
  transition: all 0.3s ease-in-out;
`;

const IconStyle: CSSProperties = {
  position: "absolute",
  bottom: "1.5vh",
  transition: "all 0.3s ease-in-out",
};

const IconStyleHovered: CSSProperties = {
  ...IconStyle,
  bottom: "6vh",
};

const MenuButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5em;
  height: 3.5em;
  background-color: #00000097;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
`;
