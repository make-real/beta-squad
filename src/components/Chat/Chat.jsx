import TextMessage from "./TextMessage";
import MessageBox from "./MessageBox";
import { useState } from "react";

const Chat = () => {
    const [messageToRespond, setMessageToRespond] = useState();
    return (
        <div className="w-full pb-10 mx-auto mt-[40px]">
            <div className={`bg-[#ECECEC] pb-5 rounded-lg`}>
                <div
                    style={{
                        height: `calc(100vh - ${
                            messageToRespond ? 245 : 145
                        }px)`,
                        // marginTop: "70px",
                    }}
                    className={`overflow-y-auto hide-scrollbar overflow-x-hidden border-b-[0.5px] pt-5 customScroll`}
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
        </div>
    );
};

export default Chat;
