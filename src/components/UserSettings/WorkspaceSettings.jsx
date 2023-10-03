import Dropdown from "../Dropdown";
import Button from "../Button";
import Input from "../Input";
import { WORKSPACE_ROLE } from "../../constant/enums";
import { AiOutlineSetting } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "../Loader";
import {
  add_workspace_member,
  change_workspace_member_role,
  delete_workspace,
  get_single_workspace_data,
  get_workspace_member,
  transfer_ownership,
  update_workspace,
} from "../../api/workSpace";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import Avatar from "../Avatar";

const WorkspaceSettings = () => {
  const { selectedWorkspace } = useSelector((state) => state.workspace);
  const [workspace, setWorkspace] = useState(selectedWorkspace);
  const [workspaceMembers, setWorkspaceMembers] = useState([]);
  const [changingRoll, setChangingRoll] = useState("");
  const [blocking, setBlocking] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [inviteLoader, setInviteLoader] = useState(false);
  const [deletingSpaceModal, setDeletingSpaceModal] = useState(false);

  useEffect(() => {
    getWorkspaceData();
    getWorkspaceMembers();
  }, [selectedWorkspace]);

  // get user img from user info, which store at local storage...
  const userImg = JSON.parse(localStorage.getItem("userInfo"))?.avatar;

  const getWorkspaceData = async () => {
    try {
      const { data } = await get_single_workspace_data(selectedWorkspace);
      setWorkspace(data.workspace);
    } catch (error) {
      console.log(error);
    }
  };

  const getWorkspaceMembers = async () => {
    try {
      const { data } = await get_workspace_member(selectedWorkspace);
      setWorkspaceMembers(data.teamMembers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setWorkspace({ ...workspace, [e.target.name]: e.target.value });
  };

  const sendInvite = async (e) => {
    try {
      setInviteLoader(true);
      await add_workspace_member(selectedWorkspace, userEmail);
      toast.success(`Invitation sent to ${userEmail}`, { autoClose: 1000 });
      getWorkspaceMembers();
      setUserEmail("");
      setInviteLoader(false);
    } catch (error) {
      setInviteLoader(false);
      error?.message && toast.error(error.message, { autoClose: 1000 });
    }
  };

  const uploadName = async (e) => {
    try {
      setNameLoading(true);
      await update_workspace(workspace._id, workspace);
      setNameLoading(false);
      toast.success("Workspace name has been updated!", { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      setNameLoading(false);
    }
  };

  const uploadLogo = async (e) => {
    try {
      setImageLoading(true);
      const file = e.target.files[0];
      await update_workspace(workspace._id, { ...workspace, logo: file });
      getWorkspaceData();
      setImageLoading(false);
      toast.success("Workspace logo has been updated!", { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  const changeUserRoll = async (id, role) => {
    try {
      setChangingRoll(id);
      await change_workspace_member_role(selectedWorkspace, {
        id,
        role,
      });
      setChangingRoll("");
      getWorkspaceMembers();
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
      setChangingRoll("");
    }
  };

  const removeUser = async (id) => {
    try {
      setBlocking(id);
      await change_workspace_member_role(selectedWorkspace, {
        id,
        role: "remove",
      });
      setBlocking("");
      getWorkspaceMembers();
    } catch (error) {
      console.log(error);
      setBlocking("");
    }
  };

  const transferOwnership = async (id) => {
    try {
      setBlocking(id);
      await transfer_ownership(selectedWorkspace, id);
      setBlocking("");
      getWorkspaceMembers();
    } catch (error) {
      console.log(error);
      setBlocking("");
    }
  };

  const handleDeletingSpace = async () => {
    try {
      const { data } = await delete_workspace(selectedWorkspace);
      toast.success(data.message, { autoClose: 1000 });
    } catch (error) {
      toast.error(error.workspaceId, { autoClose: 1000 });
    }
  };

  const isChangingRoll = (id) => id === changingRoll;
  const isBlockingUser = (id) => id === blocking;

  return (
    <div className="min-h-screen overflow-auto w-[820px] p-5 space-y-4 h-screen">
      <div className="text-[#7088A1] text-lg font-bold flex ">
        <AiOutlineSetting className="my-auto mr-2" />
        <h6>Workspace Settings</h6>
      </div>
      <div className="flex gap-4 mt-4">
        {/* user info */}
        <div className="w-[450px] bg-white rounded-md p-4">
          <h6 className="text-[#7088A1] pb-4 font-bold">Basic Settings</h6>
          <hr className="mb-5" />
          <Input
            title="Workspace Name"
            value={workspace?.name}
            name="name"
            onChange={handleInputChange}
            className="w-full"
          />
          <Button loading={nameLoading} onClick={uploadName} className="mt-5">
            Update Name
          </Button>
        </div>

        {/* user avatar */}
        <div className=" flex-1 bg-white rounded-md px-4 py-10">
          <div className="w-32 h-32 flex justify-center align-middle mx-auto rounded-full border overflow-hidden">
            {false ? (
              <Loader className="my-auto" />
            ) : (
              <img
                src={
                  workspace?.logo ||
                  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="user"
              />
            )}
          </div>

          <label htmlFor="fileInput">
            <Button loading={imageLoading} className="flex mx-auto">
              Update logo
            </Button>
          </label>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-md p-4">
        <div>
          <div className="text-[#7088A1] font-bold flex">
            <h6>Invite or manage team mambers</h6>
          </div>
          <div className="flex align-middle mt-5">
            <Input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full"
            />
            <Button
              disabled={!userEmail}
              loading={inviteLoader}
              onClick={sendInvite}
              className="ml-3 mt-0"
            >
              Invite
            </Button>
          </div>
        </div>
        <hr className="my-5" />
        {workspaceMembers
          ?.filter((user) => user?.role === "owner")
          .map((user, i) => (
            <>
              <div key={i} className="flex align-middle justify-between mt-4">
                <div className="flex items-center w-[150px]">
                  <Avatar user={user} />
                  <div className="text-[#7088A1] text-xs font-bold flex flex-col justify-center ml-2">
                    <p>{user?.fullName}</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <div className="text-[#7088A1] font-bold text-center flex items-center">
                  Workspace owner
                </div>
              </div>
              <hr className="mt-3" />
            </>
          ))}
        {workspaceMembers
          ?.filter((user) => user?.role !== "owner")
          .map((user, i) => (
            <>
              <div key={i} className="flex align-middle justify-between mt-4">
                <div className="flex items-center w-[150px]">
                  <Avatar user={user} />
                  <div className="text-[#7088A1] text-xs font-bold flex flex-col justify-center ml-2">
                    <p>{user?.fullName}</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
                {user?.role !== "owner" ? (
                  <>
                    <Dropdown
                      width={120}
                      button={
                        <Button
                          loading={isChangingRoll(user?._id)}
                          className="mt-0"
                          text
                        >
                          <div className="flex items-center gap-2">
                            <div className="">{user?.role}</div>
                            <div className="">
                              <IoIosArrowDown className="my-auto" />
                            </div>
                          </div>
                        </Button>
                      }
                      menu={({ closePopup }) =>
                        Object.values(WORKSPACE_ROLE)
                          .filter(
                            (role) =>
                              role.toLocaleLowerCase() !==
                              user?.role.toLocaleLowerCase()
                          )
                          .map((roll) => (
                            <Button
                              sm
                              block
                              onClick={() => {
                                changeUserRoll(
                                  user?._id,
                                  roll.toLocaleLowerCase()
                                );
                                closePopup();
                              }}
                              className="mx-auto mt-0"
                              text
                            >
                              {roll}
                            </Button>
                          ))
                      }
                    />
                    {isBlockingUser(user._id) ? (
                      <Loader />
                    ) : (
                      <Dropdown
                        position="left center"
                        width={180}
                        button={
                          <div className="px-1 text-[#7088A1] cursor-pointer h-full flex items-center">
                            <BsThreeDotsVertical />
                          </div>
                        }
                        menu={({ closePopup }) => (
                          <>
                            <Button
                              sm
                              block
                              className="mt-0"
                              text
                              onClick={() => {
                                removeUser(user._id);
                                closePopup();
                              }}
                            >
                              Remove
                            </Button>
                            <Button
                              sm
                              block
                              className="mt-0"
                              text
                              onClick={() => {
                                transferOwnership(user._id);
                                closePopup();
                              }}
                            >
                              Transfer ownership
                            </Button>
                          </>
                        )}
                      />
                    )}
                  </>
                ) : (
                  <div className="text-[#7088A1] font-bold text-center flex items-center">
                    Workspace owner
                  </div>
                )}
              </div>
              {user?.role === "owner" && <hr className="mt-3" />}
            </>
          ))}
      </div>
      <input
        className="hidden"
        id="fileInput"
        type="file"
        onChange={uploadLogo}
      />
    </div>
  );
};

export default WorkspaceSettings;
