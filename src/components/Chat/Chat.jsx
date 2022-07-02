import React from "react";
import { useStyleContext } from "../../context/StyleContext";
import MessageBox from "./MessageBox";
import TextMessage from "./TextMessage";

const Chat = () => {
  const { margin } = useStyleContext();

  return (
    <div
      className={`${
        margin ? "ml-[325px]" : "ml-[50px]"
      } fixed bottom-0 left-0 right-0 pt-[90px] duration-200 px-4`}
    >
      {/* <div className="fixed bottom-0   w-11/12"> */}
      <TextMessage />
      <div className="w-[95%]">
        <MessageBox />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Chat;
