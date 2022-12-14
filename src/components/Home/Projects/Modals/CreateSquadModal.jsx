import CrossIcon from "../../../../assets/cross.svg";
import React from "react";
import { boxHexColorCodes } from "../../../../constant/data";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { spaceCreation } from "../../../../hooks/useFetch";
import { addNewSpace } from "../../../../store/slice/space";
import { useEffect } from "react";

const CreateSquadModal = ({ setShowCreateSquadModal }) => {
    const currentWorkspace = useSelector(
        (state) => state.workspace.currentWorkspace
    );
    const [selectedColor, setSelectedColor] = useState("#C654FC");
    const [createNewSpace, setCreateNewSpace] = useState({
        workspaceId: currentWorkspace._id,
        name: "",
        color: "",
        privacy: "",
        description: "",
    });
    const dispatch = useDispatch();

    const handleSpaceCreation = async (e) => {
        e.preventDefault();

        try {
            const { data } = await spaceCreation(createNewSpace);

            // display a notification for user
            toast.success(`${data?.space?.name} - space created successfully`, {
                autoClose: 3000,
            });

            // add this space into user allSpace [array]... & send back to parent component...
            dispatch(addNewSpace(data?.space));
        } catch (error) {
            // error for developer for deBugging...
            console.log(error.response.data);

            // error for user at notification...
            toast.error(error?.response?.data?.issue?.name, {
                autoClose: 3000,
            });
        }

        // reset all input fields...
        setCreateNewSpace({ name: "", color: "", privacy: "" });

        // close this modal
        setShowCreateSquadModal(false);
    };

    const handleChange = (e, privacy) => {
        if (privacy) {
            setCreateNewSpace((prev) => ({
                ...prev,
                privacy: privacy,
            }));
            return;
        }
        setCreateNewSpace((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        setCreateNewSpace((prev) => ({ ...prev, color: selectedColor }));
    }, [selectedColor]);

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999] py-[20px]">
            <div className="h-full relative w-[614px] max-h-[762px] bg-white rounded-[16px] px-[60px] py-[40px] overflow-y-scroll no-scrollbar">
                <div
                    onClick={() => setShowCreateSquadModal(false)}
                    className="w-max absolute top-[30px] right-[30px] cursor-pointer"
                >
                    <img src={CrossIcon} alt="" />
                </div>
                <h1 className="text-[#031124] text-[30px] font-bold">
                    Create Squad
                </h1>
                <p className="mt-[9px] text-[#818892] text-[14px]">
                    Enter email to add member to{" "}
                    <span className="text-[#6576FF]">
                        {currentWorkspace?.name}
                    </span>
                </p>
                <form onSubmit={handleSpaceCreation} className="mt-[40px]">
                    <p className="text-[#818892] text-[14px] font-semibold">
                        Squad Name
                    </p>
                    <input
                        type="text"
                        className="mt-[13px] bg-[#ECECEC60] w-full py-[14px] px-[16px] outline-none border-none placeholder:text-[#818892]"
                        placeholder="Enter your new squad name"
                        value={createNewSpace.name}
                        onChange={handleChange}
                        name="name"
                    />
                    <p className="text-[#818892] text-[14px] font-semibold mt-[20px]">
                        Add Purpose{" "}
                        <span className="inline-block ml-[12px] font-light">
                            (Optional)
                        </span>
                    </p>
                    <input
                        type="text"
                        className="mt-[13px] bg-[#ECECEC60] w-full py-[14px] px-[16px] outline-none border-none placeholder:text-[#818892]"
                        placeholder="Add purpose here"
                        value={createNewSpace.purpose}
                        onChange={handleChange}
                        name="description"
                    />
                    <p className="text-[#818892] text-[14px] font-semibold mt-[20px]">
                        Squad color
                    </p>
                    <div className="flex items-center gap-[16px] mt-[10px]">
                        {boxHexColorCodes.map((color) => {
                            return (
                                <div
                                    onClick={() => {
                                        setSelectedColor(color);
                                    }}
                                    style={{ backgroundColor: color }}
                                    className={`relative rounded-[4px] cursor-pointer ${
                                        selectedColor === color
                                            ? `w-[22px] h-[22px] border-[2px] border-white`
                                            : "w-[16px] h-[16px]"
                                    }`}
                                >
                                    {selectedColor === color && (
                                        <div
                                            style={{
                                                borderColor: selectedColor,
                                            }}
                                            className={`rounded_border`}
                                        ></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-[#818892] text-[14px] font-semibold mt-[35px]">
                        Squad Privacy
                    </p>
                    <div className="mt-[15px]">
                        <div className="flex items-center gap-[6px]">
                            <input
                                type="radio"
                                name="privacy"
                                id="squad_privacy_public"
                                className="accent-[#6576FF]"
                                onChange={() => handleChange(null, "public")}
                            />
                            <label
                                htmlFor="squad_privacy_public"
                                className="text-[14px] font-semibold text-[#424D5B]"
                            >
                                Public to Squad
                            </label>
                        </div>
                        <p className="text-[#818892] text-[14px] ml-[20px] mt-[8px]">
                            Squad is visible to members of your Squad. Only
                            people added to the squad can edit it.
                        </p>
                    </div>
                    <div className="mt-[15px]">
                        <div className="flex items-center gap-[6px]">
                            <input
                                type="radio"
                                name="privacy"
                                id="squad_privacy_private"
                                className="accent-[#6576FF]"
                                onChange={() => handleChange(null, "private")}
                            />
                            <label
                                htmlFor="squad_privacy_private"
                                className="text-[14px] font-semibold text-[#424D5B]"
                            >
                                Private
                            </label>
                        </div>
                        <p className="text-[#818892] text-[14px] ml-[20px] mt-[8px]">
                            Squad is private. Only people added to the sapce can
                            view it and edit it.
                        </p>
                    </div>
                    <div className="flex items-center mt-[40px] gap-[30px]">
                        <button
                            onClick={() => setShowCreateSquadModal(false)}
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
        </div>
    );
};

export default CreateSquadModal;
