import {
  BsArrow90DegRight,
  BsEmojiSmile,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";
import { MdClose, MdModeEditOutline } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_messages } from "../../api/message";
import { addBulkMessage } from "../../store/slice/message";
import { populateUsers, sliceText } from "../../util/helpers";
import images from "../../assets";

import moment from "moment";
import AudioInput from "./Audio/Render";

const TextMessage = ({ messageToRespond, setMessageToRespond }) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef();

  const messages = useSelector((state) => state.message.messages);
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

  useEffect(() => {
    if (Boolean(selectedSpaceId)) {
      const loadMessages = async () => {
        try {
          const { data } = await get_messages(selectedSpaceId);
          dispatch(addBulkMessage(data.messages.reverse()));

          console.log(data.messages);

          scrollToBottom();
        } catch (error) {
          alert(error.message);
        }
      };

      loadMessages();
    }
  }, [selectedSpaceId, dispatch]);

  useEffect(() => {
    scrollToBottom();
    console.log(messageToRespond);
  }, [messages, messageToRespond]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div
      className={`overflow-auto mt-3 h-[calc(100vh-${
        messageToRespond ? "250px" : "150px"
      })] overflow-x-hidden px-5 pt-5 customScroll`}
    >
      {messages.length ? (
        messages.map((msg, idx) => (
          <div
            key={idx}
            className="flex py-2.5 hover:bg-slate-50 relative user-box"
          >
            <div className="w-10 h-10 border-teal-400	border-4 rounded-full bg-slate-700 relative	">
              <h6 className="text-xs absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
                {msg?.sender?.fullName.slice(0, 1)}
              </h6>
            </div>
            <div className="bg-slate-100 p-3 rounded-lg ml-3 shadow-md max-w-[900px]">
              <div className="flex justify-between text-xs text-sky-900	pb-2">
                <h6 className="font-bold">{msg?.sender?.fullName}</h6>
                <small className="text-neutral-600 ml-5">
                  {moment(msg.createdAt).fromNow()}
                </small>
              </div>

              {msg.replayOf && (
                <div className="mb-2 border-l-4 border-themeColor bg-slate-200 text-neutral-500 p-3 rounded-md">
                  <p className="text-bold text-themeColor text-sm mb-1">
                    {msg.replayOf.sender?.fullName}
                  </p>
                  <p className="text-sm">
                    {msg.replayOf.content.text
                      ? sliceText(msg.replayOf.content?.text, 100)
                      : "Attachment"}
                  </p>
                </div>
              )}

              {msg?.content?.attachments?.map((src, idx) => {
                const extension = src.match(/\.([^\./\?]+)($|\?)/)[1];

                if (
                  ["png", "jpeg", "jpg", "ttif", "gif", "webp", "svg"].includes(
                    extension
                  )
                ) {
                  return (
                    <img
                      onLoad={scrollToBottom}
                      key={idx}
                      src={src}
                      alt="Image"
                      className="max-w-[500px] mb-2"
                    />
                  );
                } else if (extension === "wav") {
                  return (
                    <div>
                      <AudioInput url={src} />
                    </div>
                  );
                } else {
                  return (
                    <div className="mb-2">
                      <a
                        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        target="_blank"
                        href={src}
                      >
                        {src}
                      </a>
                    </div>
                  );
                }
              })}
              <p
                className="text-sm text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: populateUsers(msg?.content),
                }}
              ></p>
            </div>
            <div className="absolute right-0 -top-3 flex bg-white border border-gray-500 text-gray-500 rounded-3xl py-1.5 px-2 msg-icons">
              <div className="px-1 hover:text-teal-400 tooltip-box">
                <BsArrow90DegRight />
                <p className="tooltip-text">Convert the task</p>
              </div>
              <div className="px-1.5 hover:text-teal-400 tooltip-box">
                <BsEmojiSmile />
                <p className="tooltip-text">Add a reaction</p>
              </div>
              <div
                onClick={() => setMessageToRespond(msg)}
                className="px-1.5 hover:text-teal-400 tooltip-box"
              >
                <VscCommentDiscussion />
                <p className="tooltip-text">Respond to this message</p>
              </div>
              <div className="px-1.5 hover:text-teal-400 tooltip-box">
                <MdModeEditOutline />
                <p className="tooltip-text">Edit message</p>
              </div>
              <div className="px-1.5 hover:text-teal-400 tooltip-box">
                <MdClose />
                <p className="tooltip-text">Delete</p>
              </div>
              <div className="px-1 hover:text-teal-400 tooltip-box">
                <BsThreeDotsVertical />
                <p className="tooltip-text">Add as a quote</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="grid place-items-center h-[70vh] text-gray-700">
          <div className="text-center space-y-3">
            <img src={images.chattingStart} alt="" className="w-36 mx-auto" />
            <h2 className="text-2xl font-bold">What a quiet team!</h2>
            <p>
              Don’t be shy, send a message to your team and <br /> fill this
              empty space.
            </p>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default TextMessage;
