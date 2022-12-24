import { useBoardCardContext } from '../../context/BoardCardContext';
import {
    addBoardListApiCall,
    moveCard,
    updateCardOrder,
} from '../../hooks/useFetch';
import { AddBtn, BoardList } from '.';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useAxios from '../../api/index';
import images from '../../assets';
import { useSelector } from 'react-redux';
import { filterStatus } from '../../store/slice/board';
import BoardStackList from './BoardStackList';

const Board = ({ selectedSpaceId, showType }) => {
    const { handleDragEnd, boardLists, setBoardList, addBoardList } =
        useBoardCardContext();
    const { filter } = useSelector((state) => state.board);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedSpaceId) {
                    const { data } = await useAxios.get(
                        `/spaces/${selectedSpaceId}/board?getCards=true`
                    );

                    setBoardList(data.lists?.reverse()?.slice(0));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [selectedSpaceId, setBoardList]);

    const [listLoading, setListLoading] = useState(false);

    const handleBoardListCreation = async (selectedSpaceId, text) => {
        const listObject = { name: text };
        setListLoading(true);

        try {
            const { data } = await addBoardListApiCall(
                selectedSpaceId,
                listObject
            );
            setListLoading(false);
            addBoardList(data.list);

            toast.success(`${data?.list?.name} - list create successfully`, {
                autoClose: 3000,
            });
        } catch (error) {
            console.log(error.response.data);

            setListLoading(false);
            toast.error(error?.response?.data?.issue?.message, {
                autoClose: 3000,
            });
        }
    };

    const dragEnd = async (result) => {
        const { destination, source, draggableId, type } = result;

        try {
            handleDragEnd(
                {
                    target: destination.droppableId,
                    targetIndex: destination.index,
                },
                {
                    source: source.droppableId,
                    sourceIndex: source.index,
                },
                type
            );

            if (type === 'column') {
                console.log(result);
            } else if (destination.droppableId === source.droppableId) {
                await updateCardOrder(
                    selectedSpaceId,
                    source.droppableId,
                    draggableId,
                    Number(destination.index) + 1
                );
            } else {
                await moveCard(
                    selectedSpaceId,
                    source.droppableId,
                    draggableId,
                    destination.droppableId,
                    Number(destination.index) + 1
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const filterdBoardList = () => {
        let boardCopy = [...boardLists];

        boardCopy = boardCopy.map((brd) => {
            const filteredCard = brd?.cards?.filter((card) => {
                if (filter.assignee.length) {
                    let exist = false;
                    card.assignee.forEach((assignee) => {
                        if (!exist) {
                            exist = filter.assignee.includes(assignee?._id);
                        }
                    });
                    return exist;
                } else {
                    return true;
                }
            });
            return { ...brd, cards: filteredCard };
        });

        boardCopy = boardCopy.map((brd) => {
            const filteredCard = brd?.cards?.filter((card) => {
                if (filter.tags.length) {
                    let exist = false;
                    card.tags.forEach((tag) => {
                        if (!exist) {
                            exist = filter.tags.includes(tag?._id);
                        }
                    });
                    return exist;
                } else {
                    return true;
                }
            });
            return { ...brd, cards: filteredCard };
        });

        boardCopy = boardCopy.map((brd) => {
            let filteredCard = brd.cards;
            if (filterStatus[filter.status] === 0) {
                filteredCard = brd?.cards?.filter(
                    (card) => card.progress === 0
                );
            } else if (filterStatus[filter.status] === 4) {
                filteredCard = brd?.cards?.filter(
                    (card) => card.progress === 4
                );
            } else if (filterStatus[filter.status] === -1) {
                filteredCard = brd?.cards?.filter(
                    (card) => card.progress < 4 && card.progress > 0
                );
            }
            return { ...brd, cards: filteredCard };
        });

        return boardCopy;
    };

    // reduce problem
    // console.log(filterdBoardList()?.slice(0)?.reverse());

    return (
        <section className={`duration-200 overflow-auto customScroll h-full`}>
            {selectedSpaceId ? (
                showType === 'grid' ? (
                    <div className="py-4 flex gap-3 items-start  min-w-fit h-[98vh]">
                        <DragDropContext onDragEnd={dragEnd}>
                            <Droppable
                                droppableId="all-columns"
                                direction="horizontal"
                                type="column"
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="flex items-start"
                                    >
                                        {filterdBoardList()?.map(
                                            (boardList, index) => (
                                                <BoardList
                                                    showType={showType}
                                                    key={boardList?._id}
                                                    boardList={boardList}
                                                    listIndex={index}
                                                />
                                            )
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                        {/*  + Add a list | Button UI */}
                        <AddBtn
                            loading={listLoading}
                            showType={showType}
                            placeHolder="Add list name..."
                            btnText="list"
                            onSubmit={(text) =>
                                handleBoardListCreation(selectedSpaceId, text)
                            }
                        />
                    </div>
                ) : (
                    <div className="py-4 flex flex-col gap-3 items-start  min-w-fit h-[98vh]">
                        <DragDropContext onDragEnd={dragEnd}>
                            <Droppable
                                droppableId="all-columns"
                                direction="horizontal"
                                type="column"
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="flex flex-col items-start w-full"
                                    >
                                        {filterdBoardList()?.map(
                                            (boardList, index) => (
                                                <BoardStackList
                                                    showType={showType}
                                                    key={boardList?._id}
                                                    boardList={boardList}
                                                    listIndex={index}
                                                />
                                            )
                                        )}{' '}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                        {/*  + Add a list | Button UI */}
                        <AddBtn
                            loading={listLoading}
                            showType={showType}
                            placeHolder="Add list name..."
                            btnText="list"
                            onSubmit={(text) =>
                                handleBoardListCreation(selectedSpaceId, text)
                            }
                        />
                    </div>
                )
            ) : (
                <div className="h-[100vh] w-[calc(100vw - 325px)] flex justify-center flex-col items-center">
                    <img
                        src={images.chattingStart}
                        alt=""
                        className="w-36 mx-auto"
                    />
                    <h2 className="text-2xl font-bold">What a quiet team!</h2>
                    <p className="text-center max-w-[400px]">
                        Don’t be shy, create a space to start communication with
                        your team mates.
                    </p>
                </div>
            )}
        </section>
    );
};

export default Board;
