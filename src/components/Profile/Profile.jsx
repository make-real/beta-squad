import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { update_user } from "../../api/auth";
import BackArrowIcon from "../../assets/back_arrow.svg";
import GalleryIcon from "../../assets/gallery.svg";
import DeleteProfileModal from "./Modals/DeleteProfileModal";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
  const [avatar, setAvatar] = useState({
    image: null,
    dataURL: null,
  });
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
 

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatar = (e) => {
    const files = e.target.files;
    if (files.length <= 0) return;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setAvatar(() => ({
        image: files[0],
        dataURL: fileReader.result.toString(),
      }));
    };

    fileReader.readAsDataURL(files[0]);
  };

  const handleSave = async () => {
    let data = new FormData();
    if (userData.current_password) {
      if (!userData?.new_password || !userData?.confirm_password) {
        setError(
          "Please provide new password or make the present password field empty"
        );
        return;
      }
      if (userData?.new_password !== userData?.confirm_password) {
        setError("New Password doesn't match with confirm password");
        return;
      } else {
        data.append("current_password", userData.current_password ?? "");
        data.append("new_password", userData.new_password);
      }
    }
    if (userData.fullName.toString().trim() === "") {
      setError("Name field can' be empty");
      return;
    }
    setError("");
    if (avatar.image) {
      data.append("avatar", avatar.image);
    }
    data.append("fullName", userData.fullName);
    data.append("email", userData.email);

    console.log(data);

    try {
      const { data: resData } = await update_user(data);
      setSuccess(true);

      console.log(resData);

      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    setUserData(userInfo);
  }, []);

  return (
    <>
      <div className="relative pt-[40px] pl-[38px] pr-[40px] pb-[40px] bg-[#FFF] h-full flex flex-col">
        {/* <div className="flex items-center">
                    <Link to="/projects" className="cursor-pointer">
                        <img src={BackArrowIcon} alt="" />
                    </Link>
                    <p className="ml-[14px] font-semibold text-[15px] text-[#031124]">
                        Profile
                    </p>
                </div> */}
        <div className="w-full h-full bg-white rounded-[16px] pt-[30px] pb-[50px] px-[40px] flex flex-col overflow-auto no-scrollbar">
          <h1 className="text-[#424D5B] text-[20px] leading-[25px] font-semibold">
            Profile
          </h1>
          <p className="text-[#818892] text-[15px] mt-[12px]">
            You may update your profile info from here.
          </p>
          <div className="mt-[30px] flex flex-col h-full">
            <div className="relative w-[100px] h-[100px] rounded-full bg-[#6576FF40] p-[4px]">
              <img
                className="w-full h-full rounded-full"
                src={avatar.image ? avatar.dataURL : userData?.avatar}
                alt=""
              />
              <label
                htmlFor="user_avatar"
                className="absolute right-[-5px] bottom-[5px] w-[36px] h-[36px] rounded-full bg-[#6576FF] flex items-center justify-center cursor-pointer border-[3px] border-white"
              >
                <img src={GalleryIcon} alt="" />
              </label>
              <input
                onChange={handleAvatar}
                id="user_avatar"
                type="file"
                hidden
              />
            </div>
            <div className="mt-[44px] flex w-full gap-[30px]">
              <div className="w-full">
                <p className="text-[#818892] text-[14px] font-semibold">
                  Full name
                </p>
                <input
                  type="text"
                  placeholder="Enter your Full name"
                  className="w-full bg-[#ECECEC60] rounded-[8px] text-[16px] text-[#031124] px-[18px] py-[14px] mt-[13px] border-none outline-none"
                  name="fullName"
                  onChange={handleChange}
                  value={userData?.fullName}
                />
              </div>
              <div className="w-full">
                <p className="text-[#818892] text-[14px] font-semibold">
                  Email
                </p>
                <input
                  disabled
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-[#ECECEC60] rounded-[8px] text-[16px] text-[#031124] px-[18px] py-[14px] mt-[13px] border-none outline-none"
                  name="email"
                  onChange={handleChange}
                  value={userData?.email}
                />
              </div>
            </div>
            {/* <div className="mt-[33px] flex w-full gap-[30px] mb-[40px]">
              <div className="w-full">
                <p className="text-[#818892] text-[14px] font-semibold">
                  New password
                </p>
                <input
                  type="text"
                  placeholder="Enter new password"
                  className="w-full bg-[#ECECEC60] rounded-[8px] text-[16px] text-[#031124] px-[18px] py-[14px] mt-[13px] border-none outline-none"
                  name="new_password"
                  onChange={handleChange}
                  value={userData?.new_password}
                />
              </div>
              <div className="w-full">
                <p className="text-[#818892] text-[14px] font-semibold">
                  Confirm password
                </p>
                <input
                  type="text"
                  placeholder="Confirm new password"
                  className="w-full bg-[#ECECEC60] rounded-[8px] text-[16px] text-[#031124] px-[18px] py-[14px] mt-[13px] border-none outline-none"
                  name="confirm_password"
                  onChange={handleChange}
                  value={userData?.confirm_password}
                />
              </div>
            </div> */}
            <div className="mt-auto flex items-center justify-between">
              <p
                onClick={() => setShowDeleteProfileModal(true)}
                className="w-max text-[#FF3659] text-[14px] font-semibold underline cursor-pointer"
              >
                Delete Profile
              </p>
              <div className="flex items-center gap-[30px]">
                <button
                  onClick={() => navigate("/")}
                  className="bg-[#ECECEC] text-[14px] text-[#818892] font-semibold py-[17px] px-[92px] rounded-[8px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className={`${success ? "bg-green-500" : "bg-[#6576FF]"} ${
                    error ? "bg-red-400" : "bg-[#6576FF]"
                  } text-[14px] text-white font-semibold py-[17px] px-[92px] rounded-[8px]`}
                >
                  {success ? "Saved !" : error ? "Try again" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteProfileModal && (
        <DeleteProfileModal
          setShowDeleteProfileModal={setShowDeleteProfileModal}
        />
      )}
    </>
  );
};

export default Profile;
