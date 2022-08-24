import { useStyleContext } from "../../context/StyleContext";
import TextMessage from "./TextMessage";
import MessageBox from "./MessageBox";
import { useEffect, useState } from "react";

const Chat = () => {
  const { margin } = useStyleContext();
  const [messageToRespond, setMessageToRespond] = useState();
  return (
    <div className={`${margin ? "ml-[325px]" : "ml-[50px]"}`}>
      <div
        style={{
          height: `calc(100vh - ${messageToRespond ? 245 : 145}px)`,
          marginTop: "70px",
        }}
        className={`overflow-y-auto overflow-x-hidden px-5 pt-5 customScroll`}
      >
        <TextMessage
          messageToRespond={messageToRespond}
          setMessageToRespond={setMessageToRespond}
        />
      </div>
      <MessageBox
        messageToRespond={messageToRespond}
        setMessageToRespond={setMessageToRespond}
      />
    </div>
  );
};

export default Chat;
