import React from "react";
import haySpace from "../../assets/haySpace.png";
import user from "../../assets/user.jpg";

const TextMessage = () => {
  return (
    <div>
      <div className="flex py-3.5">
        <div className="w-7 h-7">
          <img src={haySpace} alt="logo" />
        </div>
        <p className="my-auto pl-3 text-gray-600">
          This is the beginning of conversation in space:{" "}
          <span className="text-zinc-900">Space Clone</span>
        </p>
      </div>
      <div className="border-b mb-4 relative border ">
        <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-48 p-1.5 text-xs text-gray-800 text-center rounded-2xl bg-white">
          Yesterday, June 21st
        </p>
      </div>

      <div className="flex py-2.5 hover:bg-slate-50">
        <div className="w-10 h-10 border-teal-400	border-4 rounded-full bg-slate-700 relative	">
          <h6 className="text-xs absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
            MA
          </h6>
        </div>
        <div className="pl-2 ">
          <h6 className="text-xs text-sky-900	pb-2">Mousumi Mitu</h6>
          <p className="text-sm text-gray-900		">Hi....Welcome to make real</p>
        </div>
      </div>

      <div className="flex py-2.5 hover:bg-slate-50">
        <div className="w-10 h-10 border-slate-700	border-4 rounded-full  relative	">
          <img src={user} alt="user" className="rounded-full" />
        </div>
        <div className="pl-2 ">
          <h6 className="text-xs text-sky-900	pb-2">Mitu Mousumi</h6>
          <p className="text-sm text-gray-900		">Hi....Welcome to make real</p>
        </div>
      </div>
    </div>
  );
};

export default TextMessage;
