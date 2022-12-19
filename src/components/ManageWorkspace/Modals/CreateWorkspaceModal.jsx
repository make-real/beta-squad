import React from "react";
import { useState } from "react";
import CrossIcon from "../../../assets/cross.svg";
import PlusIcon from "../../../assets/plus.svg";
import GreenTick from "../../../assets/green_tick.svg";
import { workspaceCreation } from "../../../hooks/useFetch";
import { addWorkSpace } from "../../../store/slice/workspace";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const CreateWorkspaceModal = ({ setShowCreateWorkspaceModal }) => {
    const [workspaceCreated, setWorkspaceCreated] = useState(false);
    const [workspaceData, setWorkspaceData] = useState({});
    const [logo, setLogo] = useState({
        image: null,
        dataURL: null,
    });

    const handleLogo = (e) => {
        const files = e.target.files;
        if (files.length <= 0) return;

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setLogo((prev) => ({
                image: files[0],
                dataURL: fileReader.result.toString(),
            }));
        };

        fileReader.readAsDataURL(files[0]);
    };

    const dispatch = useDispatch();

    const handleCreation = async (e) => {
        e.preventDefault();
        try {
            // its a POST method | object send into backend/server
            const createData = new FormData();
            createData.append("name", workspaceData.name);
            if (logo.image) createData.append("logo", logo.image);
            const { data } = await workspaceCreation(createData);

            // get all Work-Space data & send into redux store...
            // for live re-fetching/load data at SideBar for navigation...
            dispatch(addWorkSpace(data.workspaces));

            // display a success notification for user...
            toast.success(
                `${data?.workspace?.name} : work space created successfully`,
                { autoClose: 3000 }
            );
            setWorkspaceCreated(true);
        } catch (error) {
            // display error notification for developers...
            console.log(error.response?.data?.issue);

            // display error notification for users...
            toast.error(error.response?.data?.name, {
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999] py-[20px]">
            {workspaceCreated ? (
                <div className="h-full relative w-[614px] max-h-[300px] bg-white rounded-[16px] px-[60px] py-[40px] overflow-y-scroll no-scrollbar flex items-center justify-center flex-col">
                    <div
                        onClick={() => setShowCreateWorkspaceModal(false)}
                        className="w-max absolute top-[30px] right-[30px] cursor-pointer"
                    >
                        <img src={CrossIcon} alt="" />
                    </div>
                    <img src={GreenTick} alt="" />
                    <h1 className="mt-[27px] text-[#031124] text-[30px] leading-[45px] font-bold">
                        Done
                    </h1>
                    <p className="mt-[8px] text-[#818892] leading-[26px]">
                        You have successfully created a workspace
                    </p>
                </div>
            ) : (
                <div className="h-full relative w-[614px] max-h-[535px] bg-white rounded-[16px] px-[60px] py-[40px] overflow-y-scroll no-scrollbar">
                    <div
                        onClick={() => setShowCreateWorkspaceModal(false)}
                        className="w-max absolute top-[30px] right-[30px] cursor-pointer"
                    >
                        <img src={CrossIcon} alt="" />
                    </div>
                    <h1 className="text-[#031124] text-[30px] font-bold">
                        Create Workspace
                    </h1>
                    <p className="mt-[9px] leading-[24px] text-[#818892] text-[14px] max-w-[90%]">
                        Fill up the following fields to and press create to
                        create new workspace.
                    </p>
                    <form onSubmit={handleCreation} className="mt-[33px]">
                        <>
                            <p className="text-[#818892] text-[14px] font-semibold">
                                Upload company logo
                                <span className="font-light inline-block ml-[7px]">
                                    (Optional)
                                </span>
                            </p>
                            <label
                                htmlFor="workspace_logo"
                                className="mt-[13px] w-[60px] h-[60px] rounded-full bg-[#ECECEC] flex items-center justify-center cursor-pointer"
                            >
                                {logo.image ? (
                                    <img
                                        className="w-full h-full rounded-full object-cover"
                                        src={logo.dataURL}
                                        alt=""
                                    />
                                ) : (
                                    <img src={PlusIcon} alt="" />
                                )}
                            </label>
                            <input
                                onChange={handleLogo}
                                type="file"
                                id="workspace_logo"
                                hidden
                            />
                        </>
                        <p className="text-[#818892] text-[14px] font-semibold mt-[30px]">
                            Work Space Name
                        </p>
                        <input
                            type="text"
                            placeholder="Enter your new workspae name"
                            className="w-full py-[14px] px-[18px] text-[14px] placeholder:text-[#818892] bg-[#ECECEC60] rounded-[8px] mt-[13px] border-none outline-none"
                            onChange={(e) =>
                                setWorkspaceData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                        />

                        <div className="flex items-center mt-[60px] gap-[30px]">
                            <button
                                onClick={() =>
                                    setShowCreateWorkspaceModal(false)
                                }
                                className="bg-[#FFE7EB] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer"
                            >
                                <p className=" text-[14px] font-semibold text-[#FF3659]">
                                    Cancel
                                </p>
                            </button>
                            <button
                                type="submit"
                                className="bg-[#6576FF] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer"
                            >
                                <p className=" text-[14px] font-semibold text-white">
                                    Create
                                </p>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreateWorkspaceModal;
