import { useStyleContext } from "../../../context/StyleContext";
import TextMessage from "../TextMessage";
import MessageBox from "../MessageBox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_single_messages, send_single_message } from "../../../api/chat";
import { useSelector } from "react-redux";

const SingleChat = () => {
  const { margin } = useStyleContext();
  const { participantID } = useParams();
  const { selectedWorkspace } = useSelector((state) => state.workspace);
  const [messageToRespond, setMessageToRespond] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, [participantID]);

  const getMessages = async () => {
    try {
      const { data } = await get_single_messages(selectedWorkspace, participantID);

      setMessages(data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  const userSelectedWorkSpaceId = useSelector((state) => state.workspace.selectedWorkspace);

  const sendMessage = async () => {
    try {
      await send_single_message(userSelectedWorkSpaceId, {
        sendTo: participantID,
        textMessage: "Hello World",
      });
    } catch (error) {}
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
        <code>
          <pre>{JSON.stringify(messages, null, 4)}</pre>
        </code>
      </div>

      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default SingleChat;
