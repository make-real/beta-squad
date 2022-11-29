import { useStyleContext } from "../../../context/StyleContext";
import TextMessage from "../TextMessage";
import MessageBox from "../MessageBox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_single_messages } from "../../../api/chat";
import { useSelector } from "react-redux";

const SingleChat = () => {
  const { margin } = useStyleContext();
  const { id } = useParams();
  const { selectedWorkspace } = useSelector((state) => state.workspace);
  const [messageToRespond, setMessageToRespond] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, [id]);

  const getMessages = async () => {
    try {
      const { data } = get_single_messages(selectedWorkspace, id);
      setMessages(data.messages);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`${margin ? "ml-[325px]" : "ml-[50px]"}`}>
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

export default SingleChat;
