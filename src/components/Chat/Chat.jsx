import { useStyleContext } from "../../context/StyleContext";
import TextMessage from "./TextMessage";
import MessageBox from "./MessageBox";
import { useState } from "react";

const Chat = () => {
  const { margin } = useStyleContext();
  const [messageToRespond, setMessageToRespond] = useState();
  return (
    <div
      className={`${margin ? "ml-[325px]" : "ml-[50px]"} pt-[60px]`}
    >
      <TextMessage
        messageToRespond={messageToRespond}
        setMessageToRespond={setMessageToRespond}
      />
      <MessageBox
        messageToRespond={messageToRespond}
        setMessageToRespond={setMessageToRespond}
      />
    </div>
  );
};

export default Chat;
