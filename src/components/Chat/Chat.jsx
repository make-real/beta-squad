import React from "react";
import MessageBox from "./MessageBox";
import TextMessage from "./TextMessage";

const Chat = () => {
  return (
    <div className="mx-8 pb-2 relative  chat-height ">
      <div className="absolute w-full  bottom-0 ">
        <TextMessage />
        <MessageBox />
      </div>
    </div>
  );
};

export default Chat;
