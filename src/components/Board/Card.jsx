import { DotsSingle, Plus, RightOK, Smile, UserPlus } from "../../assets/icons";
import { useBoardCardContext } from "../../context/BoardCardContext";
import { CardModal, CardSettingDropDown, CardChip } from ".";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";
import ConfirmDialog from "./ConfirmDialog";

// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const Card = ({ card, listID }) => {
  const dropDownRef = useRef();
  const [cardSettingDropDownToggle, setCardSettingDropDownToggle] =
    useState(false);
  const { handleDragEnd, handleDragEnter } = useBoardCardContext();
  const [cardModal, setCardModal] = useState(false);
  const [noteDone, setNoteDone] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleClick = (e) => {
    // track out-side of click... & close setting drop down div...
    if (!dropDownRef?.current?.contains(e.target))
      setCardSettingDropDownToggle(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div
        draggable
        ref={dropDownRef}
        onClick={() => setCardModal(true)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onDragEnd={() => handleDragEnd(listID, card._id)}
        onDragEnter={() => handleDragEnter(listID, card._id)}
        className="relative w-[275px] h-fit bg-white px-3 py-3 rounded-md border-t-4 border-teal-600 cursor-grab hover:bg-gray-200 "
      >
        {noteDone && (
          <div className="px-1 pb-2">
            <div
              className={`w-8 h-8 grid place-items-center rounded-md cursor-pointer hover:bg-gray-300 hover:text-teal-400 text-[#B9C3CE]  ${
                visible ? "visible" : "invisible"
              }`}
            >
              <UserPlus />
            </div>

            <div className="absolute top-4 right-8 flex items-center justify-center w-8 h-8 bg-teal-400 rounded-full text-white">
              <RightOK />
            </div>
          </div>
        )}

        <p className="text-lg mr-4 text-gray-800">{card.name}</p>

        {/* For Tag's / Card Chip's */}
        <div className="p-1 text-white flex gap-2 flex-wrap">
          <CardChip tag="Done" bgColor="bg-green-500" />
          <CardChip tag="Warning" bgColor="bg-orange-500" />
          <CardChip tag="Active" bgColor="bg-red-500" />
        </div>
        <div className="absolute top-4 right-3">
          {
            // ⚪⚪⚪ For 3 Dots, Menu toggling...
            visible && (
              <Dropdown
                button={
                  <DotsSingle
                    className={`cursor-pointer py-1.5 w-6 h-8 rounded-lg hover:bg-gray-300 duration-200 text-gray-400 active:bg-gray-300`}
                  />
                }
              >
                <CardSettingDropDown
                  right={true}
                  cardID={card._id}
                  listID={listID}
                  noteDone={noteDone}
                  cardModal={cardModal}
                  setNoteDone={setNoteDone}
                  setCardSettingDropDownToggle={setCardSettingDropDownToggle}
                />
              </Dropdown>
            )
          }
        </div>

        {/* ➕🙂 plus smile face emoji ➕🙂 */}

        <div className=" flex items-center justify-end ">
          {/* <div className='mr-1 bg-slate-200/50 rounded-md py-[2px] px-1 border border-teal-500'>
                    👍 <span className='text-black'>1</span>
                </div> */}

          <div
            className="flex items-center text-gray-400 p-1.5 rounded-md cursor-pointer hover:bg-gray-300 duration-200"
            onClick={() => {}}
          >
            <Plus width="12" height="12" className="mr-[2px]" />
            <Smile />

            <div className="flex gap-2 items-center">{/* 👍❤👎🎉 */}</div>
          </div>
        </div>
      </div>
      {
        // When Task Click >>> then Modal Open
        cardModal && (
          <CardModal
            card={card}
            noteDone={noteDone}
            setBoardModal={setCardModal}
            setNoteDone={setNoteDone}
          />
        )
      }
      {/* <ConfirmDialog
        listID={"boardListID"}
        setConfirmModalOpen={"setConfirmModalOpen"}
      /> */}
    </>
  );
};

export default Card;
