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
  const { updateCard } = useBoardCardContext();
  const [cardModal, setCardModal] = useState(false);
  const [noteDone, setNoteDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [progress, setProgress] = useState(0 || card.progress);
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
    // track out-side of click... & close setting drop down div...
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
    // when progress change, call this update function...
  }, [progress]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div
        // draggable
        ref={dropDownRef}
        onClick={() => setCardModal(true)}
        // onMouseEnter={() => setVisible(true)}
        // onMouseLeave={() => setVisible(false)}
        // onDragEnd={() => handleDragEnd(listID, card._id)}
        // onDragEnter={() => handleDragEnter(listID, card._id)}
        className="relative w-[275px] h-fit bg-white px-3 py-3 rounded-md border-t-4 cursor-grab hover:bg-gray-200"
        style={{ borderColor: selectedSpaceObj?.color }}
      >
        <p className="text-lg mr-4 text-gray-800">{card.name}</p>
        <div className="pt-2 text-white flex gap-1 flex-wrap">
          {card?.tags?.length
            ? card?.tags?.map((tag) => (
                <CardChip small tag={tag} key={tag?.name} />
              ))
            : null}
        </div>

        <div className="absolute top-4 right-3 flex">
          {visible ? (
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
                  cardModal={cardModal}
                  setNoteDone={setNoteDone}
                  setCardSettingDropDownToggle={setCardSettingDropDownToggle}
                />
              )}
            />
          ) : (
            noteDone && (
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-white
              ${
                progressStatus(progress) === 100
                  ? "bg-teal-400"
                  : " bg-gray-400"
              }`}
              >
                {progressStatus(progress) === 100 ? (
                  <RightOK />
                ) : (
                  <span className="text-xs text-center">
                    {progressStatus(progress)}%
                  </span>
                )}
              </div>
            )
          )}
        </div>

        <div className="relative flex items-center justify-between mt-3">
          <div
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
          />
        </div>

        {
          // When Task Click >>> then Modal Open
          cardModal && (
            <CardModal
              card={card}
              listID={listID}
              noteDone={noteDone}
              progress={progress}
              setProgress={setProgress}
              setBoardModal={setCardModal}
              setNoteDone={setNoteDone}
            />
          )
        }
      </div>
    </>
  );
};

export default Card;
