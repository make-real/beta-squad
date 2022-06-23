import React, { useState } from "react";

const Timeline = () => {
  return (
    <div className="bg-slate-50	h-full min-h-screen	p-8">
      <div className="bg-white p-1 flex justify-between">
        <div className="flex-1 border flex">
          <div className="pl-4 pr-8 py-2 text-sm  border border-red-300">
            <h5>Jun 2022</h5>
          </div>
          <div className="">
            <h2>hello</h2>
          </div>
          <div className=" border border-red-700">
            <h2>hello</h2>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <div>
            <h2>hello</h2>
          </div>
          <div>
            <h2>hello</h2>
          </div>
          <div>
            <h2>hello</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
