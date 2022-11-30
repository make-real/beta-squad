import { useStyleContext } from "../../../context/StyleContext";
import TextMessage from "../TextMessage";
import MessageBox from "../MessageBox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_single_messages, send_single_message } from "../../../api/chat";
import { useSelector } from "react-redux";
import {
  addBulkMessagePrivate,
  addSingleMessagePrivate,
} from "../../../store/slice/privateChat";
import { useDispatch } from "react-redux";
import PrivateTextMessage from "../PrivateTextMessage";

const SingleChat = () => {
  const { margin } = useStyleContext();
  const { participantID } = useParams();
  const { selectedWorkspace } = useSelector((state) => state.workspace);
  const [messageToRespond, setMessageToRespond] = useState();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getMessages();
  }, [participantID]);

  const getMessages = async () => {
    try {
      const { data } = await get_single_messages(
        selectedWorkspace,
        participantID
      );

      dispatch(addBulkMessagePrivate(data.messages.reverse()));
    } catch (error) {
      console.log(error);
    }
  };

  const userSelectedWorkSpaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );

  const sendMessage = async () => {
    try {
      const { data } = await send_single_message(userSelectedWorkSpaceId, {
        sendTo: participantID,
        textMessage: "lorem ipsum dollar sit amet",
      });
      console.log(data);
      dispatch(addSingleMessagePrivate(data.message));
    } catch (error) {}
  };

  return (
    <div className={`${margin ? "ml-[325px]" : "ml-[50px]"}`}>
      <div
        style={{
          height: `calc(100vh - ${messageToRespond ? 245 : 145}px)`,
          marginTop: "70px",
        }}
        className={`overflow-y-auto overflow-x-hidden bg-white border-b-[0.5px] border-slate-500 pt-5 customScroll`}>
        <PrivateTextMessage />
      </div>

      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default SingleChat;
