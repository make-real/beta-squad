import React from "react";
import MessageBox from "./MessageBox";
import TextMessage from "./TextMessage";

const Chat = () => {
  return (
    <div className="mx-8 pb-2  chat-height ">
      <div className="fixed bottom-0  w-11/12">
        <TextMessage />
        <div className="w-[95%]">
          <MessageBox />
        </div>
      </div>
    </div>
  );
};

export default Chat;
