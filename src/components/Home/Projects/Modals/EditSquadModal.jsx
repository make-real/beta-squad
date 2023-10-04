import CrossIcon from "../../../../assets/cross.svg";
import { boxHexColorCodes } from "../../../../constant/data";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { update_space } from "../../../../api/space";
import { updateSpace } from "../../../../store/slice/space";
import { RiErrorWarningLine } from "react-icons/ri";

const EditSquadModal = ({ cancelEditProject, data }) => {
  const [editData, setEditData] = useState({});
  const [selectedColor, setSelectedColor] = useState(data.color);
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setEditData(data);
  }, [data]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setEditData((prev) => ({ ...prev, color: color }));
  };

  const handleChange = (e, privacy) => {
    if (privacy) {
      setEditData((prev) => ({
        ...prev,
        privacy: privacy,
      }));
      return;
    }
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSpaceUpdate = async (e) => {
    e.preventDefault();
    setErrMsg("");

    try {
      const { data } = await update_space(editData._id, editData);
      // display a notification for user
      // toast.success(`Space updated successfully`, {
      //     autoClose: 3000,
      // });

      dispatch(updateSpace(editData));

      // close this modal
      cancelEditProject(false);
    } catch (error) {

      setErrMsg(error?.name || error?.message);

      // error for user at notification...
      // toast.error(error?.name, {
      //     autoClose: 3000,
      // });
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999] py-[20px]">
      <div className="relative w-[614px] h-full max-h-[762px] bg-white rounded-[16px] px-[60px] py-[40px] overflow-y-scroll no-scrollbar">
        <div
          onClick={cancelEditProject}
          className="w-max absolute top-[30px] right-[30px] cursor-pointer"
        >
          <img src={CrossIcon} alt="" />
        </div>
        <h1 className="text-[#031124] text-[30px] font-bold">
          Edit {data.name}
        </h1>
        <p className="mt-[9px] text-[#818892] text-[14px]">
          Update the following fields to edit your existing sqaud.
        </p>
        <form onSubmit={handleSpaceUpdate} className="mt-[40px]">
          <p className="text-[#818892] text-[14px] font-semibold">Squad Name</p>
          <input
            type="text"
            className="mt-[13px] bg-[#ECECEC60] w-full py-[14px] px-[16px] outline-none border-none placeholder:text-[#818892]"
            placeholder="eg. Development"
            name="name"
            value={editData.name}
            onChange={handleChange}
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
            placeholder="eg. This squad is responsible for ..."
            name="description"
            value={editData?.description}
            onChange={handleChange}
          />
          <p className="text-[#818892] text-[14px] font-semibold mt-[20px]">
            Squad color
          </p>
          <div className="flex items-center gap-[16px] mt-[10px]">
            {boxHexColorCodes.map((color) => {
              return (
                <div
                  onClick={() => handleColorSelect(color)}
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
                checked={editData.privacy === "public" ? true : false}
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
              Squad is visible to members of your Squad. Only people added to
              the squad can edit it.
            </p>
          </div>
          <div className="mt-[15px]">
            <div className="flex items-center gap-[6px]">
              <input
                type="radio"
                name="privacy"
                id="squad_privacy_private"
                className="accent-[#6576FF]"
                checked={editData.privacy === "private" ? true : false}
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
              Squad is private. Only people added to the sapce can view it and
              edit it.
            </p>
          </div>

          {errMsg && (
            <span className="flex justify-start items-center gap-1 mt-2">
              <RiErrorWarningLine className="text-[#FF3659]" />
              <p className="text-[#FF3659]">{errMsg}</p>
            </span>
          )}

          <div className="flex items-center mt-[40px] gap-[30px]">
            <button
              onClick={cancelEditProject}
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
              <p className=" text-[14px] font-semibold text-white">Update</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSquadModal;
