import React from "react";
import { useNavigate } from "react-router-dom";
import { delete_my_account } from "../../../api/auth";
import CrossIcon from "../../../assets/cross.svg";
import WarningIcon from "../../../assets/icon_component/Warning";

const DeleteProfileModal = ({ setShowDeleteProfileModal }) => {
    const navigate = useNavigate();
    const handleDeletion = async () => {
        try {
            await delete_my_account();
            localStorage.removeItem("jwt");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userId");
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999]">
            <div className="relative w-[614px] bg-white rounded-[16px] px-[60px] py-[40px]">
                <div
                    className="w-max absolute top-[30px] right-[30px] cursor-pointer"
                    onClick={() => setShowDeleteProfileModal(false)}
                >
                    <img src={CrossIcon} alt="" />
                </div>
                <h1 className="text-[#031124] text-[30px] font-bold">
                    Delete Profile?
                </h1>
                <p className="mt-[8px] text-[#818892] text-[14px]">
                    Are you sure you want to delete your profile ?
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
                        By deleting your profile all data will be deleted of
                        this Profile
                    </p>
                </div>
                <div className="flex items-center mt-[40px] gap-[30px]">
                    <div
                        onClick={() => setShowDeleteProfileModal(false)}
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

export default DeleteProfileModal;
