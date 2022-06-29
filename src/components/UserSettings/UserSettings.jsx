import React from "react";
import { Link } from "react-router-dom";
import user from "../../assets/userLogin.png";
import logo from "../../assets/logo.png";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineArrowLeft, AiOutlineSetting } from "react-icons/ai";
import { CgBox } from "react-icons/cg";
import { BsTag } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";

const UserSettings = () => {
  return (
    <section className="w-[325px] text-sm fixed top-0 bottom-0 text-[#9FB4C3] bg-[#23313F] rounded-r-lg p-3">
      <Link
        to="/settings"
        className="text-white mt-4 font-bold flex bg-[#253443] p-1.5 rounded-sm border-b-2 border-[#2d4154]"
      >
        <div className="w-11 h-11 ">
          <img src={user} alt="" />
        </div>
        <h6 className="my-auto  pl-6">Profile Settings</h6>
      </Link>

      <Link
        to="/settings/manage-workspace"
        className=" font-bold mt-3 flex w-full hover:bg-[#253443] p-2 rounded-sm border-b-2 border-[#2d4154]"
      >
        Manage Workspaces
      </Link>

      <Link
        to="/settings/manage-workspace"
        className="font-bold mt-3 flex w-full hover:bg-[#253443] p-2 rounded-sm "
      >
        Developer Console
      </Link>

      <div className="border-b-2 border-[#293C4F] ">
        <div className=" font-bold mt-3 flex w-full  bg-[#293C4F] p-2.5 rounded-md ">
          <div className="w-12 h-12 rounded-md overflow-hidden">
            <img src={logo} alt="" />
          </div>
          <div className="flex-1 flex justify-between hover:text-white">
            <h6 className="my-auto pl-3">Make Real</h6>
            <IoIosArrowDown className="my-auto" />
          </div>
        </div>

        <div className="m-8 space-y-1.5 ">
          <Link
            to=""
            className="flex p-2.5 rounded-md hover:bg-[#293C4F] bg-[#111F2D]"
          >
            <AiOutlineSetting className="my-auto mr-2" /> <h6> Preferences</h6>
          </Link>

          <Link to="" className="flex p-2.5 rounded-md hover:bg-[#293C4F]">
            <CgBox className="my-auto mr-2" /> <h6> Subscription</h6>
          </Link>

          <Link to="" className="flex p-2.5 rounded-md hover:bg-[#293C4F]">
            <BsTag className="my-auto mr-2" /> <h6> Preferences</h6>
          </Link>

          <Link to="" className="flex p-2.5 rounded-md hover:bg-[#293C4F]">
            <FiShoppingBag className="my-auto mr-2" /> <h6> Preferences</h6>
          </Link>
        </div>
      </div>

      <Link
        to="/projects"
        className="flex px-2 py-3 hover:bg-[#293C4F] rounded-lg text-white"
      >
        <AiOutlineArrowLeft className="my-auto text-lg mr-2" />
        <span>Back to the universe</span>
      </Link>
    </section>
  );
};

export default UserSettings;
