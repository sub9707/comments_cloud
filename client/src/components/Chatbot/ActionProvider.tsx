import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleBug = () => {
    const botMessage = createChatBotMessage(
      "서비스 이용 중 버그가 발생하셨나요?",
      {
        widget: "bugButton",
      }
    );

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleBug,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
