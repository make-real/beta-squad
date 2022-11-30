import { BsEmojiSmile } from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";
import { MdClose } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_messages } from "../../api/message";
import { addBulkMessage } from "../../store/slice/message";
import { populateUsers } from "../../util/helpers";
import images from "../../assets";
import { add_reaction, delete_message } from "../../api/message";

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
  console.log(msg);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const handleReact = async (emoji) => {
    try {
      setShowReactEmojis(false);
      await add_reaction(space, msg._id, emoji);
    } catch (error) {
      console.log(error);
    }
  };

  const reaction = msg.reactions.find(
    (r) => r?.reactor?._id === userId
  )?.reaction;

  const handleDelete = async () => {
    console.log(msg._id);
    try {
      await delete_message(space, msg._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex px-6 py-5 hover:bg-slate-100 relative user-box w-full ${
        msg.sender._id === userId ? "justify-end" : ""
      }`}>
      <div className='w-10 h-10 border-teal-400	border-4 rounded-full bg-slate-700 relative'>
        {msg.sender.avatar ? (
          <img src={msg?.sender?.avatar} alt='' className='rounded-full' />
        ) : (
          <h6 className='text-xs absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white'>
            {msg?.sender?.fullName.slice(0, 1)}
          </h6>
        )}
      </div>

      <div
        style={{
          maxWidth: forComment ? "400px" : "900px",
        }}
        className={`relative bg-slate-100 p-3 rounded-lg ml-3 shadow-md`}>
        <div className='flex justify-between text-xs text-sky-900	pb-2'>
          <h6 className='font-bold'>{msg?.sender?.fullName}</h6>
          <small className='text-neutral-600 ml-5'>
            {moment(msg.createdAt).fromNow()}
          </small>
        </div>

        {msg.replayOf && (
          <div className='mb-2 border-l-4 border-themeColor bg-slate-200 text-neutral-500 p-3 rounded-md mentioned-message-wrapper'>
            <RenderAttachment
              message={msg.replayOf}
              scrollToBottom={scrollToBottom}
            />
            <p
              className='text-sm text-gray-900'
              dangerouslySetInnerHTML={{
                __html: populateUsers(msg.replayOf.content),
              }}></p>
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
          className='text-sm text-gray-900'
          dangerouslySetInnerHTML={{
            __html: populateUsers(msg?.content),
          }}></p>
        {Boolean(msg?.reactions.length) && (
          <div className='absolute right-0 -bottom-4 flex bg-white border border-gray-200 text-gray-500 rounded-3xl py-1 px-2'>
            {msg?.reactions?.map((data, idx) => (
              <p key={idx} className='text-lg tooltip-box select-none'>
                {data?.reaction}
                <p className='tooltip-text select-none'>
                  {data.reactor.fullName}
                </p>
              </p>
            ))}
          </div>
        )}
      </div>

      <div className='absolute right-5 -top-3 flex bg-white border border-gray-500 text-gray-500 rounded-3xl py-1.5 px-2 msg-icons'>
        <div className='px-1.5 hover:text-teal-400 tooltip-box'>
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
          className='px-1.5 hover:text-teal-400 tooltip-box'>
          <VscCommentDiscussion />
          <p className='tooltip-text'>Respond to this message</p>
        </div>

        {msg.sender._id === userId && (
          <div className='px-1.5 hover:text-teal-400 tooltip-box'>
            <MdClose onClick={() => handleDelete(msg._id)} />
            <p className='tooltip-text'>Delete</p>
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
  console.log(messagesState);
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
        <div className='grid place-items-center h-[70vh] text-gray-700'>
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
