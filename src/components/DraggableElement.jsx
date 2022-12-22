// import React from "react";
import { Droppable, Draggable } from 'react-beautiful-dnd';

const DraggableElement = ({ showType, elements, render, listId }) => {
    return (
        <Droppable droppableId={listId} type="task">
            {(provided) => (
                <>
                    <div
                        className={`p-1 ${
                            showType === 'stack' ? 'w-full' : ''
                        }`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {elements?.map((item, index) => (
                            <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                                isDragDisabled={item.modal}
                            >
                                {(provided, snapshot) =>
                                    render({ item, provided, snapshot })
                                }
                            </Draggable>
                        ))}
                    </div>
                    {provided.placeholder}
                </>
            )}
        </Droppable>
    );
};

export default DraggableElement;
