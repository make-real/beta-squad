import { useBoardCardContext } from "../../context/BoardCardContext";
import { CardModal, CardChip } from ".";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
    TrashIcon,
    EyeIcon,
    CheckCircleIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";
import ConfirmDialog from "./ConfirmDialog";
import { cardUpdateApiCall, getSingleCard } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CardDetails from "./CardDetails";
import { draftJsToHtml } from "../../util/draftJsToHtml";

// generate random color
const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const Card = ({ showType, card, listID }) => {
    const dropDownRef = useRef();
    const [cardSettingDropDownToggle, setCardSettingDropDownToggle] =
        useState(false);
    const { updateCard, toggleCardModal, setCardDetails } =
        useBoardCardContext();
    const [noteDone, setNoteDone] = useState(false);
    const [progress, setProgress] = useState(card?.progress);
    const [visible, setVisible] = useState(false);
    const selectedSpaceObj = useSelector(
        (state) => state.space.selectedSpaceObj
    );
    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

    const [localCard, setLocalCard] = useState({});

    useEffect(() => {
        const getCard = async () => {
            const { data } = await getSingleCard(
                selectedSpaceId,
                listID,
                card?._id
            );
            setLocalCard(data?.card);
        };

        getCard();
    }, [selectedSpaceId, listID, card?._id]);

    console.log({ localCard });

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
            toast.error(`${error?.response?.data?.issue?.message}`, {
                autoClose: 3000,
            });
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
                className="group relative w-[285px] h-fit bg-white px-3 py-3 rounded-2xl cursor-grab hover:bg-gray-200"
            >
                {/* top-right shape */}
                <span
                    className="absolute top-0 left-0 h-4 w-4 rounded-t-[16px] rounded-tr-none rounded-bl-none rounded-br-[10px]"
                    style={{ backgroundColor: randomColor() }}
                />
                {/* message indicator */}
                <span
                    className="absolute -top-1 right-1 h-3 w-3 rounded-full"
                    style={{ backgroundColor: randomColor() }}
                />

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

                <div className="flex justify-between items-center">
                    <p className="text-sm mr-4 mb-2 text-gray-800 font-bold">
                        {card.name}
                    </p>

                    <div
                        style={{
                            backgroundColor:
                                progress === 4
                                    ? selectedSpaceObj?.color
                                    : "grey",
                        }}
                        className={`mt-[2px] flex items-center justify-center w-5 h-5 rounded-full text-white`}
                    >
                        {progress === 4 ? (
                            <CheckIcon className="w-4 h-4" />
                        ) : (
                            <span className="text-[8px] text-center">
                                {progressStatus(progress)}%
                            </span>
                        )}
                    </div>
                </div>
                <div
                    className="text-sm text-gray-800"
                    dangerouslySetInnerHTML={{
                        __html: draftJsToHtml(localCard?.description || ""),
                    }}
                />
                <div className="pt-5 text-white flex gap-1 flex-wrap">
                    {card?.tags?.length
                        ? card?.tags?.map((tag) => (
                              <CardChip small tag={tag} key={tag?.name} />
                          ))
                        : null}
                </div>

                <div className="absolute top-2 right-2 flex">
                    {/* {!!progress && (
                        <div
                            style={{
                                backgroundColor:
                                    progress === 4
                                        ? selectedSpaceObj?.color
                                        : 'grey',
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
                    )} */}
                    {/* {visible && (
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
                                    setCardSettingDropDownToggle={
                                        setCardSettingDropDownToggle
                                    }
                                />
                            )}
                        />
                    )} */}
                </div>

                {!!(checked.length + unchecked.length) && (
                    <div className="relative flex items-center mt-3">
                        <div className="relative flex w-[100px] h-2 bg-slate-300 rounded-full">
                            <div
                                style={{
                                    backgroundColor: selectedSpaceObj?.color,
                                    width:
                                        (checked.length /
                                            (checked.length +
                                                unchecked.length)) *
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

                {/* hover element */}
                <div className="absolute top-0 left-0 rounded-2xl w-full h-0 flex flex-col justify-center items-center bg-[#031124]/[0.6] opacity-0 group-hover:h-full group-hover:opacity-100">
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
                                className="w-5 h-5"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleProgressUpdate();
                                }}
                            />
                        </span>
                    </div>

                    <Link
                        onClick={() => {
                            // toggle_card_modal();
                            setCardDetails({
                                card: card,
                                listID: listID,
                                noteDone: noteDone,
                                progress: progress,
                                setProgress: setProgress,
                                setBoardModal: toggle_card_modal,
                                setNoteDone: setNoteDone,
                                localCard: localCard,
                                setLocalCard: setLocalCard,
                            });
                        }}
                        to={`/projects/board/${card._id}`}
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
                />
            )} */}
        </>
    );
};

export default Card;
