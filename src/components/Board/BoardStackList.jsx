import { useBoardCardContext } from '../../context/BoardCardContext';
import { AddBtn, Card, BoardListSettingDropDown } from '.';
import { addCardIntoBoardList } from '../../hooks/useFetch';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Dropdown from '../Dropdown';
// import Tippy from '@tippyjs/react';
// import useAxios from '../../api';
import 'tippy.js/dist/tippy.css';
import Draggable from '../Draggable';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import CardStack from './CardStack';

const BoardStackList = ({ showType, boardList }) => {
    const dropDownRef = useRef();
    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

    const { addCard } = useBoardCardContext();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // GET Method ==> Card --- under specific Space reference ID + board list reference
    //             const { data } = await useAxios.get(
    //                 `/spaces/${selectedSpaceId}/board/${boardList?._id}/card`
    //             );

    //             // get updated card all the time...
    //             // console.log(data)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchData();
    // }, [selectedSpaceId, boardList?._id]);

    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
    // POST Method || add card inside board list...
    const handleCardCreation = async (text) => {
        const cardObject = { name: text };

        try {
            // its a POST method | object send into backend/server
            const { data } = await addCardIntoBoardList(
                selectedSpaceId,
                boardList?._id,
                cardObject
            );

            // update user UI...
            addCard(data?.card, boardList?._id);

            // display a notification for user
            toast.success(`${data?.card?.name} - card created`, {
                autoClose: 3000,
            });
        } catch (error) {
            // error for developer for deBugging...
            console.log(error);

            // error for user at notification...
            toast.error(error?.response?.data?.issue?.message, {
                autoClose: 3000,
            });
        }
    };

    return (
        <div className={`w-full mb-2 flex flex-col`}>
            {/* <div className="flex justify-between items-center">
                <p>Card name</p>
                <p>Assign</p>
                <p>Date</p>
                <p>Progress</p>
                <p>List</p>
            </div>
            <div className="flex justify-between items-center">
                <p>{boardList?.name || 'New List'}</p>
                <p>Assign</p>
                <p>Date</p>
                <p>Progress</p>
                <p>List</p>
            </div> */}
            {/* <div
                className="overflow-hidden flex justify-between items-center my-3"
                ref={dropDownRef}
            >
                <p className="text-[#818892] flex-1 py-1 px-4">
                    {boardList?.name || 'New List'}
                </p>

                <Dropdown
                    position={['bottom right', 'top right']}
                    button={
                        <span className="cursor-pointer py-1 px-4 text-[#424D5B]">
                            <EllipsisHorizontalIcon className="h-5 w-6" />
                        </span>
                    }
                    width={180}
                    style={{ borderRadius: '0.75rem' }}
                    menu={({ closePopup }) => (
                        <BoardListSettingDropDown
                            close={closePopup}
                            boardListID={boardList?._id}
                        />
                    )}
                />
            </div>

            <span className="border-[1px] border-[#EEE9E9]" />
 */}
            <div className="flex flex-col items-center gap-3 overflow-y-auto customScroll pt-3 w-full">
                <Draggable
                    showType={showType}
                    listId={boardList?._id}
                    elements={boardList?.cards}
                    render={({ item: card, provided, snapshot }) => (
                        <div
                            ref={provided.innerRef}
                            snapshot={snapshot}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2 w-full"
                        >
                            <CardStack
                                showType={showType}
                                key={card._id}
                                listName={boardList?.name}
                                card={card}
                                listID={boardList?._id}
                            />
                        </div>
                    )}
                />
            </div>

            <div className="bg-[#ECECEC]/[0.4] rounded-2xl">
                <AddBtn
                    showType={showType}
                    placeHolder="Enter card name"
                    btnText="card"
                    onSubmit={(text) => handleCardCreation(text)}
                />
            </div>
        </div>
    );
};

export default BoardStackList;
