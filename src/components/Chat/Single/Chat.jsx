import { useStyleContext } from "../../../context/StyleContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_single_messages } from "../../../api/chat";
import { useSelector } from "react-redux";
import { addBulkMessagePrivate } from "../../../store/slice/privateChat";
import { useDispatch } from "react-redux";
import PrivateTextMessage from "../PrivateTextMessage";
import PrivateMessageBox from "../PrivateMessageBox";

const SingleChat = () => {
  const { margin } = useStyleContext();
  const { participantID } = useParams();
  const { selectedWorkspace } = useSelector((state) => state.workspace);
  const [messageToRespond, setMessageToRespond] = useState();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  console.log(messageToRespond);
  console.log(selectedWorkspace);

  useEffect(() => {
    getMessages();
  }, [participantID, selectedWorkspace]);

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

  // const userSelectedWorkSpaceId = useSelector(
  //   (state) => state.workspace.selectedWorkspace
  // );

  // const sendMessage = async () => {
  //   try {
  //     const { data } = await send_single_message(userSelectedWorkSpaceId, {
  //       sendTo: participantID,
  //       textMessage: "Hello World",
  //     });
  //     console.log(data);
  //     dispatch(addSingleMessagePrivate(data.message));
  //   } catch (error) {}
  // };

  return (
    <div className='w-[80%] pb-10 mx-auto'>
      <div className={`bg-[#ECECEC] pb-5 rounded-lg`}>
        <div
          style={{
            height: `calc(100vh - ${messageToRespond ? 245 : 145}px)`,
            marginTop: "70px",
          }}
          className={`overflow-y-auto hide-scrollbar overflow-x-hidden border-b-[0.5px] pt-5 customScroll`}>
          <PrivateTextMessage
            messageToRespond={messageToRespond}
            setMessageToRespond={setMessageToRespond}
          />
        </div>
        <PrivateMessageBox
          messageToRespond={messageToRespond}
          setMessageToRespond={setMessageToRespond}
        />
      </div>
    </div>
  );
};

export default SingleChat;
