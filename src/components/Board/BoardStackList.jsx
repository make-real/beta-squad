import { useBoardCardContext } from '../../context/BoardCardContext';
import { AddBtn } from '.';
import { addCardIntoBoardList } from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import Tippy from '@tippyjs/react';
// import useAxios from '../../api';
import 'tippy.js/dist/tippy.css';
import DraggableElement from '../DraggableElement';
import CardStack from './CardStack';
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import useCollapse from 'react-collapsed';

const BoardStackList = ({ showType, listIndex, boardList }) => {
    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

    const { addCard } = useBoardCardContext();

    const [expanded, setExpanded] = useState(false);
    const { getToggleProps, getCollapseProps } = useCollapse({ expanded });

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

    const menuVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: '-100%' },
    };

    return (
        <Draggable draggableId={boardList?._id} index={listIndex}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={`w-full mb-2 flex flex-col bg-[#ECECEC]/[0.4] p-2 rounded-2xl`}
                >
                    <div
                        {...provided.dragHandleProps}
                        {...getToggleProps({
                            onClick: () => setExpanded((x) => !x),
                        })}
                        className="overflow-hidden flex justify-between items-center my-3 py-1 px-4"
                        // ref={dropDownRef}
                    >
                        <p className="text-[#818892]">
                            {boardList?.name || 'Development'}
                        </p>

                        <div>
                            {expanded ? (
                                <ChevronUpIcon className="w-5 h-5 text-[#818892] delay-700" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5 text-[#818892] delay-700" />
                            )}
                        </div>
                    </div>
                    <span className="border-[1px] border-[#EEE9E9]" />
                    <div
                        {...getCollapseProps()}
                        className="flex flex-col items-center gap-3 overflow-y-auto customScroll pt-1 w-full"
                    >
                        <DraggableElement
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
                                    <motion.div
                                        animate={expanded ? 'open' : 'closed'}
                                        variants={menuVariants}
                                    >
                                        <CardStack
                                            showType={showType}
                                            key={card._id}
                                            listName={boardList?.name}
                                            card={card}
                                            listID={boardList?._id}
                                        />
                                    </motion.div>
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
            )}
        </Draggable>
    );
};

export default BoardStackList;
