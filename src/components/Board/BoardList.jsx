import { useBoardCardContext } from '../../context/BoardCardContext';
import { AddBtn, Card, BoardListSettingDropDown } from '.';
import { addCardIntoBoardList, boardListUpdate } from '../../hooks/useFetch';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import Dropdown from '../Dropdown';
// import Tippy from '@tippyjs/react';
// import useAxios from '../../api';
import 'tippy.js/dist/tippy.css';
import DraggableElement from '../DraggableElement';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

const BoardList = ({ showType, listIndex, boardList }) => {
    const [toggleEdit, setToggleEdit] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);

    const dropDownRef = useRef();
    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
    const seletedTagId = useSelector((state)=>state?.TagId?.selectTagId )

    const { addCard, updateBoardList } = useBoardCardContext();
    
    // POST Method || add card inside board list...
    const handleCardCreation = async (text) => {
        setCardLoading(true);
        let cardObject
        if (seletedTagId) {
             cardObject = { name: text, tagId:seletedTagId };
        }else{
            cardObject = { name: text, };
        }
        
    
        
       

        try {
            // its a POST method | object send into backend/server
            const  {data} = await addCardIntoBoardList(
                selectedSpaceId,
                boardList?._id,
                cardObject
            );

            // update user UI...
            console.log(data)
            addCard(data?.card, boardList?._id);

            setCardLoading(false);
            // display a notification for user
            // toast.success(`${data?.card?.name} - card created`, {
            //     autoClose: 3000,
            // });
        } catch (error) {
            // error for developer for deBugging...
            console.log(error);

            setCardLoading(false);

            // error for user at notification...
            toast.error(error?.response?.data?.issue?.message, {
                autoClose: 3000,
            });
        }
    };

    const handleBoardListUpdate = async (selectedSpaceId, listId, text) => {
        try {
            await boardListUpdate(selectedSpaceId, listId, text);

            updateBoardList(listId, text);

            setToggleEdit(false);

            // toast.success(`${text} - list updated successfully`, {
            //     autoClose: 3000,
            // });
        } catch (error) {
            console.log(error.response);

            // toast.error(error?.response?.data?.issue?.message, {
            //     autoClose: 3000,
            // });
        }
    };

    return (
        <Draggable draggableId={boardList?._id} index={listIndex}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={`w-[300px] mb-2 mr-3 flex flex-col bg-[#ECECEC]/[0.4] rounded-2xl pb-4`}
                >  
                    <div
                        {...provided.dragHandleProps}
                        className="overflow-hidden  flex justify-between items-center my-3"
                        ref={dropDownRef}
                    >
                        {toggleEdit ? (
                            <input
                                autoFocus
                                type="text"
                                defaultValue={boardList?.name}
                                onBlur={(e) =>
                                    handleBoardListUpdate(
                                        selectedSpaceId,
                                        boardList?._id,
                                        e.target.value
                                    )
                                }
                                // onChange={(e) =>
                                //     setLocalCard((pre) => ({
                                //         ...pre,
                                //         name: e.target.value,
                                //     }))
                                // }
                                // onKeyDown={handle_card_name_update_enter_btn}
                                className="text-[#818892] flex-1 py-1 px-4 ml-2 outline-none border rounded-lg hover:border-gray-400 bg-gray-50"
                            />
                        ) : (
                            <p className="text-[#818892] flex-1 py-1 px-4">
                                {boardList?.name || 'Development'}
                                
                            </p>
                        )}

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
                                    toggleEdit={toggleEdit}
                                    setToggleEdit={setToggleEdit}
                                />
                            )}
                        />
                    </div>
                    <span className="border-[1px] border-[#EEE9E9]" />
                    <div className="flex flex-col items-center gap-3 overflow-hidden customScroll pt-2">
                        <DraggableElement
                            listId={boardList?._id}
                            elements={boardList?.cards}
                            render={({ item: card, provided, snapshot }) => (
                                <div
                                    ref={provided.innerRef}
                                    snapshot={snapshot}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-2"
                                >
                                    <Card
                                        key={card._id}
                                        card={card}
                                        listID={boardList?._id}
                                    />
                                </div>
                            )}
                        />
                    </div>

                    <AddBtn
                        loading={cardLoading}
                        showType={showType}
                        placeHolder="Enter card name"
                        btnText="card"
                        onSubmit={(text) => handleCardCreation(text)}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default BoardList;
