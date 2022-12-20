import { BsEmojiSmile } from "react-icons/bs";
import { RiArrowGoForwardLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import PencilIcon from "../../assets/pencil.svg";
import DeleteIcon from "../../assets/delete.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_messages } from "../../api/message";
import { addBulkMessage } from "../../store/slice/message";
import { populateUsers } from "../../util/helpers";
import images from "../../assets";
import tickIcon from "../../assets/images/tick-square.svg";
import { add_reaction, delete_message } from "../../api/chat";

import moment from "moment";
import AudioInput from "./Audio/Render";
import { addSingleMessagePrivate } from "../../store/slice/privateChat";
import { useParams } from "react-router-dom";

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

  const reaction = msg.reactions?.find(
    (r) => r?.reactor?._id === userId
  )?.reaction;

  const handleDelete = async () => {
    try {
      await delete_message(space, msg._id);
    } catch (error) {
      console.log(error);
    }
  };

  const { participantID } = useParams();

  return (
    <div
      className={`flex ${
        msg?.sender?._id === userId ? "flex-row-reverse self-end" : ""
      } pl-6 pr-8 py-5 relative user-box
      `}>
      {/* <div
                className={`w-10 h-10	border-4 rounded-full bg-slate-700 relative -mr-10 mt-1 z-[100]  ${
                    msg?.sender?._id === userId
                        ? "-ml-6 border-[#6576FF]"
                        : "border-white"
                }`}
            >
                {msg?.sender?.avatar ? (
                    <img
                        src={msg?.sender?.avatar}
                        alt=""
                        className="rounded-full"
                    />
                ) : (
                    <h6 className="text-xs absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
                        {msg?.sender?.fullName.slice(0, 1)}
                    </h6>
                )}
            </div> */}

      <div
        style={{
          maxWidth: forComment ? "400px" : "900px",
        }}
        className={`relative ${
          msg?.sender?._id === userId
            ? "bg-slate-100 "
            : "bg-[#F5F5F5] text-[#7C04EC]"
        }  p-3 rounded-lg ml-3 shadow-md`}>
        <div
          className={`flex flex-row justify-between text-xs pb-2 ${
            msg?.sender?._id === userId
              ? "text-[#ACB0B6] border-b border-white flex-row-reverse"
              : "text-[#031124] border-b border-white"
          }`}>
          <h6
            className={`font-bold text-[#7C04EC] ${
              msg?.sender?._id === userId ? "hidden" : ""
            }`}>
            {msg?.sender?.fullName}
          </h6>
          <small
            className={`flex flex-row-reverse gap-2 ${
              msg?.sender?._id === userId
                ? "text-[#ACB0B6] font-[400]"
                : "ml-5 text-[#ACB0B6] font-[400]"
            }`}>
            {moment(msg?.createdAt).fromNow()}{" "}
            {msg?.sender?._id === userId ? (
              <img src={tickIcon} alt='' />
            ) : (
              <img src={images.clockIcon} alt='' />
            )}
          </small>
        </div>

        {msg.replayOf && (
          <div className='mb-2 border-l-4 pl-3  bg-slate-200 text-neutral-500 p-3 rounded-md mentioned-message-wrapper'>
            <RenderAttachment
              message={msg.replayOf}
              scrollToBottom={scrollToBottom}
            />
            <span
              className={`${
                msg?.sender?._id === userId ? "text-white" : "text-[#031124]"
              }`}>
              <p
                className={`text-sm block`}
                dangerouslySetInnerHTML={{
                  __html: populateUsers(msg.replayOf.content),
                }}></p>
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
          className={`text-sm ${
            msg?.sender?._id === userId ? "text-[#031124]" : "text-[#031124]"
          }`}
          dangerouslySetInnerHTML={{
            __html: populateUsers(msg?.content),
          }}></p>
        {Boolean(msg?.reactions.length) && (
          <div className='absolute right-0 -bottom-4 flex bg-white border border-gray-200 text-gray-500 rounded-3xl py-1 px-2'>
            {msg?.reactions?.map((data, idx) => (
              <p key={idx} className='text-lg tooltip-box select-none'>
                {data?.reaction}
                <p className='tooltip-text select-none'>
                  {data?.reactor?.fullName}
                </p>
              </p>
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-row-reverse h-fit text-gray-500 rounded-3xl py-1.5 px-2 msg-icons'>
        <div className='px-1.5 hover:text-blue-500 tooltip-box cursor-pointer'>
          <BsEmojiSmile onClick={() => setShowReactEmojis(!showReactEmojis)} />
          <p className='tooltip-text select-none'>Add a reaction</p>

          {showReactEmojis && (
            <div className="z-20 absolute top-9 right-[-4px] flex gap-2 items-center p-1 bg-gray-300 rounded-md after:content-[''] after:absolute after:top-[-5px] after:right-2 after:w-5 after:h-5 after:bg-gray-300 after:rotate-45 after:-z-10 ">
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "👍" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("👍")}>
                👍
              </p>
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "😊" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("😊")}>
                😊
              </p>
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "👎" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("👎")}>
                👎
              </p>
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "😎" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("😎")}>
                😎
              </p>
            </div>
          )}
        </div>
        <div
          onClick={() => setMessageToRespond(msg)}
          className='px-1.5 hover:text-blue-500 tooltip-box cursor-pointer'>
          <RiArrowGoForwardLine />
          <p className='tooltip-text'>Respond to this message</p>
        </div>

        {msg?.sender?._id === userId && (
          <div className='px-1.5 hover:text-blue-500 tooltip-box group cursor-pointer'>
            <BiDotsVerticalRounded
              className='text-[18px]'
              onClick={handleDelete}
            />

            <div className='group-hover:scale-100 scale-0 origin-top-right transition-transform absolute right-[30%] top-[20px] bg-white normal-shadow rounded-[10px] flex flex-col z-20 text-sm'>
              <div className='flex items-center gap-[15px] px-5 w-32 py-[10px] hover:bg-[#FEB45E10] cursor-pointer'>
                <img src={PencilIcon} className='w-4 h-auto' />
                <p className='font-semibold text-[#031124]'>Edit</p>
              </div>
              <div
                onClick={handleDelete}
                className='flex items-center gap-[15px] px-5 w-32 py-[17px] hover:bg-[#FB397F10] cursor-pointer'>
                <img src={DeleteIcon} className='w-4 h-auto' />
                <p className='font-semibold text-[#031124]'>Delete</p>
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
    message?.content?.attachments?.map((src, idx) => {
      const extension = src.match(/\.([^\./\?]+)($|\?)/)[1];
      console.log(src);

      if (
        ["png", "jpeg", "jpg", "ttif", "gif", "webp", "svg"].includes(extension)
      ) {
        return (
          <img
            onLoad={scrollToBottom}
            key={idx}
            src={src}
            alt=''
            style={{
              maxWidth: small ? "150px" : "200px",
              marginBottom: "10px",
            }}
          />
        );
      } else {
        return (
          <div className='mb-2'>
            <a
              className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'
              target='_blank'
              rel='noreferrer'
              href={src}>
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

const PrivateTextMessage = ({
  messageToRespond,
  setMessageToRespond,
  forComment,
  comments,
}) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef();

  const messagesState = useSelector((state) => state.privateChat.messages);
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

  const messages = forComment ? comments : messagesState;

  useEffect(() => {
    if (Boolean(selectedSpaceId)) {
      const loadMessages = async () => {
        try {
          const { data } = await get_messages(selectedSpaceId);
          dispatch(addBulkMessage(data.messages.reverse()));
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
  }, [messages, messageToRespond]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const socket = useSelector((state) => state.socket.socket);

  const { participantID } = useParams();

  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    socket?.on("NEW_CHAT_MESSAGE_RECEIVED", (msg) => {
      if (msg?.sender?._id === participantID || msg?.sender?._id === userId) {
        dispatch(addSingleMessagePrivate(msg));
      }
    });

    return () => {
      console.log("clearing...");

      socket?.off("NEW_CHAT_MESSAGE_RECEIVED");
    };
  }, [socket, participantID]);

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
        <div className='grid place-items-center h-[60vh] text-gray-700'>
          <div className='text-center space-y-3'>
            <img src={images.chattingStart} alt='' className='w-36 mx-auto' />
            <h2 className='text-2xl font-bold'>What a quiet team!</h2>
            <p>
              Don’t be shy, send a message to your team and <br /> fill this
              empty space.
            </p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </>
  );
};

export default PrivateTextMessage;
