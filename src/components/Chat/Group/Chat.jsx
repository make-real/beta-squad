import { useStyleContext } from "../../../context/StyleContext";
import TextMessage from "../TextMessage";
import MessageBox from "../MessageBox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_single_messages } from "../../../api/chat";
import { useSelector } from "react-redux";

const GroupChat = () => {
  const { margin } = useStyleContext();
  const [messageToRespond, setMessageToRespond] = useState();

  return (
    <div className={`${margin ? "ml-[325px]" : "ml-[50px]"} `}>
      <div
        style={{
          height: `calc(100vh - ${messageToRespond ? 245 : 145}px)`,
          marginTop: "70px",
        }}
        className={`overflow-y-auto overflow-x-hidden bg-white border-b-[0.5px] border-slate-500 pt-5 customScroll`}
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

export default GroupChat;
