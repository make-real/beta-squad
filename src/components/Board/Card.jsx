import { useBoardCardContext } from "../../context/BoardCardContext";
import { CardChip } from ".";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import ConfirmDialog from "./ConfirmDialog";
import { cardUpdateApiCall } from "../../hooks/useFetch";
// import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
// import CardDetails from './CardDetails';
// import { draftJsToHtml } from '../../util/draftJsToHtml';

// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const Card = ({ card, listID }) => {
  const dropDownRef = useRef();
  const [cardSettingDropDownToggle, setCardSettingDropDownToggle] =
    useState(false);
  const { updateCard, toggleCardModal, setCardDetails } = useBoardCardContext();
  const [progress, setProgress] = useState(card?.progress);
  const [visible, setVisible] = useState(false);
  const selectedSpaceObj = useSelector((state) => state.space.selectedSpaceObj);
  const selectedWorkspaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

  const [localCard, setLocalCard] = useState(card);

  // useEffect(() => {
  //     const getCard = async () => {
  //         const { data } = await getSingleCard(
  //             selectedSpaceId,
  //             listID,
  //             card?._id
  //             );
  //             setLocalCard(data?.card);
  //     };

  //     getCard();
  // }, [selectedSpaceId, listID, card?._id]);

  // const progressStatus = (progress) => {
  //     switch (progress) {
  //         case 4:
  //             return 100;
  //         case 3:
  //             return 75;
  //         case 2:
  //             return 50;
  //         case 1:
  //             return 25;
  //         default:
  //             return 0;
  //     }
  // };

  const handleClick = (e) => {
    if (!dropDownRef?.current?.contains(e.target))
      setCardSettingDropDownToggle(false);
  };

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // may be problem
  // useEffect(() => {
  //     const cardProgressUpdate = async () => {
  //         const cardTagObject = { ...card, progress: progress };
  //         try {
  //             const { data } = await cardUpdateApiCall(
  //                 selectedSpaceId,
  //                 listID,
  //                 card._id,
  //                 cardTagObject
  //             );
  //             updateCard(listID, card._id, data.updatedCard);
  //         } catch (error) {
  //             console.log(error?.response?.data?.issue);
  //         }
  //     };
  //     cardProgressUpdate();
  // }, [card, listID, progress, selectedSpaceId, updateCard]);

  const handleProgressUpdate = async () => {
    setProgress((pre) => (pre === 4 ? 0 : 4));

    const cardTagObject = { ...card, progress: progress === 0 ? 4 : 0 };

    try {
      const { data } = await cardUpdateApiCall(
        selectedSpaceId,
        listID,
        card._id,
        cardTagObject
      );
      updateCard(listID, card._id, data.updatedCard);
    } catch (error) {
      console.log(error?.response?.data?.issue?.message);
      // toast.error(`${error?.response?.data?.issue?.message}`, {
      //     autoClose: 3000,
      // });
    }
  };

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
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group relative w-[285px] h-fit bg-white px-3 py-1 rounded-2xl cursor-grab hover:bg-gray-200"
      >
        {/* top-right shape */}
        <span
          className="absolute top-0 left-0 h-4 w-4 rounded-t-[16px] rounded-tr-none rounded-bl-none rounded-br-[10px]"
          style={{ backgroundColor: card?.color }}
        />
        {/* message indicator */}
        {card?.seen === false && (
          <span
            className="absolute -top-1 right-1 h-3 w-3 rounded-full"
            style={{ backgroundColor: "#FF3659" }}
          />
        )}
        <div className="flex justify-between items-center mb-2">
          <div className="py-2 text-white flex gap-1 flex-wrap">
            {card?.tags?.length
              ? card?.tags?.map((tag) => (
                  <CardChip small tag={tag} key={tag?.name} />
                ))
              : null}
          </div>
          <div
            style={{
              backgroundColor: progress === 4 && "#54CC7C",
              // progress === 4
              //     ? '#54CC7C'
              //     : selectedSpaceObj?.color,
            }}
            className={`mt-[2px] flex items-center justify-center w-5 h-5 rounded-full text-white`}
          >
            {progress === 4 && <CheckIcon className="w-4 h-4" />}
            {/* {progress === 4 ? (
                            <CheckIcon className="w-4 h-4" />
                        ) : (
                            <span className="text-[8px] text-center">
                                {progressStatus(progress)}%
                            </span>
                        )} */}
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <p className="text-sm mr-4 text-gray-800 font-bold line-clamp-2">
            {card.name}
          </p>
        </div>
        <div className="text-sm text-gray-800">
          <p className="line-clamp-2">{localCard?.description || ""}</p>
        </div>

        {!!(checked?.length + unchecked?.length) && (
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
              {checked?.length}/{checked?.length + unchecked?.length}
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
        {!!card.assignee?.length && (
          <div className="mb-3 flex pt-2">
            {card.assignee?.map((user, i) => (
              <div style={{ marginLeft: i ? "-5px" : 0 }}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-7 h-7 rounded-full bg-white"
                  />
                ) : (
                  <p className="w-6 h-6 rounded-full bg-white text-black font-bold grid place-items-center">
                    {user?.fullName.charAt(0)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* hover element */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl w-full h-0 flex flex-col justify-center items-center bg-[#031124]/[0.6] opacity-0 group-hover:h-full group-hover:opacity-100 duration-100 ease-in-out">
          <div className="absolute top-2 right-2 grid grid-cols-2 gap-2 place-content-end text-white">
            <span className="cursor-pointer">
              <TrashIcon
                className="w-5 h-5"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmModalOpen(true);
                }}
              />
            </span>
            <span className="cursor-pointer">
              <CheckCircleIcon
                className={`w-5 h-5 ${
                  progress === 4 ? "bg-[#54CC7C] rounded-full" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProgressUpdate();
                }}
              />
            </span>
          </div>

          <Link
            to={`/projects/${selectedWorkspaceId}/squad/${selectedSpaceId}/board/${card._id}`}
          >
            <span className="flex justify-center items-center p-2 rounded-xl bg-[#031124]/[0.4] hover:bg-[#031124]/[0.6] duration-300 text-white cursor-pointer">
              <EyeIcon className="mr-2 w-5 h-5" />
              <p>View</p>
            </span>
          </Link>
        </div>
      </div>

      {confirmModalOpen && (
        <ConfirmDialog
          listID={listID}
          cardID={card._id}
          setConfirmModalOpen={setConfirmModalOpen}
        />
      )}

      {/* {card.modal && (
                <CardModal
                    card={card}
                    listID={listID}
                    noteDone={noteDone}
                    progress={progress}
                    setProgress={setProgress}
                    setBoardModal={toggle_card_modal}
                    setNoteDone={setNoteDone}
                    localCard={localCard}
                    setLocalCard={setLocalCard}
                />
            )} */}
    </>
  );
};

export default Card;
