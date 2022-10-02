import {
  ArrowRight,
  Attachment,
  CheckList,
  Close,
  Description,
  DotsSingle,
  RightOK,
  UserPlus,
} from "../../assets/icons";
import { useBoardCardContext } from "../../context/BoardCardContext";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CardSettingDropDown } from ".";
import {
  cardAttachmentUpdateApiCall,
  cardUpdateApiCall,
  createChecklistItem,
  deleteChecklistItem,
  getSingleCard,
  updateChecklistItem,
} from "../../hooks/useFetch";
import { toast } from "react-toastify";
import Dropdown from "../Dropdown";
import ConfirmDialog from "./ConfirmDialog";
import AssigneeUser from "../AssigneeUser/AssigneeUser";
import CardTags from "./CardTags";
import Button from "../Button";
import CardProgress from "./CardProgress";
import Editor from "../Editor";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import CardMessage from "./CardComment";
import ImgsViewer from "react-images-viewer";
import { formatDate } from "../../util/date";
import TaskDatePicker from "../TaskDatePicker";
const CardModal = ({
  setBoardModal,
  noteDone,
  setNoteDone,
  card,
  listID,
  progress,
  setProgress,
  progressStatus,
  handleDataChange = () => {},
}) => {
  const [localCard, setLocalCard] = useState({});
  const { updateCard, boardLists } = useBoardCardContext();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const selectedSpace = useSelector((state) => state.space.selectedSpaceObj);
  const nameOfBoardList = boardLists.find(({ _id }) => _id === listID)?.name;
  const [openAssigneeModal, setOpenAssigneeModal] = useState(false);
  const [modalActionToggling, setModalActionToggling] = useState(false);
  const [newCheckListItemJSX, setNewCheckListItemJSX] = useState(false);
  const [attachFileLoading, setAttachFileLoading] = useState(false);
  const [deleteAttachFile, setDeleteAttachFile] = useState("");
  const [deleteAttachFileLoading, setDeleteAttachFileLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [images, setImages] = useState({
    isOpen: false,
    currentImage: 0,
  });

  const [checkListItem, setCheckListItem] = useState({
    checked: false,
    content: "",
  });

  useEffect(() => {
    const getCard = async () => {
      const { data } = await getSingleCard(selectedSpaceId, listID, card?._id);
      setLocalCard(data?.card);
    };

    getCard();
  }, [selectedSpaceId, listID, card?._id]);

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.code === "Escape") setBoardModal(localCard);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, []);

  useEffect(
    () => updateCard(listID, localCard._id, localCard),
    [listID, card._id, localCard]
  );

  const handle_card_name_update_enter_btn = async (e) => {
    console.log(e.target.value);

    if (e.key === "Enter") {
      const cardTagObject = { ...localCard, name: localCard.name };

      try {
        const { data } = await cardUpdateApiCall(
          selectedSpaceId,
          listID,
          card._id,
          cardTagObject
        );
        if (data.updatedCard._id) {
          toast.success(`Card name updated`, { autoClose: 2000 });
          handleDataChange();
        }
      } catch (error) {
        console.log(error?.response?.data?.issue);
      }
    }
  };

  const handle_card_description_update_enter_btn = async (e) => {
    // if (e.key === "Enter") {
    const cardTagObject = {
      ...localCard,
      description: localCard.description,
    };

    try {
      setEditDescription(false);
      const { data } = await cardUpdateApiCall(
        selectedSpaceId,
        listID,
        card._id,
        cardTagObject
      );
      if (data.updatedCard._id) {
        toast.success(`Description updated`, { autoClose: 2000 });
        handleDataChange();
      }
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
    // }
  };

  const changeDate = async (date, card) => {
    const cardCopy = {
      ...localCard,
      startDate: date.start,
      endDate: date.end,
    };
    setLocalCard(cardCopy);
    try {
      await cardUpdateApiCall(selectedSpaceId, listID, card._id, cardCopy);
      handleDataChange();
    } catch (error) {
      console.log(error.response.data.issue);
    }
  };

  const handle_create_check_list = () => {
    setNewCheckListItemJSX(true);
    setCheckListItem({
      checked: false,
      content: "",
    });
  };

  const handle_check_list_item_enter_btn = async (e) => {
    if (e.key === "Enter") {
      const cardValue = { ...localCard };

      const checkListItemObj = { ...checkListItem };

      const cardCheckList = {
        ...cardValue,
        checkList: [...cardValue.checkList, checkListItemObj],
      };

      setLocalCard(cardCheckList);

      try {
        await createChecklistItem(
          selectedSpaceId,
          listID,
          card._id,
          checkListItemObj
        );
        handleDataChange();
      } catch (error) {
        console.log(error.response.data.issue);
      }

      setCheckListItem({ checked: "", content: "" });
    }
  };

  const handle_check_list_change = (e) => {
    const { checked, name, value } = e.target;
    setCheckListItem((pre) => ({
      ...pre,
      [name]: [name].includes("content") ? value : checked,
    }));
    handleDataChange();
  };

  const handle_check_list_update_on_change = async (e, itemId) => {
    let updatedCheckList;
    const { type } = e.target;
    const tempCard = { ...localCard };

    if (type === "checkbox") {
      updatedCheckList = {
        ...tempCard,
        checkList: tempCard.checkList.map((item) =>
          item?._id === itemId ? { ...item, checked: e.target.checked } : item
        ),
      };
    } else {
      updatedCheckList = {
        ...tempCard,
        checkList: tempCard.checkList.map((item) =>
          item?._id === itemId ? { ...item, content: e.target.value } : item
        ),
      };
    }

    setLocalCard(updatedCheckList);

    const updatedCheckListItemObj = updatedCheckList?.checkList?.find(
      ({ _id }) => _id === itemId
    );

    try {
      await updateChecklistItem(
        selectedSpaceId,
        listID,
        card._id,
        itemId,
        updatedCheckListItemObj
      );
    } catch (error) {
      console.log(error?.response?.data?.issue?.message);
    }
  };

  const handle_remove_check_list_item = async (itemId) => {
    const tempCard = { ...localCard };

    const updatedCheckList = {
      ...tempCard,
      checkList: tempCard.checkList.filter((item) => item._id !== itemId),
    };

    setLocalCard(updatedCheckList);

    try {
      const { data } = await deleteChecklistItem(
        selectedSpaceId,
        listID,
        card._id,
        itemId
      );
      toast.success(data?.message, { autoClose: 2000 });
    } catch (error) {
      console.log(error?.response?.data?.issue?.message);
    }
  };

  const handle_card_attachments = async (e) => {
    const files = e.target.files;

    const formData = new FormData();

    for (const file of files) {
      formData.append("attachments", file);
    }

    try {
      setAttachFileLoading(true);
      const { data } = await cardAttachmentUpdateApiCall(
        selectedSpaceId,
        listID,
        card._id,
        formData
      );
      setLocalCard((pre) => ({
        ...pre,
        attachments: data.updatedCard.attachments,
      }));
      setAttachFileLoading(false);
      handleDataChange();
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
  };

  const handle_attach_delete = (file) => {
    setDeleteAttachFileLoading(true);
    setDeleteAttachFile(file);
    handleDataChange();
  };

  const handle_open_assignee_modal = () => setOpenAssigneeModal((pre) => !pre);

  const getHtml = (data) => {
    if (!data) return;
    try {
      const rowHtmlContent = EditorState.createWithContent(
        convertFromRaw(JSON.parse(data))
      );
      const editorHTML = draftToHtml(
        convertToRaw(rowHtmlContent.getCurrentContent())
      );
      return editorHTML;
    } catch (error) {
      return "";
    }
  };

  return (
    <>
      <section className="fixed top-0 right-0 left-0 bottom-0 z-[1] bg-black/30 grid place-items-center overflow-visible">
        <div className="flex flex-col relative bg-gray-50 w-[90%] h-[90vh] max-w-[1800px] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-300 py-2">
            <div className="flex flex-wrap items-center pl-4 text-gray-400 text-sm">
              <div
                onClick={() => setProgress((pre) => (pre === 4 ? 0 : 4))}
                className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200"
              >
                <RightOK />
                <span>Done</span>
              </div>

              <div className="flex items-center px-3 pl-4">
                <span>Progress:</span>
                <div className="ml-4">
                  <CardProgress progress={progress} setProgress={setProgress} />
                </div>
              </div>

              <div className="relative flex items-center space-x-2 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl text-gray-400">
                <Dropdown
                  width={450}
                  button={
                    <div className="flex gap-2 ml-5 px-3 py-2 items-center">
                      {localCard.assignee?.length ? (
                        localCard.assignee.map((user, i) => (
                          <div className="ml-[-15px]">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt=""
                                className="w-6 h-6 rounded-full ring bg-white ring-teal-500"
                              />
                            ) : (
                              <p className="w-6 h-6 rounded-full ring bg-white ring-teal-500 text-black font-bold grid place-items-center">
                                {i || user?.fullName.charAt(0)}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="ml-[-15px]">
                          <UserPlus />
                        </div>
                      )}
                      <span>Assignee</span>
                    </div>
                  }
                  menu={() => (
                    <AssigneeUser
                      listID={listID}
                      localCard={localCard}
                      spaceID={selectedSpaceId}
                      setLocalCard={setLocalCard}
                    />
                  )}
                />
              </div>
              <div className="ml-3 relative flex items-center space-x-2 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl text-gray-400">
                <Dropdown
                  width={350}
                  button={
                    localCard.startDate ? (
                      <div className="p-2 text-center cursor-pointer rounded-lg duration-200 hover:bg-gray-300 hover:text-teal-500">
                        {formatDate(localCard.startDate, "MMM, dd")} -{" "}
                        {formatDate(localCard.endDate, "MMM, dd")}
                      </div>
                    ) : (
                      <div className="p-2 text-center cursor-pointer rounded-lg duration-200 hover:bg-gray-300 hover:text-teal-500">
                        Start - Due
                      </div>
                    )
                  }
                  menu={({ closePopup }) => (
                    <TaskDatePicker
                      startDate={localCard?.startDate}
                      endDate={localCard?.endDate}
                      onChange={(date) => {
                        closePopup();
                        changeDate(date, localCard);
                      }}
                      close={closePopup}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex items-center p-3 relative">
              <Dropdown
                button={
                  <DotsSingle className="text-[#7088A1] cursor-pointer w-8 h-8 p-1 py-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200" />
                }
                menu={({ closePopup }) => (
                  <CardSettingDropDown
                    close={closePopup}
                    cardID={card._id}
                    progress={progress}
                    setProgress={setProgress}
                    listID={listID}
                    noteDone={noteDone}
                    setNoteDone={setNoteDone}
                    setModalActionToggling={setModalActionToggling}
                    setCardSettingDropDownToggle={setModalActionToggling}
                  />
                )}
              />
              <div onClick={() => setBoardModal(localCard)}>
                <Close className="text-[#7088A1] cursor-pointer w-8 h-8 p-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200" />
              </div>
            </div>
          </div>
          <div class="flex flex-1 min-h-0">
            <div className="flex flex-col border-r border-gray-300 w-[55%]">
              <div class="overflow-y-auto px-4 h-full">
                <div className="flex items-center py-4 text-gray-400 ">
                  <span className="text-xs font-bold cursor-pointer hover:text-teal-500">
                    {selectedSpace.name}
                  </span>
                  <ArrowRight className="mx-2" />
                  <span className="text-xs font-bold cursor-pointer hover:text-teal-500">
                    {nameOfBoardList}
                  </span>
                </div>

                <div className="pt-3">
                  <input
                    type="text"
                    value={localCard?.name}
                    onChange={(e) =>
                      setLocalCard((pre) => ({ ...pre, name: e.target.value }))
                    }
                    onKeyDown={handle_card_name_update_enter_btn}
                    className="w-full p-3 outline-none border rounded-md hover:border-gray-400 text-teal-500 font-bold bg-gray-50"
                  />
                </div>

                <CardTags
                  localCard={localCard}
                  setLocalCard={setLocalCard}
                  selectedSpaceId={selectedSpaceId}
                  listID={listID}
                  handleDataChange={handleDataChange}
                />

                <div>
                  <div className="flex items-center gap-2 py-2 cursor-pointer w-fit rounded-md duration-200 text-gray-400  group">
                    <Description className="text-[#B9C3CE] group-hover:text-teal-400" />{" "}
                    <span>Description</span>
                  </div>
                  {!editDescription ? (
                    <>
                      <div
                        className="text-slate-800 border p-2 rounded-md hover:border-gray-400 min-h-[100px]"
                        onClick={() => setEditDescription((prev) => !prev)}
                        dangerouslySetInnerHTML={{
                          __html: getHtml(localCard?.description),
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Editor
                        value={localCard?.description}
                        onChange={(e) =>
                          setLocalCard((pre) => ({
                            ...pre,
                            description: e,
                          }))
                        }
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handle_card_description_update_enter_btn}
                          onKeyDown={handle_card_description_update_enter_btn}
                        >
                          Save
                        </Button>
                        <Button text onClick={() => setEditDescription(false)}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}
                  {/* <input
                  type="text"
                  className="w-full p-3 outline-none border rounded-md text-teal-500 font-bold bg-gray-50"
                  value={localCard?.description}
                  onChange={(e) =>
                    setLocalCard((pre) => ({
                      ...pre,
                      description: e.target.value,
                    }))
                  }
                  onKeyDown={handle_card_description_update_enter_btn}
                /> */}
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 py-2 cursor-pointer w-fit rounded-md duration-200 text-gray-400 group">
                    <CheckList className="text-[#B9C3CE] group-hover:text-teal-400" />{" "}
                    <span>Checklist</span>
                  </div>

                  <div className="">
                    {localCard?.checkList?.length > 0 &&
                      localCard?.checkList?.map((item) => (
                        <div
                          className="flex items-center justify-between"
                          key={item._id}
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                            defaultChecked={item.checked}
                            onChange={(e) =>
                              handle_check_list_update_on_change(e, item._id)
                            }
                          />

                          <input
                            type="text"
                            value={item.content}
                            onChange={(e) =>
                              handle_check_list_update_on_change(e, item._id)
                            }
                            className="flex-1 mx-2 my-2 px-2 py-0.5 rounded-md border outline-none border-gray-300 focus:border-teal-600 duration-200"
                          />

                          <Dropdown
                            width={120}
                            position="right center"
                            button={
                              <div className="relative group cursor-pointer px-2 hover:text-red-400">
                                <DotsSingle />
                              </div>
                            }
                            menu={() => (
                              <div className="w-full">
                                <div
                                  onClick={() =>
                                    handle_remove_check_list_item(item._id)
                                  }
                                  className="boardActionDropDownSm flex justify-center"
                                >
                                  <p>Delete</p>
                                </div>
                                {/* <div className="boardActionDropDownSm flex justify-center">
                                  <p>Assign</p>
                                </div> */}
                              </div>
                            )}
                          />
                        </div>
                      ))}

                    {newCheckListItemJSX && (
                      <div className="flex items-center justify-between">
                        <input
                          type="checkbox"
                          name="check"
                          className="w-4 h-4 cursor-pointer"
                          style={{ color: "red" }}
                          checked={checkListItem?.checked}
                          onChange={handle_check_list_change}
                        />
                        <input
                          type="text"
                          name="content"
                          value={checkListItem?.content}
                          onChange={handle_check_list_change}
                          onKeyDown={handle_check_list_item_enter_btn}
                          className="flex-1 mx-2 my-2 px-2 py-0.5 rounded-md border outline-none border-gray-300 focus:border-teal-600 duration-200"
                        />
                        <Dropdown
                          width={120}
                          position="right center"
                          button={
                            <div className="px-2 cursor-pointer hover:text-red-400">
                              <DotsSingle />
                            </div>
                          }
                          menu={() => (
                            <div className="w-full">
                              <div
                                onClick={() => {
                                  setCheckListItem();
                                  setNewCheckListItemJSX(false);
                                }}
                                className="boardActionDropDownSm flex justify-center"
                              >
                                <p>Remove</p>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    )}

                    <Button
                      className="mt-5"
                      sm
                      onClick={handle_create_check_list}
                    >
                      Add item to check ist
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2 cursor-pointer w-fit rounded-md duration-200 text-gray-400 group">
                  <Attachment className="mt-4 mb-4 text-[#B9C3CE] group-hover:text-teal-400" />{" "}
                  <span>Attachments</span>
                </div>
                {/* <div className="mt-4 mb-4">
                <label
                  htmlFor="file"
                  className="flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group"
                >
                  <Attachment className="text-[#B9C3CE] group-hover:text-teal-400" />
                  Attachments
                  <input
                    multiple
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={handle_card_attachments}
                  />
                </label>
              </div> */}

                <div className="mb-4 flex items-center gap-1 flex-wrap">
                  {attachFileLoading && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black/70 grid place-items-center">
                      <div className="loading_continuous"></div>
                    </div>
                  )}
                  {localCard?.attachments?.length > 0 &&
                    localCard?.attachments?.map((file, i) => (
                      <div
                        key={i}
                        className="relative rounded-md p-2 cursor-pointer hover:bg-gray-200 group"
                      >
                        <p
                          className="absolute top-[-2px] right-[-2px] px-1.5 py-0 rounded-full text-center leading-5 text-red-500 border border-red-500 bg-white duration-200 invisible group-hover:visible"
                          onClick={() => handle_attach_delete(file)}
                        >
                          x
                        </p>
                        <img
                          src={file}
                          alt=""
                          className="h-24"
                          onClick={() =>
                            setImages((p) => ({
                              ...p,
                              isOpen: true,
                              currentImage: i,
                            }))
                          }
                        />
                        {/* <div className="text-sm pt-2">
                          <p>
                            By <b>{userInfo.username}</b>
                          </p>
                        </div> */}
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex justify-center py-[30.5px] border-t border-gray-300 bottom-5 pt-4space-x-1 cursor-pointer text-gray-400 hover:text-gray-500 duration-150">
                <label htmlFor="file" className="flex align-middle">
                  <p className="text-center mr-1">Drop files here or</p>
                  <p className="text-teal-600 cursor-pointer hover:text-teal-700 ">
                    browse
                  </p>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handle_card_attachments}
                  className="hidden"
                />
              </div>
            </div>
            <CardMessage listId={listID} cardId={card._id} />
          </div>
        </div>
      </section>
      {deleteAttachFileLoading && (
        <ConfirmDialog
          listID={listID}
          cardID={localCard?._id}
          deleteAttachment
          setLocalCard={setLocalCard}
          setDeleteAttachFileLoading={setDeleteAttachFileLoading}
          deleteAttachFile={deleteAttachFile}
        />
      )}
      {localCard?.attachments && (
        <ImgsViewer
          imgs={localCard?.attachments.map((img) => ({ src: img })) || []}
          currImg={images.currentImage}
          isOpen={images.isOpen}
          onClickPrev={() =>
            setImages((p) => ({ ...p, currentImage: p.currentImage - 1 }))
          }
          onClickNext={(e) =>
            setImages((p) => ({ ...p, currentImage: p.currentImage + 1 }))
          }
          onClose={() => setImages((p) => ({ ...p, isOpen: false }))}
        />
      )}
    </>
  );
};

export default CardModal;
