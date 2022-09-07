import {
  ArrowRight,
  Attachment,
  CheckList,
  Close,
  Description,
  DotsSingle,
  EyeOpen,
  RightOK,
  Tag,
  UserPlus,
} from "../../assets/icons";
import { useBoardCardContext } from "../../context/BoardCardContext";
import { create_tag, get_tags } from "../../api/tags";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CardSettingDropDown } from ".";
import { cardUpdateApiCall, createChecklistItem } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import Dropdown from "../Dropdown";


const Progress = ({ progress, setProgress }) => {

  const [previewProgress, setPreviewProgress] = useState(0);

  const handleProgressChange = (v) => () => setProgress(v);
  const handlePreviewProgressChange = (v) => () => setPreviewProgress(v);

  return (
    <>
      {[...Array(5).keys()].map((itemIndex) => (
        <div
          key={itemIndex}
          onMouseOver={handlePreviewProgressChange(itemIndex)}
          onClick={handleProgressChange(itemIndex)}
          onMouseOut={handlePreviewProgressChange(0)}
          className={getStatusClassName(itemIndex)}
        >
          {itemIndex * 25}%
        </div>
      ))}
    </>
  );

  function getStatusClassName(itemIndex) {
    return `p-2 duration-300 ${progress >= itemIndex || previewProgress >= itemIndex
      ? "bg-teal-500"
      : "bg-gray-200"
      } rounded-lg cursor-pointer ${progress >= itemIndex || previewProgress >= itemIndex
        ? "text-white"
        : "bg-gray-200"
      } ${itemIndex === 0
        ? "rounded-tl-3xl rounded-bl-3xl"
        : itemIndex === 4
          ? "rounded-tr-3xl rounded-br-3xl"
          : ""
      }`;
  }
};


