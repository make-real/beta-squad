import { DotsSingle, Plus, RightOK, Smile, UserPlus } from "../../assets/icons";
import { useBoardCardContext } from "../../context/BoardCardContext";
import { CardModal, CardSettingDropDown, CardChip } from ".";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";
import ConfirmDialog from "./ConfirmDialog";
import { useSelector } from "react-redux";
import { cardUpdateApiCall } from "../../hooks/useFetch";

// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const Card = ({ card, listID }) => {
  const dropDownRef = useRef();
  const [cardSettingDropDownToggle, setCardSettingDropDownToggle] =
    useState(false);
  const { updateCard, toggleCardModal } = useBoardCardContext();
  const [noteDone, setNoteDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(card?.progress);
  const selectedSpaceObj = useSelector((state) => state.space.selectedSpaceObj);
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

  const progressStatus = (progress) => {
    switch (progress) {
      case 4:
        return 100;
      case 3:
        return 75;
      case 2:
        return 50;
      case 1:
        return 25;
      default:
        return 0;
    }
  };

  const handleClick = (e) => {
    if (!dropDownRef?.current?.contains(e.target))
      setCardSettingDropDownToggle(false);
  };

  useEffect(() => {
    const cardProgressUpdate = async () => {
      const cardTagObject = { ...card, progress: progress };
      try {
        const { data } = await cardUpdateApiCall(
          selectedSpaceId,
          listID,
          card._id,
          cardTagObject
        );
        updateCard(listID, card._id, data.updatedCard);
      } catch (error) {
        console.log(error?.response?.data?.issue);
      }
    };
    cardProgressUpdate();
  }, [progress]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const toggle_card_modal = () => {
    console.log("taggling........");
    toggleCardModal(listID, card._id);
  };

  const checked = card.checkList?.filter((item) => item?.checked);
  const unchecked = card.checkList?.filter((item) => !item?.checked);
  return (
    <>
      <div
        ref={dropDownRef}
        onClick={toggle_card_modal}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="relative w-[275px] h-fit bg-white px-3 py-3 rounded-md border-t-4 cursor-grab hover:bg-gray-200"
        style={{ borderColor: selectedSpaceObj?.color }}
      >
        {!!card.assignee?.length && (
          <div className="mb-3 flex">
            {card.assignee?.map((user, i) => (
              <div style={{ marginLeft: i ? "-5px" : 0 }}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-6 h-6 rounded-full ring bg-white ring-teal-500"
                  />
                ) : (
                  <p className="w-6 h-6 rounded-full ring bg-white ring-teal-500 text-black font-bold grid place-items-center">
                    {user?.fullName.charAt(0)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        <p className="text-sm mr-4 text-gray-800">{card.name}</p>
        <div className="pt-5 text-white flex gap-1 flex-wrap">
          {card?.tags?.length
            ? card?.tags?.map((tag) => (
                <CardChip small tag={tag} key={tag?.name} />
              ))
            : null}
        </div>

        <div className="absolute top-2 right-2 flex">
          {!!progress && (
            <div
              style={{
                backgroundColor:
                  progress === 4 ? selectedSpaceObj?.color : "grey",
              }}
              className={`mt-[2px] flex items-center justify-center w-7 h-7 rounded-full text-white`}
            >
              {progress === 4 ? (
                <RightOK className="w-4 h-4" />
              ) : (
                <span className="text-[8px] text-center">
                  {progressStatus(progress)}%
                </span>
              )}
            </div>
          )}
          {visible && (
            <Dropdown
              width={200}
              button={
                <DotsSingle
                  className={`cursor-pointer ml-1 py-1.5 w-6 h-8 rounded-lg hover:bg-gray-300 duration-200 text-gray-400 active:bg-gray-300`}
                />
              }
              menu={({ closePopup }) => (
                <CardSettingDropDown
                  close={closePopup}
                  right={true}
                  cardID={card._id}
                  listID={listID}
                  progress={progress}
                  setProgress={setProgress}
                  noteDone={noteDone}
                  setNoteDone={setNoteDone}
                  setCardSettingDropDownToggle={setCardSettingDropDownToggle}
                />
              )}
            />
          )}
        </div>

        {!!(checked.length + unchecked.length) && (
          <div className="relative flex items-center mt-3">
            <div className="relative flex w-[100px] h-2 bg-slate-300 rounded-full">
              <div
                style={{
                  backgroundColor: selectedSpaceObj?.color,
                  width:
                    (checked.length / (checked.length + unchecked.length)) *
                      100 +
                    "%",
                }}
                className="h-full rounded-full"
              />
            </div>
            <p className="text-gray-400 text-sm ml-2">
              {checked.length}/{checked.length + unchecked.length}
            </p>
            {/* <div
            className={`w-8 h-8 grid place-items-center rounded-md cursor-pointer hover:bg-gray-300 hover:text-teal-400 text-[#B9C3CE] ${
              visible ? "visible" : "invisible"
            }`}
          >
            <UserPlus />
          </div>
          <Dropdown
            width={140}
            button={
              <div className="flex items-center text-gray-400 p-1.5 rounded-md cursor-pointer hover:bg-gray-300 duration-200">
                <Plus width="12" height="12" className="mr-[2px]" />
                <Smile />
              </div>
            }
            menu={() => (
              <div className="flex gap-2">
                <p className="p-1 bg-gray-100 rounded-md hover:bg-gray-400 duration-150">
                  👍
                </p>
                <p className="p-1 bg-gray-100 rounded-md hover:bg-gray-400 duration-150">
                  😊
                </p>
                <p className="p-1 bg-gray-100 rounded-md hover:bg-gray-400 duration-150">
                  👎
                </p>
                <p className="p-1 bg-gray-100 rounded-md hover:bg-gray-400 duration-150">
                  😎
                </p>
              </div>
            )}
          /> */}
          </div>
        )}
      </div>
      {
        card.modal && (
          <CardModal
            card={card}
            listID={listID}
            noteDone={noteDone}
            progress={progress}
            setProgress={setProgress}
            setBoardModal={toggle_card_modal}
            setNoteDone={setNoteDone}
          />
        )
      }
    </>
  );
};

export default Card;
