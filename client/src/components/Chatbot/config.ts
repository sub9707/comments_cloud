import { createChatBotMessage } from "react-chatbot-kit";

const botName = "문의하기";

const config = {
  initialMessages: [
    createChatBotMessage(
      `반갑습니다!
      다음의 문의 메뉴를 이용해주세요.`,
      {}
    ),
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#381ab0",
    },
    chatButton: {
      backgroundColor: "#5c62cc",
    },
  },
};

export default config;
