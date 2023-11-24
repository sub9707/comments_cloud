import React from "react";

const MessageParser = ({ children, actions }: any) => {
  const parse = (message: any) => {
    if (message.includes("hello")) {
      actions.handleHello();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