// This <Component /> called by 🟨🟨🟨 Card.jsx 🟨🟨🟨
const CardModal = ({ setBoardModal, noteDone, setNoteDone, card, listID, progress, setProgress }) => {

  const [localCard, setLocalCard] = useState(card);
  const { updateCard, boardLists } = useBoardCardContext();
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const selectedSpace = useSelector((state) => state.space.selectedSpaceObj);
  const userSelectedWorkSpaceId = useSelector((state) => state.workspace.selectedWorkspace);
  const nameOfBoardList = boardLists.find(({ _id }) => _id === listID).name;

  const [showTags, setShowTags] = useState(false);
  const [tagsFromAPI, setTagsFromAPI] = useState([]);
  const [modalActionToggling, setModalActionToggling] = useState(false);
  const [createNewTag, setCreateNewTag] = useState({
    name: "",
    color: "#47b9ea",
  });

  const [checkListItem, setCheckListItem] = useState({
    // id: Date.now() + Math.random(),
    check: false,
    content: '',
  })

  const [newCheckListItemJSX, setNewCheckListItemJSX] = useState(false);

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  // user esc key press Event Listener for closing modal...
  useEffect(() => {
    const handleEscapeKeyPress = e => {
      if (e.code === "Escape") setBoardModal(false);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, [setBoardModal]);

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  // CardInfo Modal Data Update when user input new data...
  useEffect(
    () => updateCard(listID, card._id, localCard),
    [listID, card._id, localCard]
  );

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  useEffect(() => {
    const getTags = async () => {
      try {
        // GET Method || For fetching all tag's under specific workShop
        const { data } = await get_tags(userSelectedWorkSpaceId);
        setTagsFromAPI(data?.tags);
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
  }, [userSelectedWorkSpaceId, createNewTag]);

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  const handleAddTags = async (tag) => {
    // add for display at UI
    setLocalCard((pre) => ({ ...pre, tags: [...pre.tags, tag] }));

    // remove from drop-down ui of tag's list
    setTagsFromAPI((pre) => pre.filter((data) => data?._id !== tag?._id));

    const cardTagObject = { ...localCard, tagId: tag._id }

    try {
      const { data } = await cardUpdateApiCall(selectedSpaceId, listID, card._id, cardTagObject)

      updateCard(listID, card._id, data.updatedCard);
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
  };

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  const handleDeleteTags = async (tag) => {

    // add for display at UI
    setLocalCard((pre) => ({ ...pre, tags: pre.tags.filter(({ _id }) => _id !== tag._id) }));

    // remove from drop-down ui of tag's list
    setTagsFromAPI((pre) => [...pre, tag]);

    const tempTagObject = { ...localCard }
    const cardTagRemoved = { ...tempTagObject, removeTagId: tag._id }

    try {
      const { data } = await cardUpdateApiCall(selectedSpaceId, listID, card._id, cardTagRemoved)

      updateCard(listID, card._id, data.updatedCard);
    } catch (error) {
      // error for user at notification...
      toast.error(error?.response?.data?.issue, { autoClose: 3000 });
      console.log(error?.response?.data?.issue);
    }

  };

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  const handleNewTagCreation = async (e) => {
    e.preventDefault();

    try {
      // POST Method for creating tag's inside a specific workSpace
      const { data } = await create_tag({ workSpaceId: userSelectedWorkSpaceId, ...createNewTag });
      // setSetTagsIntoCard((pre) => [...pre, data.tag]);
      setLocalCard((pre) => ({ ...pre, tags: [...pre.tags, data.tag] }));
      setTagsFromAPI((pre) => pre.filter((data) => data?._id !== data?.tag?._id));
    } catch (error) {
      console.log(error)
    }

    // close drop down tag container...
    setShowTags(false);

    // clear input field
    setCreateNewTag((pre) => ({ ...pre, name: "" }));
  };

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩


  const debounceHandler = (fun, delay) => {
    let timeOutId;
    return (...arg) => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        fun(...arg)
      }, delay);
    }
  }

  const getCardName = (cardName) => {
    setLocalCard(pre => ({ ...pre, name: cardName }));
   
  }

  const deBounceGetCardName = debounceHandler(getCardName, 1000);

  // handle keyBoard enter button press
  const handle_card_name_update_enter_btn = async (e) => {
    if (e.key === 'Enter') {
      const cardTagObject = { ...localCard, name: localCard.name };

      try {
        const { data } = await cardUpdateApiCall(selectedSpaceId, listID, card._id, cardTagObject)
        if (data.updatedCard._id) {
          toast.success(`Card name updated`, { autoClose: 2000 });
        }
      } catch (error) {
        console.log(error?.response?.data?.issue);
      }
    };
  }

  const handle_card_description_update_enter_btn = async (e) => {
    if (e.key === 'Enter') {
      const cardTagObject = { ...localCard, description: localCard.description };

      try {
        const { data } = await cardUpdateApiCall(selectedSpaceId, listID, card._id, cardTagObject)
        if (data.updatedCard._id) {
          toast.success(`Description updated`, { autoClose: 2000 });
        }
      } catch (error) {
        console.log(error?.response?.data?.issue);
      }
    };
  }

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  const handleCreateCheckList = () => {
    setNewCheckListItemJSX(true);
  }

  const handle_check_list_item_enter_btn = async e => {

    if (e.key === 'Enter') {

      const cardValue = { ...localCard }

      const checkListItemObj = { ...checkListItem }

      const cardCheckList = { ...cardValue, checkList: [...cardValue.checkList, checkListItemObj] }

      setLocalCard(cardCheckList);

      try {
        await createChecklistItem(selectedSpaceId, listID, card._id, checkListItemObj)
      } catch (error) {
        console.log(error.response.data.issue)
      }
      setCheckListItem({ check: false, content: '', });
    }

  }


  const handleCheckListChange = e => {
    const { checked, name, value } = e.target;
    setCheckListItem(pre => ({ ...pre, [name]: [name].includes('content') ? value : checked }));
  }




  return (
    <section
      className="fixed top-0 right-0 left-0 bottom-0 z-[500] bg-black/30 grid place-items-center"
      onClick={() => setBoardModal(false)}
    >
      <div
        className="bg-gray-50 w-[60%] rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🟨🟨🟨 Section 1 🟨🟨🟨 */}
        <div className="flex items-center justify-between border-b border-gray-300 p-2">
          <div className="flex flex-wrap items-center pl-4 text-gray-400 text-sm">
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200">
              <RightOK />
              <span>Done</span>
            </div>

            <div className="flex items-center space-x-2 px-3 pl-4">
              <span>Progress:</span>
              <Progress progress={progress} setProgress={setProgress} />
            </div>

            <div className="flex items-center space-x-2 cursor-pointer p-3 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl text-gray-400">
              <UserPlus />
              <span>Assignee</span>
            </div>

            <div className="flex items-center space-x-2 cursor-pointer p-3 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl">
              <EyeOpen width="22" height="22" />
              <span>Follow</span>
            </div>

            <div className="cursor-pointer p-3 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl">
              Start - Due
            </div>
          </div>

          <div className="flex items-center p-3 relative">
            <Dropdown
              button={<DotsSingle
                className="text-[#7088A1] cursor-pointer w-8 h-8 p-1 py-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   setModalActionToggling((pre) => !pre);
              // }}
              />}
              menu={
                () => {
                  return <CardSettingDropDown
                    cardID={card._id}
                    listID={listID}
                    noteDone={noteDone}
                    setNoteDone={setNoteDone}
                    setModalActionToggling={setModalActionToggling}
                  />
                }
              }
            />

            <Close
              className="text-[#7088A1] cursor-pointer w-8 h-8 p-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200"
              onClick={() => setBoardModal(false)}
            />
            {/* 
            {
              // Little Action Menu for Board Modal
              modalActionToggling && (
                // <CardSettingDropDown
                //   cardID={card._id}
                //   listID={listID}
                //   noteDone={noteDone}
                //   setNoteDone={setNoteDone}
                //   setModalActionToggling={setModalActionToggling}
                // />
              )
            } */}
          </div>
        </div>

        {/* 🟨🟨🟨 Section 2 ||| Middle area 🟨🟨🟨 */}
        <div className="flex flex-col border-b border-gray-300">
          <div className="flex items-center justify-between p-4 text-gray-400 ">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold cursor-pointer hover:text-teal-500">
                {selectedSpace.name}
              </span>
              <ArrowRight />
              <span className="text-xs font-bold cursor-pointer hover:text-teal-500">
                {nameOfBoardList}
              </span>
            </div>

            <div className="text-xs font-bold cursor-pointer hover:text-teal-500">
              {/* MOVE TO NEXT LIST */}
            </div>
          </div>

          <div className="p-3">
            <input
              type="text"
              value={card?.name}
              // onChange={e => deBounceGetCardName(e.target.value)}
              onChange={e => setLocalCard(pre => ({ ...pre, name: e.target.value }))}
              onKeyDown={handle_card_name_update_enter_btn}
              className="w-full p-3 outline-none border rounded-md text-teal-500 font-bold bg-gray-50"
            />
          </div>

          <div className="p-3 flex relative">
            <div
              className="ml-2 w-10 h-10 grid place-items-center cursor-pointer hover:bg-gray-100 rounded-md duration-200 group"
              onClick={() => setShowTags((pre) => !pre)}
            >
              <Tag className="text-[#B9C3CE] group-hover:text-teal-400" />
            </div>

            <div className="flex items-center flex-wrap gap-2 border border-transparent w-full rounded-md px-2 hover:border-gray-300 customScroll">
              {
                // 🟨🟨🟨 Just Tag Display at Capsule Formate...
                localCard?.tags?.map(tag => (
                  <span
                    key={tag?._id}
                    style={{ backgroundColor: tag.color }}
                    className={`px-2 py-1 text-white cursor-pointer rounded-full`}
                    onClick={() => handleDeleteTags(tag)}
                  >
                    {tag.name}
                  </span>
                ))
              }
              {tagsFromAPI.length > 0 ? (
                <form onSubmit={handleNewTagCreation}>
                  <input
                    type="text"
                    placeholder="Add a tag..."
                    className="ml-2 py-2 outline-none bg-gray-50"
                    value={createNewTag.name}
                    onChange={(e) =>
                      setCreateNewTag((pre) => ({
                        ...pre,
                        name: e.target.value,
                      }))
                    }
                    onClick={() => setShowTags(true)}
                  />
                </form>
              ) : null}
            </div>

            {
              // 🟨🟨🟨 all tags 🟨🟨🟨
              showTags && (
                <div className="max-h-[255px] overflow-y-auto absolute top-[60px] left-[60px] right-0 flex flex-col text-gray-100 shadow-2xl bg-white customScroll">
                  {tagsFromAPI.map((tag, i) => (
                    <div
                      key={tag?._id}
                      onClick={() => {
                        setShowTags(false);
                        handleAddTags(tag);
                      }}
                      className="pl-3 py-2 hover:bg-gray-300 flex items-center cursor-pointer"
                    >
                      <span
                        className={`px-2 py-1 w-fit rounded-full`}
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag?.name}
                      </span>
                    </div>
                  ))}
                </div>
              )
            }
          </div>

          <div className="mt-8 ml-4 w-full">
            <div className="flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group">
              <Description className="text-[#B9C3CE] group-hover:text-teal-400" />{" "}
              <span>Description</span>
            </div>

            <input
              type="text"
              className="w-[85%] px-3 h-14 ml-10 border border-gray-50 hover:border-gray-200 outline-none bg-gray-50 cursor-pointer rounded-md text-gray-600"
              value={card?.description}
              onChange={e => setLocalCard(pre => ({ ...pre, description: e.target.value }))}
              onKeyDown={handle_card_description_update_enter_btn}
            />
          </div>

          <div className="mt-8 ml-4 ">
            <div className="flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group">
              <CheckList className="text-[#B9C3CE] group-hover:text-teal-400" />{" "}
              <span>Checklist</span>
            </div>

            <div className="space-y-2">
              {
                localCard?.checkList?.length > 0 &&
                localCard?.checkList?.map((item, i) => (
                  <div className="flex items-center justify-between px-8" key={i}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                      checked={item.check}
                      onChange={e => setLocalCard(pre => ({
                        ...pre,
                        checkList: pre.checkList.map((item, idx) => idx === i
                          ? { ...item, check: e.target.checked }
                          : item
                        )
                      }))}
                    />
                    <input
                      type="text"
                      value={item.content}
                      onChange={e => setLocalCard(pre => ({
                        ...pre,
                        checkList: pre.checkList.map((item, idx) => idx === i
                          ? { ...item, content: e.target.value }
                          : item
                        )
                      }))}
                      className="flex-1 mx-2 px-1 py-0.5 rounded-md border outline-none border-gray-300 focus:border-teal-600 duration-200"
                    />
                    <DotsSingle />
                  </div>
                ))
              }

              {
                newCheckListItemJSX &&
                <div className="flex items-center justify-between px-8">
                  <input
                    type="checkbox"
                    name="check"
                    className="w-4 h-4 cursor-pointer"
                    checked={checkListItem.check}
                    onChange={handleCheckListChange}
                  />
                  <input
                    type="text"
                    name="content"
                    value={checkListItem.content}
                    onChange={handleCheckListChange}
                    onKeyDown={handle_check_list_item_enter_btn}
                    className="flex-1 mx-2 px-1 py-0.5 rounded-md border outline-none border-gray-300 focus:border-teal-600 duration-200"
                  />
                  <DotsSingle />
                </div>
              }


              <p className="text-[#B9C3CE] px-3 py-2 rounded-md bg-slate-100 inline-block mt-2 ml-4 cursor-pointer hover:bg-slate-200 duration-150" onClick={handleCreateCheckList}>
                Add item to check ist
              </p>
            </div>

          </div>

          <div className="my-8 ml-4 ">
            <div className="flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group">
              <Attachment className="text-[#B9C3CE] group-hover:text-teal-400" />
              <label htmlFor="file">Attachments</label>
              <input type="file" id="file" className="hidden" />
            </div>
          </div>
        </div>

        {/* 🟨🟨🟨 Section 3 ||| Bottom Area 🟨🟨🟨 */}
        <div className=" py-4 flex items-center justify-center space-x-1 cursor-pointer text-gray-400 hover:text-gray-500 duration-150">
          <span>Drop files here or </span>
          <label
            htmlFor="file"
            className="text-teal-600 cursor-pointer hover:text-teal-700 duration-150"
          >
            browse
          </label>
          <input type="file" id="file" className="hidden" />
        </div>
      </div>
    </section>
  );
};

export default CardModal;
