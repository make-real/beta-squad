import TextMessage from "./TextMessage";
import MessageBox from "./MessageBox";
import { useState } from "react";
import AIMessageBox from "../AI/AIMessageBox";

const Chat = ({ selectedSpace,members,listId ,reload,setReload}) => {
  const [messageToRespond, setMessageToRespond] = useState();
  const [msg, setMsg] = useState([]);
  return (
    // <div className="w-full pb-10 mx-auto mt-[40px] h-full">
    <>
      {selectedSpace ? (
        <AIMessageBox reload={reload} setReload={setReload} setMsg={setMsg} listId={listId} members={members} selectedSpace={selectedSpace} />
      ) : (
        <div
          style={{
            height: "97%",
          }}
          className={`border w-full  border-[#ECECEC] pb-3 rounded-lg custom-shadow   flex flex-col bg-[#F5F5F5]`}
        >
          <div
            style={
              {
                // height: `calc(100vh - ${
                //     messageToRespond ? 245 : 145
                // }px)`,
                // marginTop: "70px",
              }
            }
            className={`overflow-y-auto hide-scrollbar  overflow-x-hidden border-b-[0.5px] pt-5 customScroll flex-1 ${
              messageToRespond ? "h-[calc(100%-245px)]" : "h-[calc(100%-145px)]"
            }
                    `}
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
        </div>
      )}
    </>
  );
};

export default Chat;
