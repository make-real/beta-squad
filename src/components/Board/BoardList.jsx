import { useBoardCardContext } from "../../context/BoardCardContext";
import { AddBtn, Card, BoardListSettingDropDown } from ".";
import { addCardIntoBoardList, boardListUpdate } from "../../hooks/useFetch";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../Dropdown";
import "tippy.js/dist/tippy.css";
import DraggableElement from "../DraggableElement";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCard } from "../../api/board";

const BoardList = ({ showType, listIndex, boardList,setIsDepend,isDepend }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const dispatch = useDispatch();

  const dropDownRef = useRef();
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const seletedTagId = useSelector((state) => state?.TagId?.selectTagId);
  const stateError = useSelector((state) => state?.cardsLists?.error);

  const { updateBoardList } = useBoardCardContext();

  const handleCardCreation = async (text) => {
    setCardLoading(true);
    let cardObject;
    if (seletedTagId) {
      cardObject = { name: text, tagId: seletedTagId._id };
    } else {
      cardObject = { name: text };
    }
    const boardListId = boardList?._id;
    if (boardListId && cardObject) {
      dispatch(
        addCard({
          spaceId: selectedSpaceId,
          listId: boardListId,
          newCard: cardObject,
        })
      )
        .then((data) => {
          if (data) {
            setCardLoading(false);
            if (data?.payload) {
              toast.success(`${data.payload?.card.name} - card created`, {
                autoClose: 2000,
              });
            } else {
              toast.error("Couldn't create a card with duplicate name in the same list!", {
                autoClose: 2000,
              });
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleBoardListUpdate = async (selectedSpaceId, listId, text) => {
    console.log(selectedSpaceId, listId, text)
    try {
      await boardListUpdate(selectedSpaceId, listId, text);
      updateBoardList(listId, text);
      setToggleEdit(false);
      setIsDepend(!isDepend)
      toast.success(`${text} - list updated successfully`, {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error.response);
      toast.error(error?.response?.data?.issue?.message, {
        autoClose: 1000,
      });
    }
  };
  return (
    <>
      <div
          
          className={`w-[300px] mb-2 mr-3 flex flex-col customHScroll bg-[#ECECEC]/[0.4] rounded-2xl pb-4`}
        >
          <div
           
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
                className="text-[#818892] flex-1 py-1 px-4 ml-2 outline-none border rounded-lg hover:border-gray-400 bg-gray-50"
              />
            ) : (
              <p className="text-[#818892] flex-1 py-1 px-4">
                {boardList?.name || "Development"}
              </p>
            )}

            <Dropdown
              position={["bottom right", "top right"]}
              button={
                <span className="cursor-pointer py-1 px-4 text-[#424D5B]">
                  <EllipsisHorizontalIcon className="h-5 w-6" />
                </span>
              }
              width={180}
              style={{ borderRadius: "0.75rem" }}
              menu={({ closePopup }) => (
                <BoardListSettingDropDown
                  close={closePopup}
                  boardListID={boardList?._id}
                  toggleEdit={toggleEdit}
                  setToggleEdit={setToggleEdit}
                  isDepend={isDepend}
                  setIsDepend={setIsDepend}
                />
              )}
            />
          </div>
          <span className="border-[1px] border-[#EEE9E9]" />

          {/* Droppable Component Wrapper */}
          <Droppable droppableId={boardList?._id} type="CARD">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col items-center gap-3 over customScroll  pt-2"
                style={{ maxHeight: "400px" }} // Adjust the max height as needed
              >
                {/* Draggable Elements */}
                {boardList?.cards.map((card, index) => (
                  <Draggable
                    key={card._id}
                    draggableId={card._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-2"
                      >
                        <Card key={card._id} card={card} listID={boardList?._id} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <AddBtn
            loading={cardLoading}
            showType={showType}
            placeHolder="Enter card name"
            btnText="card"
            onSubmit={(text) => handleCardCreation(text)}
          />
        </div>
    </>
  );
};

export default BoardList;
