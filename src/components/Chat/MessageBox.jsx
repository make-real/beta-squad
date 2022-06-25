import React, { useState } from "react";
import { ImAttachment } from "react-icons/im";
import { GoMention } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineGif } from "react-icons/ai";
import Picker from "emoji-picker-react";
import users from "../../constant/data2";

const MessageBox = () => {
  const [attachFile, setAttachFile] = useState(false);
  const [mentionModal, setMentionModal] = useState(false);
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const onEmojiClick = (e, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleAttach = () => {
    setAttachFile((prev) => !prev);
    setShowEmojis(false);
    setMentionModal(false);
  };
  const handleEmoji = () => {
    setAttachFile(false);
    setShowEmojis((prev) => !prev);
    setMentionModal(false);
  };
  const handleGif = () => {};

  return (
    <div className="py-3 w-11/12 text-gray-300 relative">
      <div className="relative h-full">
        <input
          type="text"
          placeholder="Message Space Clone"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full input-style rounded-3xl border-[3px] outline-none	border-gray-300 text-slate-600	 py-3.5	pl-9 pr-36"
        />
        <div className="text-gray-400 flex absolute right-2.5 bottom-1/2  translate-y-1/2">
          <div className="px-1.5 cursor-pointer relative">
            <ImAttachment
              className="duration-300  hover:text-teal-400 "
              onClick={() => handleAttach()}
            />
            {attachFile && (
              <div className="attach-box">
                <h6 className="duration-300  hover:text-teal-400">
                  From computer
                </h6>
                <h6 className="py-2 duration-300  hover:text-teal-400">
                  Google drive
                </h6>
                <h6 className="duration-300  hover:text-teal-400">Dropbox</h6>
              </div>
            )}
          </div>
          <div className="px-2 cursor-pointer relative">
            <GoMention
              className="duration-300  hover:text-teal-400"
              onClick={() => setMentionModal(!mentionModal)}
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
          <div className="px-2 cursor-pointer duration-300  hover:text-teal-400">
            <AiOutlineGif />
          </div>
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
