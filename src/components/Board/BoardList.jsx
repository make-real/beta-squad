import { useBoardCardContext } from "../../context/BoardCardContext";
import { AddBtn, Card, BoardListSettingDropDown } from ".";
import { useRef } from "react";
import { DotsSingle } from "../../assets/icons";
import Dropdown from "../Dropdown";

const BoardList = ({ boardList }) => {
  const dropDownRef = useRef();
  const { addCard } = useBoardCardContext();

  return (
    <div className={`w-[300px] min-h-full rounded-lg mb-2 mr-3 flex flex-col`}>
      <div
        className="overflow-hidden bg-gray-100 flex items-center justify-between p-4 rounded-t-lg"
        ref={dropDownRef}
      >
        <p className="text-gray-500 text-lg">
          {boardList?.name || "New List"} - {boardList?.cards?.length || 0}
        </p>
        <Dropdown
          button={
            <DotsSingle className="text-gray-500 cursor-pointer w-8 h-8 p-2 rounded-lg hover:bg-gray-200 duration-200" />
          }
        >
          <BoardListSettingDropDown boardListID={boardList?.id} />
        </Dropdown>
      </div>
      <div className="bg-gray-100 pb-4 flex flex-col items-center gap-3 overflow-y-auto customScroll">
        {boardList?.cards?.map((card) => (
          <Card key={card.id} card={card} listID={boardList?.id} />
        ))}
      </div>
      <AddBtn
        placeHolder="Add card name..."
        btnText="card"
        onSubmit={(cardName) => addCard(cardName, boardList?.id)}
      />
    </div>
  );
};

export default BoardList;
