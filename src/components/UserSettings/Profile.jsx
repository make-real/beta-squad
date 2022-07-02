import { AiOutlineSetting } from "react-icons/ai";
import React, { useState } from "react";
import user from "../../assets/images/user.jpg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiAttachment2 } from "react-icons/ri";
import { ImSwitch } from "react-icons/im";

const Profile = () => {
  const [expandBox, setExpandBox] = useState(false);
  return (
    <div className=" min-h-screen  w-[820px] p-5 space-y-4 h-screen ">
      <div className="text-[#7088A1] text-lg font-bold flex ">
        <AiOutlineSetting className="my-auto mr-2" />
        <h6>Your Profile</h6>
      </div>

      <div className="h-full overflow-y-auto pb-8">
        <div className="flex gap-4 mt-4">
          {/* user info */}
          <div className="w-[450px] bg-white rounded-md p-4">
            <h6 className="text-[#7088A1] pb-4 text-[18px] font-bold">
              Profile
            </h6>
            <form className="w-[250px]  text-sm text-gray-600 space-y-3">
              <div>
                <label For="name">Full name</label>
                <input
                  type="text"
                  className="w-full border p-1.5 rounded-md outline-none"
                />
              </div>

              <div>
                <label For="nickname">Nickname</label>
                <input
                  type="text"
                  className="w-full border p-1.5 rounded-md outline-none"
                />
              </div>

              <div>
                <label For="email">Email</label>
                <input
                  type="text"
                  className="w-full border p-1.5 rounded-md outline-none"
                />
              </div>
            </form>
          </div>

          {/* user avatar */}
          <div className=" flex-1 bg-white rounded-md p-4">
            <h6 className="text-[#7088A1] pb-4 text-[18px] font-bold">
              Your avatar
            </h6>

            <div className="w-32 h-32  mx-auto">
              <img src={user} alt="user" className="rounded-full border" />
            </div>

            <div
              onClick={() => setExpandBox(!expandBox)}
              className="bg-[#C595C6] cursor-pointer relative w-fit mx-auto mt-3 flex px-6 py-2 text-sm text-white rounded-lg hover:bg-[#d2a6d3] "
            >
              Update your avatar{" "}
              {expandBox ? (
                <IoIosArrowUp className="my-auto ml-2" />
              ) : (
                <IoIosArrowDown className="my-auto ml-2" />
              )}
              {expandBox && (
                <div className="absolute left-0 top-9 bg-[#F8F9F9] border   w-full">
                  <div className="flex px-4 py-2 text-gray-400 text-[13px] hover:bg-[#eceded]">
                    <RiAttachment2 className="text-sm mr-2 my-auto " />
                    <h6>Upload Photo</h6>
                  </div>

                  <div className="flex px-4 py-2 text-gray-400 text-[13px] hover:bg-[#eceded]">
                    <ImSwitch className="text-sm mr-2 my-auto " />
                    <h6>import from Gravatar</h6>
                  </div>

                  <div className="flex px-4 py-2 text-gray-400 text-[13px] hover:bg-[#eceded]">
                    <div className="w-4 h-4 border my-auto mr-2 bg-zinc-800 rounded-full"></div>
                    <h6>Initials (no avatar)</h6>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-md">
          <h6 className="text-[#7088A1] text-base font-bold"> Language</h6>
          <div className=" text-sm p-3 hover:bg-gray-100 hover:text-[#C595C6] w-fit rounded-md text-gray-400">
            <h6>English</h6>
          </div>
        </div>

        <div className="bg-white p-3 rounded-md">
          <h6 className="text-[#7088A1] text-base font-bold">Password</h6>
          <div className="uppercase text-sm p-3 hover:bg-gray-100 hover:text-[#C595C6] w-fit rounded-md text-gray-400">
            <h6>Change password</h6>
          </div>
        </div>

        <div className="bg-white p-3 rounded-md">
          <h6 className="text-[#7088A1] text-base font-bold">
            Delete your account
          </h6>
          <p className="text-gray-500 text-sm py-2">
            You can delete your account with all your spaces, cards, notes,
            chats etc. Please notice thet your account will be permanently
            removed.
          </p>
          <div className="uppercase text-sm p-3 hover:bg-gray-100 hover:text-[#C595C6] w-fit rounded-md text-gray-400">
            <h6>Delete Account</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
