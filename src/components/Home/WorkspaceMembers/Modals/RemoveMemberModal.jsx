import CrossIcon from "../../../../assets/cross.svg";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { change_workspace_member_role } from "../../../../api/workSpace";
import { useDispatch } from "react-redux";
import { addWorkspaceMembers } from "../../../../store/slice/workspace";

const RemoveMemberModal = ({
    data,
    cancelDeletion,
    setShowRemovedModal,
    setRemoveMemberData,
    setShowRemoveMemberModal,
}) => {
    const currentWorkspace = useSelector(
        (state) => state.workspace.currentWorkspace
    );
    const workspaceMembers = useSelector(
        (state) => state.workspace.workspaceMembers
    );
    const dispatch = useDispatch();

    const removeMember = async () => {
        setShowRemoveMemberModal(false);
        try {
            const res = await change_workspace_member_role(
                currentWorkspace._id,
                {
                    id: data._id,
                    role: "remove",
                }
            );
            // display a notification for user
            toast.success(`Member removed successfully`, {
                autoClose: 3000,
            });

            dispatch(
                addWorkspaceMembers(
                    workspaceMembers.filter((member) => member._id !== data._id)
                )
            );

            setShowRemovedModal(true);
            setTimeout(() => {
                setShowRemovedModal(false);
                setRemoveMemberData(null);
            }, 1500);
        } catch (error) {
            // error for developer for deBugging...
            console.log(error);
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999]">
            <div className="relative w-[614px] bg-white rounded-[16px] px-[60px] py-[40px]">
                <div
                    className="w-max absolute top-[30px] right-[30px] cursor-pointer"
                    onClick={cancelDeletion}
                >
                    <img src={CrossIcon} alt="" />
                </div>
                <h1 className="text-[#031124] text-[30px] font-bold">
                    Remove {data.fullName}?
                </h1>
                <p className="mt-[8px] text-[#818892] text-[14px] max-w-[400px]">
                    Are you sure you want to delete “{" "}
                    <span className="text-[#031124] font-semibold">
                        {data.fullName}
                    </span>
                    ” from {currentWorkspace?.name} ?
                </p>
                <div className="mt-[25px] w-full flex items-center gap-[10px]">
                    <img
                        src={data.avatar}
                        className="w-[40px] h-[40px] rounded-full object-cover"
                        alt=""
                    />
                    <p className="text-[#424D5B] font-semibold">
                        {data.fullName}
                    </p>
                </div>
                <div className="flex items-center mt-[40px] gap-[30px]">
                    <div
                        onClick={cancelDeletion}
                        className="bg-[#ECECEC] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer"
                    >
                        <p className=" text-[14px] font-semibold text-[#424D5B]">
                            Cancel
                        </p>
                    </div>
                    <div
                        onClick={removeMember}
                        className="bg-[#FF3659] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer"
                    >
                        <p className=" text-[14px] font-semibold text-white">
                            Remove
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveMemberModal;
