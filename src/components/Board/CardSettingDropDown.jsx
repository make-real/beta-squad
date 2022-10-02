import { Copy, Delete, LinkingChain, RightOK } from "../../assets/icons";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

// This <Component /> called by 🟨🟨🟨 Card.jsx 🟨🟨🟨
const CardSettingDropDown = ({
  close,
  right,
  progress,
  setProgress,
  noteDone,
  setNoteDone,
  setCardSettingDropDownToggle,
  cardID,
  listID,
  cardModal,
}) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  if (cardModal === true) setCardSettingDropDownToggle(false);

  const handleActionDropDownClick = (e) => {
    e.stopPropagation();
    progress !== 0 ? setProgress(0) : setProgress(4);
    setCardSettingDropDownToggle(false);
    close && close();
  };

  return (
    <div className="w-full">
      <div
        className="boardActionDropDown group w-full"
        onClick={handleActionDropDownClick}
      >
        <RightOK className="group-hover:text-teal-500" />{" "}
        <span>{progress !== 0 ? "Unmark card" : "Mark as done"}</span>
      </div>

      <div
        className="boardActionDropDown group"
        onClick={(e) => {
          e.stopPropagation();
          setConfirmModalOpen(true);
        }}
      >
        <Delete className="group-hover:text-teal-500" />{" "}
        <span>Delete Card</span>
      </div>

      {confirmModalOpen && (
        <ConfirmDialog
          listID={listID}
          cardID={cardID}
          setConfirmModalOpen={setConfirmModalOpen}
          setCardSettingDropDownToggle={setCardSettingDropDownToggle}
        />
      )}
    </div>
  );
};

export default CardSettingDropDown;
