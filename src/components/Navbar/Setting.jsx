import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineCheck, AiOutlineInfoCircle } from "react-icons/ai";
const Setting = () => {
  const [expandBox, setExpandBox] = useState(true);
  const [extraExpandBox, setExtraExpandBox] = useState(true);
  return (
    <section className="p-2 ">
      <div className="flex text-teal-600 text-sm">
        <FiSettings className="my-auto" />{" "}
        <span className="my-auto pl-2">Setting</span>
      </div>

      <p className="text-sm text-gray-400 p-3">
        Note that only Space manager can fully modify space settings.
      </p>

      <div className="mt-2 bg-white p-3.5 rounded-md">
        <div className="flex justify-between text-gray-600">
          <div className="flex text-gray-700">
            <AiOutlineInfoCircle className="my-auto" />
            <h6 className="pl-3"> Details</h6>
          </div>

          <div className="p-1 cursor-pointer hover:bg-slate-100 rounded-md hover:text-red-900 text-gray-400">
            {expandBox ? (
              <IoIosArrowUp
                className="my-auto"
                onClick={() => setExpandBox(false)}
              />
            ) : (
              <IoIosArrowDown
                className="my-auto"
                onClick={() => setExpandBox(true)}
              />
            )}
          </div>
        </div>

        <form className=" py-3">
          <div className="pb-3">
            <label className="pb-1.5 text-gray-700">Space Name</label>
            <input
              type="text"
              placeholder="Space clone"
              className="border w-full bg-slate-100 rounded-md p-1"
            />
          </div>

          <div>
            <label className="pb-1.5 text-gray-700">Purpose</label>
            <textarea
              name=""
              id=""
              rows="3"
              className="border w-full bg-slate-100 rounded-md p-1"
            ></textarea>
          </div>
        </form>

        <div className="">
          <h6 className="pb-1">Color</h6>

          <div className="grid grid-rows-2 grid-cols-5 gap-4 mx-2">
            <div className="w-7 h-7 border rounded-full bg-blue-300 "></div>
            <div className="w-7 h-7 border rounded-full bg-teal-300 scale-150 relative">
              <AiOutlineCheck className="text-white absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 " />
            </div>
            <div className="w-7 h-7 border rounded-full bg-yellow-300"></div>
            <div className="w-7 h-7 border rounded-full bg-red-300"></div>
            <div className="w-7 h-7 border rounded-full bg-pink-300"></div>
            <div className="w-7 h-7 border rounded-full bg-green-300"></div>
            <div className="w-7 h-7 border rounded-full bg-purple-300"></div>
            <div className="w-7 h-7 border rounded-full bg-orange-300"></div>
          </div>
        </div>
      </div>

      <div className="my-5 mb-[100px] bg-white p-3.5 rounded-md">
        <div className="flex justify-between text-gray-600">
          <div className="flex text-gray-700">
            <AiOutlineInfoCircle className="my-auto" />
            <h6 className="pl-3"> Follow Board</h6>
          </div>
          <div className="p-1 cursor-pointer hover:bg-slate-100 rounded-md hover:text-red-900 text-gray-400">
            {extraExpandBox ? (
              <IoIosArrowUp
                className="my-auto"
                onClick={() => setExtraExpandBox(false)}
              />
            ) : (
              <IoIosArrowDown
                className="my-auto"
                onClick={() => setExtraExpandBox(true)}
              />
            )}
          </div>
        </div>

        {extraExpandBox && (
          <div>
            <div className=" my-4 py-2">
              <div className=" flex">
                <label class="switch relative inline-block w-[30px] h-[10px] 	my-3">
                  <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0 toggle-checkbox"
                    checked
                  />
                  <span class="slider round absolute cursor-pointer top-0 right-0 left-0 bottom-0 rounded-[4px] "></span>
                </label>

                <h6 className="my-auto pl-3 text-xs text-gray-400">
                  Enabled for all spaces
                </h6>
              </div>

              <p className="text-sm text-gray-400">
                Receive notifications when people make important changes to any
                task in this space
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Setting;
