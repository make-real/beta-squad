import { BsEmojiSmile } from "react-icons/bs";
import { RiArrowGoForwardLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_messages } from "../../api/message";
import {
  addBulkMessage,
  addReaction,
  addSingleMessage,
} from "../../store/slice/message";
import { populateUsers, sentLocalNotification } from "../../util/helpers";
import images from "../../assets";
import { add_reaction, delete_message } from "../../api/message";
import PencilIcon from "../../assets/pencil.svg";
import DeleteIcon from "../../assets/delete.svg";
import tickIcon from "../../assets/images/tick-square.svg";

import moment from "moment";
import AudioInput from "./Audio/Render";


const Message = ({
  space,
  msg,
  scrollToBottom,
  setMessageToRespond,
  forComment,
}) => {
  const [showReactEmojis, setShowReactEmojis] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const handleReact = async (emoji) => {
    try {
      setShowReactEmojis(false);
      await add_reaction(space, msg._id, emoji);
    } catch (error) {
      console.log(error);
    }
  };
  const reaction = msg?.reactions?.find(
    (r) => r?.reactor?._id === userId
  )?.reaction;

  const handleDelete = async () => {
    try {
      await delete_message(space, msg._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{}}
      className={`flex items-center ${
        msg?.sender?._id === userId ? "flex-row-reverse self-end" : ""
      } pl-6 pr-8 py-1.5 relative  user-box ${
        msg?.reactions.length ? "mb-4" : ""
      }
      `}
    >
     

      <div
        style={{
          maxWidth: forComment ? "400px" : "900px",
        }}
        className={`relative ${
          msg?.sender?._id === userId
            ? "bg-[#fff]"
            : "bg-[#fff] text-[#7C04EC] mr-3"
        }  p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg ml-3`}
      >
        <div
          className={`flex flex-row justify-between text-xs pb-2 ${
            msg?.sender?._id === userId
              ? "text-[#ACB0B6] border-b border-white flex-row-reverse"
              : "text-[#031124] border-b border-white"
          }`}
        >
          <h6
            className={` text-[12px] leading-[15px] font-medium text-[#7C04EC] ${
              msg?.sender?._id === userId ? "hidden" : ""
            }`}
          >
            {msg?.sender?.fullName}
          </h6>
        </div>

        {msg?.replayOf && (
          <div className="mb-2 border-l-4 pl-3  border-blue-500 bg-white text-neutral-500 p-3 rounded-md mentioned-message-wrapper">
            <RenderAttachment
              message={msg.replayOf}
              scrollToBottom={scrollToBottom}
            />
            <span
              className={`${
                msg?.sender?._id === userId
                  ? "text-[#031124]"
                  : "text-[#031124]"
              }`}
            >
              <p
                className={`text-sm font-inter block`}
                dangerouslySetInnerHTML={{
                  __html: populateUsers(msg.replayOf.content),
                }}
              ></p>
            </span>
          </div>
        )}
        {msg.content.voice ? (
          <RenderVoice message={msg} scrollToBottom={scrollToBottom} />
        ) : (
          <RenderAttachment
            message={msg}
            scrollToBottom={scrollToBottom}
            small={forComment}
          />
        )}
        <p
          className={`text-sm font-light  ${
            msg?.sender?._id === userId ? "text-[#031124]" : "text-[#031124]"
          }`}
          dangerouslySetInnerHTML={{
            __html: populateUsers(msg?.content),
          }}
        ></p>

        <small
          className={`flex items-center  justify-end mb-0 gap-2 ${
            msg?.seenBy?.length > 0
              ? "text-[#ACB0B6] font-[400]  "
              : " text-[#ACB0B6]  font-[400] "
          }`}
        >
          {moment(msg?.createdAt).format('LT')}
          {msg?.seenBy?.length > 0 ?  <AiFillCheckCircle size={16} color="#2cd163"/>:  <AiFillCheckCircle size={16} /> }
        </small>

        {msg?.sendingFailed && (
          <h1 className="text-red-500">Sending Failed!</h1>
        )}

        {Boolean(msg?.reactions.length) && (
          <div className="absolute left-4 -bottom-[15px]  flex bg-white border border-gray-200 text-gray-500  rounded-[14px] py-1 px-4">
            {msg?.reactions?.map((data, idx) => (
              <p
                key={idx}
                className="text-[12px] font-inter font-normal tooltip-box select-none"
              >
                {data?.reaction}
                <p className="tooltip-text select-none">
                  {data?.reactor?.fullName}
                </p>
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-row-reverse h-fit text-gray-500 rounded-3xl py-1.5 msg-icons">
        <div className="px-1 hover:text-blue-500 tooltip-box cursor-pointer">
          <BsEmojiSmile onClick={() => setShowReactEmojis(!showReactEmojis)} />
          <p className="tooltip-text select-none">Add a reaction</p>

          {showReactEmojis && (
            <div className="z-20 absolute top-9 right-[-4px] flex gap-2 items-center p-1 bg-gray-300 rounded-md after:content-[''] after:absolute after:top-[-5px] after:right-2 after:w-5 after:h-5 after:bg-gray-300 after:rotate-45 after:-z-10 ">
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "👍" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("👍")}
              >
                👍
              </p>
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "😊" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("😊")}
              >
                😊
              </p>
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "👎" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("👎")}
              >
                👎
              </p>
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "😎" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("😎")}
              >
                😎
              </p>
            </div>
          )}
        </div>
        <div
          onClick={() => setMessageToRespond(msg)}
          className="px-[2px] hover:text-blue-500 tooltip-box cursor-pointer"
        >
          <RiArrowGoForwardLine />
          <p className="tooltip-text">Reply to this message</p>
        </div>

        {msg?.sender?._id === userId && (
          <div className="px-[2px] hover:text-blue-500 tooltip-box group cursor-pointer">
            <BiDotsVerticalRounded
              className="text-[18px]"
              onClick={handleDelete}
            />

            <div className="group-hover:scale-100 scale-0 origin-top-right transition-transform absolute  top-[20px] bg-white normal-shadow rounded-[10px] flex flex-col z-20 text-sm">
              {/* <div className='flex items-center gap-[15px] px-5 w-32 py-[10px] hover:bg-[#FEB45E10] cursor-pointer'>
                <img src={PencilIcon} alt="" className='w-4 h-auto' />
                <p className='font-semibold text-[#031124]'>Edit</p>
              </div> */}
              <div
                onClick={handleDelete}
                className="flex items-center gap-[15px] px-5 w-32 py-[17px] hover:bg-[#FB397F10] cursor-pointer"
              >
                <img src={DeleteIcon} alt="" className="w-4 h-auto" />
                <p className="font-semibold text-[#031124]">Delete</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RenderAttachment = ({ message, scrollToBottom, small }) => {
  try {
    return message?.content?.attachments?.map((src, idx) => {
      const extension = src.match(/\.([^\./\?]+)($|\?)/)[1];

      if (
        ["png", "jpeg", "jpg", "ttif", "gif", "webp", "svg"].includes(extension)
      ) {
        return (
          <div className="flex justify-center items-center gap-3">
            {message?.content?.attachments?.length >= 2 ? (
              <span className="flex justify-between gap-3 items-center">
                <img
                  onLoad={scrollToBottom}
                  key={idx}
                  src={src}
                  alt=""
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />
              </span>
            ) : (
              <img
                onLoad={scrollToBottom}
                key={idx}
                src={src}
                alt=""
                style={{
                  maxWidth: small ? "150px" : "200px",
                  marginBottom: "10px",
                }}
              />
            )}
          </div>
        );
      } else {
        return (
          <div className="mb-2">
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              target="_blank"
              rel="noreferrer"
              href={src}
            >
              {src}
            </a>
          </div>
        );
      }
    });
  } catch (error) {
    return <></>;
  }
};

const RenderVoice = ({ message, scrollToBottom }) => {
  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div>
      <AudioInput url={message?.content?.voice} />
    </div>
  );
};

const TextMessage = ({
  messageToRespond,
  setMessageToRespond,
  forComment,
  comments,
}) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef();

  const messagesState = useSelector((state) => state.message.messages);
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const socket = useSelector((state) => state.global.socket);

  const messages = forComment ? comments : messagesState;
  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    socket?.on("NEW_SPACE_MESSAGE_RECEIVED", (msg) => {

      if (msg.to === selectedSpaceId) {
        if (userId === msg?.sender?._id && Boolean(msg?.content?.text)) return;

        dispatch(addSingleMessage(msg));
      } else {
        sentLocalNotification("New message received.");
      }
    });

    socket?.on("NEW_REACTION_RECEIVED", (data) => {
      dispatch(addReaction(data));
    });

    return () => {
      socket?.off("NEW_SPACE_MESSAGE_RECEIVED");
      socket?.off("NEW_REACTION_RECEIVED");
    };
  }, [dispatch, selectedSpaceId, socket, userId]);

  useEffect(() => {
    if (Boolean(selectedSpaceId)) {
      const loadMessages = async () => {
        try {
          const { data } = await get_messages(selectedSpaceId);
          dispatch(addBulkMessage(data.messages.reverse()));
          scrollToBottom();
        } catch (error) {
         
          // alert(error.message);
        }
      };
      // const interval = setInterval(() => {
      //   loadMessages();
      // }, 500);
  
      // return () => clearInterval(interval);
     
    }
  }, [selectedSpaceId, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, messageToRespond]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {messages.length ? (
        messages.map((msg, idx) => (
          <Message
            space={selectedSpaceId}
            msg={msg}
            scrollToBottom={scrollToBottom}
            key={idx}
            setMessageToRespond={setMessageToRespond}
            forComment={forComment}
          />
        ))
      ) : forComment ? null : (
        <div className="grid place-items-center h-[60vh] text-gray-700">
          <div className="text-center space-y-3">
            <img src={images.chattingStart} alt="" className="w-28 mx-auto" />
            <h2 className="text-lg font-bold">What a quiet team!</h2>
            <p className="px-2 text-sm">
              Don’t be shy, send a message to your team and  fill this
              empty space.
            </p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </>
  );
};

export default TextMessage;
