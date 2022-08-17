import { ImAttachment } from "react-icons/im";
import { GoMention } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";
import Picker from "emoji-picker-react";
import users from "../../constant/users";
// import { AiOutlineGif } from "react-icons/ai";
// import GIF from "./GIF";
import { send_message } from "../../api/message";
import { useDispatch, useSelector } from "react-redux";
import { addSingleMessage } from "../../store/slice/message";

const MessageBox = () => {
  const [input, setInput] = useState("");
  const [mentionModal, setMentionModal] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const dispatch = useDispatch();

  // const [attachFile, setAttachFile] = useState(false);
  // const [showGif, setShowGif] = useState(false);

  const onEmojiClick = (e, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleAttach = () => {
    setShowEmojis(false);
    setMentionModal(false);
    // setShowGif(false);
    // setAttachFile((prev) => !prev);
  };

  const handleEmoji = () => {
    // setShowGif(false);
    // setAttachFile(false);
    setMentionModal(false);
    setShowEmojis((prev) => !prev);
  };

  const handleMention = () => {
    setShowEmojis(false);
    setMentionModal((prev) => !prev);
    // setAttachFile(false);
    // setShowGif(false);
  };

  // const handleGif = () => {
  //   setAttachFile(false);
  //   setShowEmojis(false);
  //   setMentionModal(false);
  //   setShowGif((prev) => !prev);
  // };

  const handleSendMessage = async () => {
    try {
      const text = String(input).trim();

      if (text === "") {
        return;
      }

      setInput("");

      await send_message(selectedSpaceId, {
        textMessage: text,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-3  text-gray-300 relative pb-5">
      <div className="relative h-full">
        <input
          type="text"
          placeholder="Message Space Clone"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
          className="w-full input-style rounded-3xl border-[3px] outline-none	border-gray-300 text-slate-600	 py-3.5	pl-9 pr-36"
        />
        <div className="text-gray-400 flex absolute right-2.5 bottom-1/2  translate-y-1/2">
          <label
            className="px-1.5 cursor-pointer relative"
            htmlFor="userInputFile"
            onClick={() => handleAttach()}
          >
            <ImAttachment
              className="duration-300  hover:text-teal-400 "
              onClick={() => handleAttach()}
            />

            <input type="file" id="userInputFile" className="hidden" />

            {/* {attachFile && (
              <div className="attach-box">
                <h6 className="duration-300  hover:text-teal-400">
                  From computer
                </h6>
                <h6 className="py-2 duration-300  hover:text-teal-400">
                  Google drive
                </h6>
                <h6 className="duration-300  hover:text-teal-400">Dropbox</h6>
              </div>
            )} */}
          </label>

          <div className="px-2 cursor-pointer relative">
            <GoMention
              className="duration-300  hover:text-teal-400"
              onClick={handleMention}
            />
          </div>
          <div className="px-2 cursor-pointer duration-300  hover:text-teal-400 relative">
            <BsEmojiSmile onClick={() => handleEmoji()} />
            {showEmojis && (
              <div className="absolute  right-0 bottom-8">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          {/* <div className="px-2  ">
            <AiOutlineGif
              className="duration-300 cursor-pointer hover:text-teal-400"
              onClick={handleGif}
            />
            {showGif && (
              <div className="absolute right-0 bottom-8 w-[600px] bg-white drop-shadow-xl p-2.5 h-[400px]">
                <GIF />
              </div>
            )}
          </div> */}
        </div>

        <div className="text-slate-400 absolute right-0 -bottom-[21px] text-sm	">
          <small className="text-gray-500">#bold*</small>
          <small className="px-1 italic">_italic_</small>
          <small>~strikethrough~</small>
        </div>
      </div>

      {mentionModal && (
        <div className="w-full border overflow-auto	 absolute left-0 bottom-[90px] bg-white z-50 rounded-xl p-1.5 h-[450px] shadow-lg shadow-gray-300	">
          <div className="py-2 px-3.5 rounded-lg text-gray-500 hover:bg-slate-50 hover:text-teal-500">
            <p>@channel Notifies everyone in space</p>
          </div>

          <div className="py-2 px-3.5 rounded-lg text-gray-500 hover:bg-slate-50 hover:text-teal-500">
            <p>@space Notifies everyone in space</p>
          </div>

          <div className="py-2 px-3.5 rounded-lg text-gray-500 hover:bg-slate-50 hover:text-teal-500">
            <p>@here Notifies everyone in space</p>
          </div>

          {users.map((item) => (
            <div
              className="flex py-2 px-3.5 rounded-lg text-gray-500 hover:bg-slate-50 hover:text-teal-500"
              key={item.id}
            >
              <div className="w-8 h-8 border-slate-700	border-4 rounded-full">
                <img src={item.img} alt="user" className="rounded-full" />
              </div>
              <h6 className="my-auto pl-2">{item.name}</h6>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageBox;
