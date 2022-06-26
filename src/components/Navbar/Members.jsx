import React from "react";
import { AiOutlineInfoCircle, AiOutlineUser } from "react-icons/ai";
import users from "../../constant/users";

const Members = () => {
  return (
    <section className="p-2 overflow-y-auto">
      <div className="flex justify-between">
        <div className="flex text-teal-600 text-sm">
          <AiOutlineUser className="my-auto" />{" "}
          <span className="my-auto pl-2">Members</span>
        </div>

        <div className="p-2 duration-300 cursor-pointer text-gray-400 hover:bg-gray-200 rounded-md hover:text-teal-600">
          <h6 className="text-sm">Add Member</h6>
        </div>
      </div>

      <div className="bg-white mt-2 p-2">
        {users.map((item) => (
          <div
            className="flex pb-2 hover:bg-slate-50 cursor-pointer"
            key={item.id}
          >
            <div className="my-auto">
              {item.img === "" ? (
                <div className="w-7 h-7 border-teal-400	border-4 rounded-full bg-slate-700 relative	">
                  <h6 className="text-xs absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
                    MA
                  </h6>
                </div>
              ) : (
                <div className="w-7 h-7 border-slate-700	border-4 rounded-full  relative	">
                  <img src={item.img} alt="user" className="rounded-full" />
                </div>
              )}
            </div>
            <div className="pl-4 ">
              <h6 className="text-sm text-sky-900">{item.name}</h6>
              <p className="text-xs text-gray-400">{item.position}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex ml-2 text-sm">
          <span className="my-auto pr-1 text-teal-600">Quest</span>
          <AiOutlineInfoCircle className="my-auto text-gray-400" />
        </div>

        <div className="p-2 duration-300 cursor-pointer text-gray-400 hover:bg-gray-200 rounded-md hover:text-teal-600">
          <h6 className="text-sm ">Add quest</h6>
        </div>
      </div>

      <div className="p-2 mt-2 w-fit duration-300 cursor-pointer text-gray-400 hover:bg-gray-200 rounded-md hover:text-teal-600">
        <h6 className="text-sm ">Leave space</h6>
      </div>
    </section>
  );
};

export default Members;
