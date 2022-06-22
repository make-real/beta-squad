import React from "react";
import { ImAttachment } from "react-icons/im";
import { GoMention } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineGif } from "react-icons/ai";

const MessageBox = () => {
  return (
    <div className="py-3 w-11/12 text-gray-300">
      <div className="relative h-full">
        <input
          type="text"
          placeholder="Message Space Clone"
          className="w-full input-style rounded-3xl border-[3px] outline-none	border-gray-300 text-slate-600	 py-3.5	pl-9 pr-36"
        />
        <div className="text-gray-400 flex absolute right-2.5 bottom-1/2  translate-y-1/2">
          <div className="px-1.5 cursor-pointer duration-300  hover:text-teal-400">
            <ImAttachment />
          </div>
          <div className="px-1.5 cursor-pointer duration-300  hover:text-teal-400">
            <GoMention />
          </div>
          <div className="px-1.5 cursor-pointer duration-300  hover:text-teal-400">
            <BsEmojiSmile />
          </div>
          <div className="px-1.5 cursor-pointer duration-300  hover:text-teal-400">
            <AiOutlineGif />
          </div>
        </div>
        <div className="text-slate-400 absolute right-0 -bottom-[21px] text-sm	">
          <small className="text-gray-500">#bold*</small>
          <small className="px-1 italic">_italic_</small>
          <small>~strikethrough~</small>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
