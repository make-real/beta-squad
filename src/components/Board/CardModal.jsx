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
import Dropdown from "../Dropdown";
import { cardUpdateApiCall } from "../../hooks/useFetch";


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

  const { updateCard } = useBoardCardContext();
  const [values, setValues] = useState({ ...card });
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const userSelectedWorkSpaceId = useSelector((state) => state.workspace.selectedWorkspace);

  const [showTags, setShowTags] = useState(false);
  const [tagsFromAPI, setTagsFromAPI] = useState([]);
  const [setTagsIntoCard, setSetTagsIntoCard] = useState([]);
  const [modalActionToggling, setModalActionToggling] = useState(false);
  const [createNewTag, setCreateNewTag] = useState({
    name: "",
    color: "#47b9ea",
  });

  // console.log(card)

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  // user esc key press Event Listener for closing modal...
  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.code === "Escape") setBoardModal(false);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, [setBoardModal]);

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  // CardInfo Modal Data Update when user input new data...
  useEffect(
    () => updateCard(listID, card._id, values),
    [listID, card._id, values]
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
    setSetTagsIntoCard((pre) => [...pre, tag]);

    // remove from drop-down ui of tag's list
    setTagsFromAPI((pre) => pre.filter((data) => data?._id !== tag?._id));

    const cardTagObject = { ...card, tags: [...card.tags, tag] }

    try {
      // 🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
      const { data } = await cardUpdateApiCall(selectedSpaceId, listID, card._id, cardTagObject)
      console.log(data);
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
    updateCard(listID, card._id, cardTagObject);

  };

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  const handleDeleteTags = (tag) => {
    setSetTagsIntoCard((pre) => pre.filter((data) => data?._id !== tag?._id));
    setTagsFromAPI((pre) => [...pre, tag]);
  };

  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

  const handleNewTagCreation = async (e) => {
    e.preventDefault();

    try {
      // POST Method for creating tag's inside a specific workSpace
      const { data } = await create_tag({ workSpaceId: userSelectedWorkSpaceId, ...createNewTag });
      setSetTagsIntoCard((pre) => [...pre, data.tag]);
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
            <DotsSingle
              className="text-[#7088A1] cursor-pointer w-8 h-8 p-1 py-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setModalActionToggling((pre) => !pre);
              }}
            />
            <Close
              className="text-[#7088A1] cursor-pointer w-8 h-8 p-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200"
              onClick={() => setBoardModal(false)}
            />

            {
              // Little Action Menu for Board Modal
              modalActionToggling && (
                <CardSettingDropDown
                  cardID={card._id}
                  listID={listID}
                  noteDone={noteDone}
                  setNoteDone={setNoteDone}
                  setModalActionToggling={setModalActionToggling}
                />
              )
            }
          </div>
        </div>

        {/* 🟨🟨🟨 Section 2 ||| Middle area 🟨🟨🟨 */}
        <div className="flex flex-col border-b border-gray-300">
          <div className="flex items-center justify-between p-4 text-gray-400 ">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold cursor-pointer hover:text-teal-500">
                Space Clone
              </span>
              <ArrowRight />
              <span className="text-xs font-bold cursor-pointer hover:text-teal-500">
                Taiseen Vai
              </span>
            </div>

            <div className="text-xs font-bold cursor-pointer hover:text-teal-500">
              MOVE TO NEXT LIST
            </div>
          </div>

          <div className="p-3">
            <input
              type="text"
              defaultValue={card?.name}
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
                setTagsIntoCard.map((tag, i) => (
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
              className="w-[85%] px-3 h-14 ml-10 border border-gray-50 hover:border-gray-200 outline-none bg-gray-50 cursor-pointer rounded-md"
            />
          </div>

          <div className="mt-8 ml-4 ">
            <div className="flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group">
              <CheckList className="text-[#B9C3CE] group-hover:text-teal-400" />{" "}
              <span>Checklist</span>
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
