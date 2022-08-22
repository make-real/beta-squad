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
import { CardSettingDropDown } from ".";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import { useBoardCardContext } from "../../context/BoardCardContext";
import { useSelector } from "react-redux";
import { cardUpdateApiCall } from "../../hooks/useFetch";
import { get_tags } from "../../api/tags";

const Progress = ({ progress, setProgress }) => {
  const [previewProgess, setPreviewProgress] = useState(0);

  const handleProgressChange = (v) => () => setProgress(v);
  const handlePreviewProgressChange = (v) => () => setPreviewProgress(v);

  return (
    <>
      {[...Array(5).keys()].map((itemIndex) => (
        <div
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
    return `p-2 duration-300 ${
      progress >= itemIndex || previewProgess >= itemIndex
        ? "bg-teal-500"
        : "bg-gray-200"
    } rounded-lg cursor-pointer ${
      progress >= itemIndex || previewProgess >= itemIndex
        ? "text-white"
        : "bg-gray-200"
    } ${
      itemIndex === 0
        ? "rounded-tl-3xl rounded-bl-3xl"
        : itemIndex === 4
        ? "rounded-tr-3xl rounded-br-3xl"
        : ""
    }`;
  }
};

// This <Component /> called by 🟨🟨🟨 Card.jsx 🟨🟨🟨
const CardModal = ({ setBoardModal, noteDone, setNoteDone, card, listID }) => {
  const { updateCard } = useBoardCardContext();
  const [values, setValues] = useState({ ...card });
  const [progress, setProgress] = useState(0);

  const userSelectedWorkSpaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

  // console.log('workSpace =>',userSelectedWorkSpaceId)
  // console.log('space =>',selectedSpaceId)

  const [modalActionToggling, setModalActionToggling] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [tagsFromAPI, setTagsFromAPI] = useState([]);
  const [setTagsIntoCard, setSetTagsIntoCard] = useState([]);
  const [createNewTag, setCreateNewTag] = useState({
    name: "",
    color: "",
  });
  // console.log(setTags);
  // console.log(card);
  // console.log(card.progress);
  // console.log(card);

  // user esc key press Event Listener for closing modal...
  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.code === "Escape") setBoardModal(false);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, [setBoardModal]);

  // CardInfo Modal Data Update when user input new data...
  useEffect(
    () => updateCard(listID, card._id, values),
    [listID, card._id, values]
  );

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await get_tags(userSelectedWorkSpaceId);
        setTagsFromAPI(data?.tags);
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
  }, [userSelectedWorkSpaceId]);

  const handleAddTags = async (tag) => {
    setSetTagsIntoCard((pre) => [...pre, tag]);
    setTagsFromAPI((pre) => pre.filter((data) => data?._id !== tag?._id));
  };

  const handleDeleteTags = (tag) => {
    setSetTagsIntoCard((pre) => pre.filter((data) => data?._id !== tag?._id));
    setTagsFromAPI((pre) => [...pre, tag]);
  };

  const handleNewTagCreation = (e) => {
    e.preventDefault();

    // close drop down tag container...
    setShowTags(false);

    // setCreateNewTag(e => e.target.value)

    console.log(createNewTag);

    // clear input field
    setCreateNewTag((pre) => ({ ...pre, name: "" }));
  };

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
