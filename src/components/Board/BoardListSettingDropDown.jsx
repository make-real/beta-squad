import { Copy, Delete, EyeOpen, Plus, RightArrow } from "../../assets/icons";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const BoardListSettingDropDown = ({ boardListID }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  return (
    <>
      <div className="text-gray-400">
        <div
          className="p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmModalOpen(true);
          }}
        >
          <Delete />{" "}
          <span className="group-hover:text-teal-500">Delete list</span>
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
