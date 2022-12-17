// import React from "react";
import { Droppable, Draggable as DraggableElement } from 'react-beautiful-dnd';

const Draggable = ({ showType, elements, render, listId }) => {
    return (
        <Droppable droppableId={listId}>
            {(provided) => (
                <>
                    <div
                        className={`p-1 ${showType === 'stack' ? 'w-full' : ''}`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {elements?.map((item, index) => (
                            <DraggableElement
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                                isDragDisabled={item.modal}
                            >
                                {(provided, snapshot) =>
                                    render({ item, provided, snapshot })
                                }
                            </DraggableElement>
                        ))}
                    </div>
                    {provided.placeholder}
                </>
            )}
        </Droppable>
    );
};

export default Draggable;
