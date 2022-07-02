import React, { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import workIcon from "../../assets/images/makeReal.png";

const ManageWorkspace = () => {
  const [extraExpandBox, setExtraExpandBox] = useState(true);
  return (
    <div className="min-h-screen  w-[820px] p-5 space-y-4 h-screen">
      <div className="text-[#7088A1] text-lg font-bold flex ">
        <AiOutlineSetting className="my-auto mr-2" />
        <h6>Manage Workspaces</h6>
      </div>

      <div className="bg-white p-4">
        <div className="flex justify-end">
          <button className="py-2.5 text-white rounded-md px-6 text-sm bg-[#C595C6] ">
            Add a new workspace
          </button>
        </div>

        <div className="space-y-3.5">
          <h6 className="flex text-[#BAC4CF]">
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
            Active workspaces
          </h6>

          {extraExpandBox && (
            <div className="flex">
              <img
                src={workIcon}
                alt="workIcon"
                className="w-10 h-10 border rounded-md"
              />
              <h6 className="my-auto pl-2 text-sm text-gray-700">Make real</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageWorkspace;
