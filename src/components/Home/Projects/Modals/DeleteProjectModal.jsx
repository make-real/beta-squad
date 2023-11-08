import React from 'react';
import WarningIcon from '../../../../assets/icon_component/Warning';
import CrossIcon from '../../../../assets/cross.svg';
import { delete_space } from '../../../../api/space';
import { removeSpace } from '../../../../store/slice/space';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

const DeleteProjectModal = ({
    data,
    setDeleteProjectData,
    setDeletingProject,
    setShowDeleteProjectModal,
}) => {
    const [errMsg, setErrMsg] = useState('');

    const dispatch = useDispatch();
    const deleteSpace = async (e) => {
        e.preventDefault();
        setErrMsg('');
        setShowDeleteProjectModal(false);
        setDeletingProject((prev) => ({ ...prev, show: true }));

        try {
            console.log(data._id)
            const res = await delete_space(data?._id);
            console.log(res)
            setDeletingProject((prev) => ({ ...prev, done: true }));
            // display a notification for user
            dispatch(removeSpace(data._id));
        } catch (error) {
            // error for developer for deBugging...
            setDeletingProject((prev) => ({ ...prev, show: false }));
            setErrMsg(error?.name);
        }
    };

    const cancelDeletion = () => {
        setShowDeleteProjectModal(false);
        setDeleteProjectData(null);
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
                    Delete {data.name}?
                </h1>
                <p className="mt-[8px] text-[#818892] text-[14px]">
                    Are you sure you want to delete “{' '}
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

                {errMsg && (
                    <span className="flex justify-start items-center gap-1 mt-2">
                        <RiErrorWarningLine className="text-[#FF3659]" />
                        <p className="text-[#FF3659]">{errMsg}</p>
                    </span>
                )}

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
                        onClick={deleteSpace}
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
export default DeleteProjectModal;
