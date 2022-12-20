import CrossIcon from "../../../assets/cross.svg";
import WarningIcon from "../../../assets/icon_component/Warning";
import DustbinIcon from "../../../assets/icon_component/Dustbin";
import React from "react";
import { useState } from "react";
import { delete_workspace } from "../../../api/workSpace";
import { removeWorkspace } from "../../../store/slice/workspace";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const DeleteWorkspaceModal = ({ data, cancelFunc }) => {
    const workspaces = useSelector((state) => state.workspace.workspaces);
    const [deleted, setDeleted] = useState(false);

    const dispatch = useDispatch();

    const handleDeletion = async (e) => {
        e.preventDefault();

        try {
            let isLast = workspaces.length === 1;
            const res = await delete_workspace(data._id);

            if (isLast) {
                localStorage.setItem("hasWorkspace", "no");
            }

            // display a notification for user
            dispatch(removeWorkspace(data._id));
            setDeleted(true);
        } catch (error) {
            // error for developer for deBugging...
            // console.log(error.response.data);
            console.log(error);

            // error for user at notification...
            toast.error(error?.response.data.name, {
                autoClose: 3000,
            });
        }
    };

    return deleted ? (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999]">
            <div className="relative w-[500px] h-[300px] bg-white rounded-[16px] flex items-center flex-col justify-center">
                <div
                    onClick={cancelFunc}
                    className="w-max absolute top-[30px] right-[30px] cursor-pointer"
                >
                    <img src={CrossIcon} alt="" />
                </div>
                <DustbinIcon />
                <h1 className="text-[#031124] text-[30px] font-bold mt-[30px]">
                    Deleted
                </h1>
                <p className="text-[#818892] mt-[7px]">
                    {data.name} is successfully deleted
                </p>
            </div>
        </div>
    ) : (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999]">
            <div className="relative w-[614px] bg-white rounded-[16px] px-[60px] py-[40px]">
                <div
                    className="w-max absolute top-[30px] right-[30px] cursor-pointer"
                    onClick={cancelFunc}
                >
                    <img src={CrossIcon} alt="" />
                </div>
                <h1 className="text-[#031124] text-[30px] font-bold">
                    Delete {data.name}?
                </h1>
                <p className="mt-[8px] text-[#818892] text-[14px]">
                    Are you sure you want to delete “{" "}
                    <span className="text-[#031124] font-semibold">
                        {data.name}
                    </span>
                    ” ?
                    <br />
                    You can not undone this action.
                </p>
                <div className="mt-[30px] w-full rounded-[16px] bg-[#FFE7EB] py-[18px] px-[20px]">
                    <div className="flex items-center gap-[11px]">
                        <WarningIcon className="fill-[#FF3659]" />
                        <p className="text-[#FF3659] text-[14px] font-semibold">
                            Warning
                        </p>
                    </div>
                    <p className="mt-[11px] text-[#FF3659] text-[14px]">
                        By deleting {data.name} all the task and conversations
                        also be deleted of this Squad.
                    </p>
                </div>
                <div className="flex items-center mt-[40px] gap-[30px]">
                    <div
                        onClick={cancelFunc}
                        className="bg-[#ECECEC] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer"
                    >
                        <p className=" text-[14px] font-semibold text-[#424D5B]">
                            Cancel
                        </p>
                    </div>
                    <div
                        onClick={handleDeletion}
                        className="bg-[#FF3659] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer"
                    >
                        <p className=" text-[14px] font-semibold text-white">
                            Delete
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteWorkspaceModal;
