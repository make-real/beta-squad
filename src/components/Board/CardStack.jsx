import { useBoardCardContext } from '../../context/BoardCardContext';
import { CardModal, CardChip } from '.';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    TrashIcon,
    EyeIcon,
    CheckCircleIcon,
    CheckIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import ConfirmDialog from './ConfirmDialog';
import { cardUpdateApiCall, getSingleCard } from '../../hooks/useFetch';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CardDetails from './CardDetails';
import { draftJsToHtml } from '../../util/draftJsToHtml';
import TaskDatePicker from '../TaskDatePicker';
import { formatDate } from '../../util/date';
import Dropdown from '../Dropdown';

// generate random color
const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const CardStack = ({
    showType,
    listName,
    card,
    listID,
    handleDataChange = () => {},
}) => {
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
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const toggle_card_modal = () => {
        console.log('taggling........');
        toggleCardModal(listID, card._id);
    };

    const checked = card.checkList?.filter((item) => item?.checked);
    const unchecked = card.checkList?.filter((item) => !item?.checked);

    const changeDate = async (date, card) => {
        const cardCopy = {
            ...localCard,
            startDate: date.start,
            endDate: date.end,
        };
        setLocalCard(cardCopy);
        try {
            await cardUpdateApiCall(
                selectedSpaceId,
                listID,
                card._id,
                cardCopy
            );
            handleDataChange();
        } catch (error) {
            console.log(error.response.data.issue);
        }
    };

    return (
        <div className="relative group bg-[#ECECEC]/[0.4] w-full flex justify-between items-center p-2 rounded-2xl">
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

            {/* card name */}
            <div style={{ width: '25%' }}>
                <p className="text-sm text-gray-800 font-bold">{card.name}</p>
            </div>

            {/* assign */}
            <div className="flex" style={{ width: '25%' }}>
                {card.assignee?.map((user, i) => (
                    <div style={{ marginLeft: i ? '-5px' : 0 }}>
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

            {/* date */}
            <div
                style={{ width: '20%' }}
                className="relative cursor-pointer space-x-2 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-lg text-gray-400"
            >
                <Dropdown
                    width={418}
                    button={
                        localCard.startDate ? (
                            <div className="p-2 text-center rounded-lg duration-200 text-sm text-[#3699E0] bg-[#EDF7FF] hover:bg-gray-300">
                                {formatDate(localCard.startDate, 'MMM, dd')} -{' '}
                                {formatDate(localCard.endDate, 'MMM, dd')}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between text-[#3699E0] bg-[#EDF7FF] hover:bg-gray-300 p-2 rounded-lg text-sm">
                                <p className="mr-2">Start - End</p>
                                <CalendarDaysIcon className="w-[14px] h-[14px] leading-5" />
                            </div>
                        )
                    }
                    menu={({ closePopup }) => (
                        <TaskDatePicker
                            startDate={localCard?.startDate}
                            endDate={localCard?.endDate}
                            onChange={(date) => {
                                closePopup();
                                changeDate(date, localCard);
                            }}
                            close={closePopup}
                        />
                    )}
                />
            </div>

            {/* progress */}
            <div
                style={{ width: '5%' }}
                className="flex justify-center items-center"
            >
                <div
                    style={{
                        backgroundColor:
                            progress === 4 ? selectedSpaceObj?.color : 'grey',
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

            <div style={{ width: '20%' }}>
                <p>{listName}</p>
            </div>

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

            {confirmModalOpen && (
                <ConfirmDialog
                    listID={listID}
                    cardID={card._id}
                    setConfirmModalOpen={setConfirmModalOpen}
                />
            )}

        </div>
    );
};

export default CardStack;