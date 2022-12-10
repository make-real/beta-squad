import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_single_messages } from "../../../api/chat";
import { useSelector } from "react-redux";
import { addBulkMessagePrivate } from "../../../store/slice/privateChat";
import { useDispatch } from "react-redux";
import PrivateTextMessage from "../PrivateTextMessage";
import PrivateMessageBox from "../PrivateMessageBox";

const SingleChat = () => {
  const { participantID } = useParams();
  const [messageToRespond, setMessageToRespond] = useState();
  const dispatch = useDispatch();

<<<<<<< HEAD
  console.log(messageToRespond);
  console.log(selectedWorkspace);
=======
  const { selectedWorkspace } = useSelector((state) => state.workspace);
>>>>>>> b83c5b86ffe8a46b50f3fe9524e247b542ee6469

  useEffect(() => {
    getMessages();
  }, [participantID, selectedWorkspace]);

  const getMessages = async () => {
    try {
      console.log("Sending...");
      const { data } = await get_single_messages(selectedWorkspace, participantID);

      console.log(data.message);

      dispatch(addBulkMessagePrivate(data.messages.reverse()));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[80%] pb-10 mx-auto">
      <div className={`bg-[#ECECEC] pb-5 rounded-lg`}>
        <div
          style={{
            height: `calc(100vh - ${messageToRespond ? 245 : 145}px)`,
            marginTop: "70px",
          }}
          className={`overflow-y-auto hide-scrollbar overflow-x-hidden border-b-[0.5px] pt-5 customScroll`}
        >
          <PrivateTextMessage messageToRespond={messageToRespond} setMessageToRespond={setMessageToRespond} />
        </div>
        <PrivateMessageBox messageToRespond={messageToRespond} setMessageToRespond={setMessageToRespond} />
      </div>
    </div>
  );
};

export default SingleChat;
