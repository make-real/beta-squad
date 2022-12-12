import {  Delete,  } from "../../assets/icons";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import Edit from "../../assets/icons/svg/Edit";

// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const BoardListSettingDropDown = ({ boardListID }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  return (
    <>
      <div className="text-gray-400 rounded-lg duration-200">
        <div
          className="p-2 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 group rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Edit />
          <span className="group-hover:text-teal-500">Edit</span>
        </div>
        <div
          className="p-2 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 group rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmModalOpen(true);
          }}
        >
          <Delete />
          <span className="group-hover:text-teal-500">Delete</span>
        </div>
      </div>
      {
        confirmModalOpen && (
          <ConfirmDialog
            listID={boardListID}
            setConfirmModalOpen={setConfirmModalOpen}
          />
        )
      }
    </>
  );
};

export default BoardListSettingDropDown;
