import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function ChatbotElement() {
  const [toggleChat, setToggleChat] = useState<boolean>(false);
  console.log(toggleChat);
  return (
    <>
      {toggleChat ? (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      ) : null}

      <ChatbotButton onClick={() => setToggleChat(!toggleChat)}>
        <FontAwesomeIcon icon={faRobot} size="xl" />
      </ChatbotButton>
    </>
  );
}

export default ChatbotElement;

const ChatbotButton = styled.button`
  position: absolute;
  bottom: 1em;
  right: 1em;
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  opacity: 50%;
  background-color: black;
  color: white;
`;
