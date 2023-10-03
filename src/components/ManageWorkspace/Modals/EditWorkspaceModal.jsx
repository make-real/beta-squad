import React from 'react';
import CrossIcon from '../../../assets/cross.svg';
import PlusIcon from '../../../assets/plus.svg';
import GalleryIcon from '../../../assets/gallery.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import { update_workspace } from '../../../api/workSpace';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateWorkspace } from '../../../store/slice/workspace';
import { RiErrorWarningLine } from 'react-icons/ri';

const EditWorkspaceModal = ({ cancelFunc, data }) => {
    const [editedData, setEditedData] = useState({});
    const [logoDataURL, setLogoDataURL] = useState();
    const [errMsg, setErrMsg] = useState('');

    const dispatch = useDispatch();

    const handleLogo = (e) => {
        const files = e.target.files;
        if (files.length <= 0) return;

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setLogoDataURL(fileReader.result.toString());
            setEditedData((prev) => ({
                ...prev,
                logo: files[0],
            }));
        };

        fileReader.readAsDataURL(files[0]);
    };

    useEffect(() => {
        setEditedData(data);
    }, [data]);

    const handleChange = (e) => {
        setEditedData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setErrMsg('');

        const newData = { name: editedData.name };

        if (editedData.logo) {
            newData.logo = editedData.logo;
        }

        try {
            const res = await update_workspace(data._id, newData);
            // display a notification for user
            editedData.logo = logoDataURL;
            dispatch(updateWorkspace(editedData));
            cancelFunc();
        } catch (error) {
            // error for developer for deBugging...


            setErrMsg(error?.name);
            // error for user at notification...
            // toast.error(error?.name, {
            //     autoClose: 3000,
            // });
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999] py-[20px]">
            <div className="h-full relative w-[614px] max-h-[535px] bg-white rounded-[16px] px-[60px] py-[40px] overflow-y-scroll no-scrollbar">
                <div
                    onClick={cancelFunc}
                    className="w-max absolute top-[30px] right-[30px] cursor-pointer"
                >
                    <img src={CrossIcon} alt="" />
                </div>
                <h1 className="text-[#031124] text-[30px] font-bold">
                    Edit Workspace
                </h1>
                <p className="mt-[9px] leading-[24px] text-[#818892] text-[14px] max-w-[90%]">
                    Edit the following information to update {data.name}
                </p>
                <form onSubmit={handleUpdate} className="mt-[33px]">
                    <>
                        <p className="text-[#818892] text-[14px] font-semibold">
                            Upload company logo
                            <span className="font-light inline-block ml-[7px]">
                                (Optional)
                            </span>
                        </p>
                        <div className="relative w-[60px] h-[60px] mt-[13px]">
                            {editedData?.logo ? (
                                <>
                                    <img
                                        src={logoDataURL || editedData.logo}
                                        className="w-full h-full rounded-full object-cover border-[3px] border-[#6576FF40]"
                                        alt=""
                                    />
                                    <label
                                        htmlFor="workspace_logo"
                                        className="absolute right-[-10px] bottom-[3px] w-[32px] h-[32px] rounded-full bg-[#6576FF] flex items-center justify-center cursor-pointer"
                                    >
                                        <img src={GalleryIcon} alt="" />
                                    </label>
                                </>
                            ) : (
                                <label
                                    htmlFor="workspace_logo"
                                    className="w-full h-full rounded-full bg-[#ECECEC] flex items-center justify-center cursor-pointer"
                                >
                                    <img src={PlusIcon} alt="" />
                                </label>
                            )}
                        </div>
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
                        className="w-full py-[14px] px-[18px] text-[16px] placeholder:text-[#818892] bg-[#ECECEC60] rounded-[8px] mt-[13px] border-none outline-none text-[#031124]"
                        value={editedData.name}
                        onChange={handleChange}
                        name="name"
                    />

                    {errMsg && (
                        <span className="flex justify-start items-center gap-1 mt-2">
                            <RiErrorWarningLine className="text-[#FF3659]" />
                            <p className="text-xs text-[#FF3659]">{errMsg}</p>
                        </span>
                    )}

                    <div className="flex items-center mt-[60px] gap-[30px]">
                        <button
                            onClick={cancelFunc}
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
                                Update
                            </p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditWorkspaceModal;
