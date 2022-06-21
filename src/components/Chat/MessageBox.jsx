import React from "react";

const MessageBox = () => {
  return (
    <div className="py-2 w-11/12 text-gray-300">
      <div className="">
        <input
          type="text"
          placeholder="Message Space Clone"
          className="w-full rounded-3xl border-[3px] outline-none	border-gray-300 text-slate-600	 py-3.5	pl-9 pr-36"
        />
      </div>
    </div>
  );
};

export default MessageBox;
