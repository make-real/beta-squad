import { useUserInfoContext } from "../../context/UserInfoContext";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { RiAttachment2 } from "react-icons/ri";
import { ImSwitch } from "react-icons/im";
import { useEffect, useState } from "react";
import Button from "../Button";
import { updateProfile } from "../../api/settings";
import { toast } from "react-toastify";
import { get_my_profile } from "../../api/auth";
import Loader from "../Loader";

const Profile = () => {
  const { loginUserInfo, setLoginUserInfo } = useUserInfoContext();
  const [expandBox, setExpandBox] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);

  useEffect(() => {
    setLocalUserInfo(loginUserInfo);
    setImage(loginUserInfo.avatar);
  }, [loginUserInfo]);

  const uploadData = async (e) => {
    try {
      setLoading(true);
      await updateProfile(localUserInfo);
      const { data } = await get_my_profile();
      setLoginUserInfo(data.user);
      setLoading(false);
      toast.success("Your profile has been updated!", { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUserInfo({ ...localUserInfo, [name]: value });
  };

  const handleImageChange = async (e) => {
    try {
      setImageLoader(true);
      setExpandBox(false);
      const file = e.target.files[0];
      await updateProfile({
        avatar: file,
      });
      const { data } = await get_my_profile();
      setLoginUserInfo(data.user);
      setImageLoader(false);
    } catch (error) {
      console.log(error);
      setImageLoader(false);
    }
  };

  return (
    <>
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
                  <label htmlFor="name">Full name</label>
                  <input
                    type="text"
                    value={localUserInfo?.fullName}
                    name="fullName"
                    onChange={handleChange}
                    className="w-full border p-1.5 rounded-md outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="nickname">Nickname</label>
                  <input
                    type="text"
                    value={localUserInfo?.username}
                    name="username"
                    onChange={handleChange}
                    className="w-full border p-1.5 rounded-md outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    value={localUserInfo?.email}
                    name="email"
                    onChange={handleChange}
                    className="w-full border p-1.5 rounded-md outline-none"
                  />
                </div>
              </form>
              <Button loading={loading} onClick={uploadData} className="mt-5">
                Update
              </Button>
            </div>

            {/* user avatar */}
            <div className=" flex-1 bg-white rounded-md p-4">
              <h6 className="text-[#7088A1] pb-4 text-[18px] font-bold">
                Your avatar
              </h6>

              <div className="w-32 h-32 flex justify-center align-middle mx-auto rounded-full border overflow-hidden">
                {imageLoader ? (
                  <Loader className="my-auto" />
                ) : (
                  <img
                    src={
                      image ||
                      "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt="user"
                  />
                )}
              </div>

              <div className="bg-[#C595C6] cursor-pointer relative w-fit mx-auto mt-3 flex px-6 py-2 text-sm text-white rounded-lg hover:bg-[#d2a6d3] ">
                <div className="flex" onClick={() => setExpandBox(!expandBox)}>
                  Update your avatar{" "}
                  {expandBox ? (
                    <IoIosArrowUp className="my-auto ml-2" />
                  ) : (
                    <IoIosArrowDown className="my-auto ml-2" />
                  )}
                </div>
                {expandBox && (
                  <div className="absolute left-0 top-9 bg-[#F8F9F9] border   w-full">
                    <label
                      htmlFor="fileInput"
                      className="flex px-4 py-2 text-gray-400 text-[13px] hover:bg-[#eceded]"
                    >
                      <RiAttachment2 className="text-sm mr-2 my-auto " />
                      <h6>Upload Photo</h6>
                    </label>

                    <div className="flex px-4 py-2 text-gray-400 text-[13px] hover:bg-[#eceded] line-through">
                      <ImSwitch className="text-sm mr-2 my-auto " />
                      <h6>import from Gravatar</h6>
                    </div>

                    <div className="flex px-4 py-2 text-gray-400 text-[13px] hover:bg-[#eceded] line-through">
                      <div className="w-4 h-4 border my-auto mr-2 bg-zinc-800 rounded-full"></div>
                      <h6>Initials (no avatar)</h6>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-3 mt-3 rounded-md">
            <h6 className="text-[#7088A1] text-base font-bold"> Language</h6>
            <Button text>English</Button>
          </div>

          <div className="bg-white p-3 mt-3 rounded-md">
            <h6 className="text-[#7088A1] text-base font-bold">Password</h6>
            <Button text>Change password</Button>
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
            <Button text>Delete Account</Button>
          </div>
        </div>
      </div>
      <input
        className="hidden"
        id="fileInput"
        type="file"
        onChange={handleImageChange}
      />
    </>
  );
};

export default Profile;
