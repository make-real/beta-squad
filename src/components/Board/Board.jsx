import { useBoardCardContext } from '../../context/BoardCardContext';
import { addBoardListApiCall, moveCard } from '../../hooks/useFetch';
import { AddBtn, BoardList } from '.';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
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

                    setBoardList(data.lists);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [selectedSpaceId, setBoardList]);

    const handleBoardListCreation = async (selectedSpaceId, text) => {
        const listObject = { name: text };

        try {
            const { data } = await addBoardListApiCall(
                selectedSpaceId,
                listObject
            );

            addBoardList(data.list);

            toast.success(`${data?.list?.name} - list create successfully`, {
                autoClose: 3000,
            });
        } catch (error) {
            console.log(error.response.data);

            toast.error(error?.response?.data?.issue?.message, {
                autoClose: 3000,
            });
        }
    };

    const dragEnd = async (result) => {
        try {
            handleDragEnd(
                {
                    target: result.destination.droppableId,
                    targetIndex: result.destination.index,
                },
                {
                    source: result.source.droppableId,
                    sourceIndex: result.source.index,
                }
            );
            await moveCard(
                selectedSpaceId,
                result.source.droppableId,
                result.draggableId,
                result.destination.droppableId
            );
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

    return (
        <section className={`duration-200 overflow-auto customScroll`}>
            {selectedSpaceId ? (
                showType === 'grid' ? (
                    <div className="py-4 flex gap-3 items-start  min-w-fit h-[98vh]">
                        <DragDropContext onDragEnd={dragEnd}>
                            {filterdBoardList()
                                ?.slice(0)
                                ?.reverse()
                                ?.map((boardList) => (
                                    <BoardList
                                        showType={showType}
                                        key={boardList?._id}
                                        boardList={boardList}
                                    />
                                ))}
                        </DragDropContext>

                        {/*  + Add a list | Button UI */}
                        <AddBtn
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
                            {filterdBoardList()
                                ?.slice(0)
                                ?.reverse()
                                ?.map((boardList) => (
                                    <BoardStackList
                                        showType={showType}
                                        key={boardList?._id}
                                        boardList={boardList}
                                    />
                                ))}
                        </DragDropContext>

                        {/*  + Add a list | Button UI */}
                        <AddBtn
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
