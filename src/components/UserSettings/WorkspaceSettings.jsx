import React, { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { AiOutlineSetting } from "react-icons/ai";
import { Loader } from "../Loader";
import { useSelector } from "react-redux";
import { add_workspace_member, update_workspace } from "../../api/workSpace";
import { toast } from "react-toastify";

const WorkspaceSettings = () => {
  const { workspaces, selectedWorkspace } = useSelector(
    (state) => state.workspace
  );
  const [workspace, setWorkspace] = useState(selectedWorkspace);
  const [userEmail, setUserEmail] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [inviteLoader, setInviteLoader] = useState(false);

  useEffect(() => {
    const thisWorkspace = workspaces.find((w) => w._id === selectedWorkspace);
    setWorkspace(thisWorkspace);
  }, []);

  const handleInputChange = (e) => {
    setWorkspace({ ...workspace, [e.target.name]: e.target.value });
  };

  const sendInvite = async (e) => {
    try {
      setInviteLoader(true);
      await add_workspace_member(selectedWorkspace, userEmail);
      toast.success(`Invitation sent to ${userEmail}`, { autoClose: 1000 });
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
    console.log("upload logo");
    try {
      setImageLoading(true);
      const file = e.target.files[0];
      await update_workspace(workspace._id, { ...workspace, logo: file });
      setImageLoading(false);
      toast.success("Workspace logo has been updated!", { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };
  return (
    <div className="min-h-screen  w-[820px] p-5 space-y-4 h-screen">
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
        <hr className="mt-5 mb-10" />
        <div className="flex align-middle justify-between mt-4">
          <div className="flex align-middle">
            <img
              className="w-10 h-10 rounded-full border"
              src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              alt="user"
            />
            <div className="text-[#7088A1] text-xs font-bold flex flex-col justify-center ml-2">
              <p>User Name</p>
              <p>example@gmail.com</p>
            </div>
          </div>
          <div className="text-[#7088A1] text-xs font-bold flex flex-col justify-center ml-2">
            <p>Workspace owner</p>
          </div>
          <Button className="mt-0" text>
            Block
          </Button>
        </div>
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
