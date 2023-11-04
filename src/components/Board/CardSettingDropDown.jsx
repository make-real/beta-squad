import { Copy, Delete, LinkingChain, RightOK } from '../../assets/icons';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import Edit from '../../assets/icons/svg/Edit';

// This <Component /> called by 🟨🟨🟨 Card.jsx 🟨🟨🟨
const CardSettingDropDown = ({
    close,
    removeUpdate,
    right,
    progress,
    setProgress,
    noteDone,
    setNoteDone,
    setCardSettingDropDownToggle,
    cardID,
    listID,
    cardModal,
    toggleEdit,
    setToggleEdit,
    spaceID,
    spaceFiledID
}) => {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    if (cardModal === true) setCardSettingDropDownToggle(false);

    // const handleActionDropDownClick = (e) => {
    //     e.stopPropagation();
    //     progress !== 0 ? setProgress(0) : setProgress(4);
    //     setCardSettingDropDownToggle(false);
    //     close && close();
    // };
    return (
        <div className="w-full rounded-2xl">
            <div
                className="boardActionDropDown group w-full flex justify-center items-center"
                onClick={(e) => {
                    e.stopPropagation();
                    setToggleEdit(!toggleEdit);
                    close();
                }}
            >
                <Edit className="group-hover:text-teal-500" />
                <span>Edit</span>
            </div>
            

            <div
                className="boardActionDropDown group flex justify-center items-center"
                onClick={(e) => {
                    e.stopPropagation();
                    setConfirmModalOpen(true);
                }}
            >
                <Delete className="group-hover:text-teal-500" />
                <span>Delete</span>
            </div>

            {confirmModalOpen && (
                <ConfirmDialog
                    listID={listID}
                    cardID={cardID}
                    spaceID={ spaceID}
                    spaceFiledID={spaceFiledID}
                    setConfirmModalOpen={setConfirmModalOpen}
                    setCardSettingDropDownToggle={setCardSettingDropDownToggle}
                />
            )}
        </div>
    );
};

export default CardSettingDropDown;
