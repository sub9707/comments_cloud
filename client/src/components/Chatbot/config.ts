import { createChatBotMessage } from "react-chatbot-kit";

const botName = "문의하기";

const config = {
  initialMessages: [
    createChatBotMessage(
      `반갑습니다!
      챗봇 기능은 개발 중입니다.`,
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
