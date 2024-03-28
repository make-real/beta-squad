import { useBoardCardContext } from "../../context/BoardCardContext";
import { AddBtn } from ".";
import { addCardIntoBoardList } from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "tippy.js/dist/tippy.css";
import DraggableElement from "../DraggableElement";
import CardStack from "./CardStack";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import useCollapse from "react-collapsed";

const BoardStackList = ({ showType, listIndex, boardList ,reload}) => {
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

  const { addCard } = useBoardCardContext();

  const [expanded, setExpanded] = useState(false);
  const { getToggleProps, getCollapseProps } = useCollapse({ expanded });
  const [showAddBtn, setShowAddBtn] = useState(false);

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
    closed: { opacity: 0, y: "-100%" },
  };

  // There is a issue of scrolling

  return (
    <Draggable draggableId={boardList?._id} index={listIndex}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`w-full mb-1 flex flex-col bg-[#ECECEC]/[0.4] p-1 rounded-2xl `}
        >
          <div
            className="overflow-hidden flex justify-between items-center my-2 py-1 px-4"
            // ref={dropDownRef}
          >
            <p {...provided.dragHandleProps} className="text-[#818892]">
              {boardList?.name || "Development"}
            </p>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowAddBtn(!showAddBtn)}
                className="flex justify-between items-center text-[#818892]"
              >
                <PlusIcon className="w-4 h-4" />{" "}
                <p className="text-[15px] font-[200] ml-2">Add card</p>
              </button>

              <button
                {...getToggleProps({
                  onClick: () => setExpanded((x) => !x),
                })}
                className="ml-5"
              >
                {expanded ? (
                  <ChevronUpIcon className="w-5 h-5 text-[#818892] delay-700" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-[#818892] delay-700" />
                )}
              </button>
            </div>
          </div>

          <div
            {...getCollapseProps()}
            className="flex flex-col items-center gap-3 overflow-y-auto  pt-1 w-full border-t border-[#EEE9E9]"
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
                  className="mb-1 w-full"
                >
                  <motion.div
                    animate={expanded ? "open" : "closed"}
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

          {showAddBtn && (
            <AddBtn
              showType={showType}
              placeHolder="Enter card name"
              btnText="card"
              onSubmit={(text) => handleCardCreation(text)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default BoardStackList;
