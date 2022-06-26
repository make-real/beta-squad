import React from "react";
import { useStyleContext } from "../../context/StyleContext";
import MessageBox from "./MessageBox";
import TextMessage from "./TextMessage";

const Chat = () => {

  const { margin } = useStyleContext();

  return (
    <div className={`${margin ? 'ml-[325px]' : 'ml-[50px]'} pt-[90px] duration-200 px-4 chat-height`}>

      <div className="fixed bottom-0 w-11/12">
        <TextMessage />
        <div className="w-[95%]">
          <MessageBox />
        </div>
      </div>

    </div>
  );
};

export default Chat;
