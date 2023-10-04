import { UserPlus } from "../../assets/icons";
import { useBoardCardContext } from "../../context/BoardCardContext";
import React, { useState, useEffect } from "react";
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
// import { toast } from 'react-toastify';
import Dropdown from "../Dropdown";
import ConfirmDialog from "./ConfirmDialog";
import AssigneeUser from "../AssigneeUser/AssigneeUser";
import CardTags from "./CardTags";
import Button from "../Button";
// import CardProgress from './CardProgress';
// import Editor from '../Editor';
// import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import CardMessage from "./CardComment";
// import ImgsViewer from 'react-images-viewer';
import { formatDate } from "../../util/date";
import TaskDatePicker from "../TaskDatePicker";
import Delete from "../../assets/icons/svg/Delete";
import {
  CalendarDaysIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
  ChatBubbleBottomCenterTextIcon,
  // CheckCircleIcon,
  // StopCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { useStyleContext } from "../../context/StyleContext";
// import { draftJsToHtml } from '../../util/draftJsToHtml';
import DragDropFile from "../DragDropFile";
import { ClipLoader } from "react-spinners";
import DocView from "../DocView";
import { GrDocumentPdf } from "react-icons/gr";
import PreviewDoc from "./PreviewDoc";

const CardDetails = ({ progressStatus, handleDataChange = () => {} }) => {
  const { workspace_id, squadId: listID, id } = useParams();

  const navigate = useNavigate();
  const { margin } = useStyleContext();

  const [localCard, setLocalCard] = useState({});
  

  const [noteDone, setNoteDone] = useState(false);
  const [progress, setProgress] = useState(localCard?.progress);

  const selectedWorkspaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );
  const [toggleEdit, setToggleEdit] = useState(false);
  const { boardLists } = useBoardCardContext();
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  // const selectedSpace = useSelector((state) => state.space.selectedSpaceObj);
  const nameOfBoardList = boardLists.find(({ _id }) => _id === listID)?.name;
  // const [openAssigneeModal, setOpenAssigneeModal] = useState(false);
  // const [modalActionToggling, setModalActionToggling] = useState(false);
  const [newCheckListItemJSX, setNewCheckListItemJSX] = useState(false);
  const [attachFileLoading, setAttachFileLoading] = useState(false);
  const [deleteAttachFile, setDeleteAttachFile] = useState("");
  const [deleteAttachFileLoading, setDeleteAttachFileLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({
    isOpen: false,
    currentImage: 0,
  });

  const [checkListItem, setCheckListItem] = useState({
    checked: false,
    content: "",
  });

  const [showChat, setShowChat] = useState(false);

  const getCard = async () => {
    const { data } = await getSingleCard(workspace_id, listID, id,);
    setLocalCard(data?.card);
  };

  useEffect(() => {
    getCard().then(() => {
      setShowChat(true);
    });
  }, [workspace_id, listID, id]);

  // useEffect(() => {
  //     const handleEscapeKeyPress = (e) => {
  //         if (e.code === 'Escape') setBoardModal(localCard);
  //     };

  //     document.addEventListener('keydown', handleEscapeKeyPress);
  //     return () =>
  //         document.removeEventListener('keydown', handleEscapeKeyPress);
  // }, [localCard, setBoardModal]);

  // useEffect(
  //     () => updateCard(listID, localCard._id, localCard),
  //     [listID, localCard]
  // );
  // useEffect(()=>{if(listID|| localCard._id|| localCard){
  //     updateCard(listID, localCard._id, localCard)
  // }},[listID, localCard,updateCard])

  const handle_card_name_update_enter_btn = async (e) => {
    // if (e.key === 'Enter') {
    const cardTagObject = { ...localCard, name: localCard.name };

    try {
      const { data } = await cardUpdateApiCall(
        selectedSpaceId,
        listID,
        localCard._id,
        cardTagObject
      );

      if (data.updatedCard._id) {
        // toast.success(`Card name updated`, { autoClose: 2000 });
        handleDataChange();

        setToggleEdit(false);
      }
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
    // }
  };
  
  const handle_card_description_update_enter_btn = async (e) => {
    // if (e.key === 'Enter' && !e.shiftKey) {
    const cardTagObject = {
      ...localCard,
      description: localCard.description,
    };

    try {
      setEditDescription(false);
      const { data } = await cardUpdateApiCall(
        selectedSpaceId,
        listID,
        localCard._id,
        cardTagObject
      );
      if (data.updatedCard._id) {
        // toast.success(`Description updated`, { autoClose: 2000 });
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

  const [cLLoading, setCLLoading] = useState(false);

  const handle_create_check_list = async () => {
    save_todo_item();
    setNewCheckListItemJSX(!newCheckListItemJSX);
    setCheckListItem({
      checked: false,
      content: "",
    });
  };

  const handle_check_list_change = (e) => {
    const { checked, name, value } = e.target;
    setCheckListItem((pre) => ({
      ...pre,
      [name]: [name].includes("content") ? value : checked,
    }));
    handleDataChange();
  };

  const save_todo_item = async () => {
    const cardValue = { ...localCard };

    const checkListItemObj = { ...checkListItem };

    if (checkListItemObj.content.length > 0) {
      try {
        const { data } = await createChecklistItem(
          selectedSpaceId,
          listID,
          localCard._id,
          checkListItemObj
        );
        handleDataChange();

        const cardCheckList = {
          ...cardValue,
          checkList: [...cardValue.checkList, data?.checkListItem],
        };

        setLocalCard(cardCheckList);
      } catch (error) {
        console.log(error.response.data.issue);
      }

      setCheckListItem({ checked: "", content: "" });
    }
  };

  const handle_check_list_item_enter_btn = async (e) => {
    setCLLoading(true);
    if (e.key === "Enter") {
      save_todo_item();
    }
    setCLLoading(false);
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
        localCard._id,
        itemId,
        updatedCheckListItemObj
      );
    } catch (error) {
      console.log(error?.response?.data?.issue?.message);
    }
  };

  const handle_remove_check_list_item = async (itemId) => {
    if (!itemId) return;

    const tempCard = { ...localCard };

    const updatedCheckList = {
      ...tempCard,
      checkList: tempCard.checkList.filter((item) => item._id !== itemId),
    };

    setLocalCard(updatedCheckList);

    try {
      await deleteChecklistItem(selectedSpaceId, listID, localCard._id, itemId);
      // toast.success(data?.message, { autoClose: 2000 });
    } catch (error) {
      // toast.error(JSON.stringify(error?.response?.data?.issue), {
      //     autoClose: 2000,
      // });
      console.log(error?.response.data?.issue);
    }
  };

  const handle_attach_delete = (file) => {
    setDeleteAttachFileLoading(true);
    setDeleteAttachFile(file);
    handleDataChange();
  };

  // const handle_open_assignee_modal = () =>
  //     setOpenAssigneeModal((pre) => !pre);

  // const getHtml = (data) => {
  //     if (!data) return;
  //     try {
  //         const rowHtmlContent = EditorState.createWithContent(
  //             convertFromRaw(JSON.parse(data))
  //         );
  //         const editorHTML = draftToHtml(
  //             convertToRaw(rowHtmlContent.getCurrentContent())
  //         );
  //         return editorHTML;
  //     } catch (error) {
  //         return '';
  //     }
  // };

  // const selectedSpaceObj = useSelector(
  //     (state) => state.space.selectedSpaceObj
  // );

  let docs = [];

  for (const file of localCard?.attachments || []) {
    docs.push({ uri: file });
  }

  const checked = localCard?.checkList?.filter((item) => item?.checked);
  const unchecked = localCard?.checkList?.filter((item) => !item?.checked);

  if (!localCard) {
    return (
      <section
        className={`${
          margin ? "ml-[325px]" : "ml-[50px]"
        } duration-200 p-8 pt-[100px]`}
      >
        <div>No card found!</div>
      </section>
    );
  }

  return (
    <React.Fragment>
      <section
        className={`duration-200 p-5  bg-[#9cb4db20] h-full overflow-scroll lg:overflow-scroll md:overflow-scroll xl:overflow-scroll  no-scrollbar`}
      >
        {/* <div className="flex flex-col relative h-[90vh] max-w-[1800px] overflow-hidden p-5"> */}
        {/* <div className="pt-[85px] px-4 flex gap-3 items-start  min-w-fit h-[98vh]"> */}

        <div className="relative bg-white p-8 rounded-2xl h-full">
          <span
            className={`absolute top-0 left-0 rounded-tl-[16px] rounded-bl-[0px] rounded-tr-[0px] rounded-br-[30px] w-8 h-8`}
            style={{ backgroundColor: localCard?.color }}
          />

          <div className="flex items-center justify-between pb-4 px-1">
            {/* <div className="flex flex-wrap items-center pl-4 text-gray-400 text-sm">
                    <div
                        onClick={() =>
                            setProgress((pre) => (pre === 4 ? 0 : 4))
                        }
                        className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200"
                    >
                        <RightOK />
                        <span>Done</span>
                    </div>

                    <div className="flex items-center px-3 pl-4">
                        <span>Progress:</span>
                        <div className="ml-4">
                            <CardProgress
                                progress={progress}
                                setProgress={setProgress}
                            />
                        </div>
                    </div>
                </div> */}

            <div className="w-2/4">
              {toggleEdit ? (
                <input
                  type="text"
                  autoFocus
                  value={localCard?.name}
                  onChange={(e) =>
                    setLocalCard((pre) => ({
                      ...pre,
                      name: e.target.value,
                    }))
                  }
                  onBlur={handle_card_name_update_enter_btn}
                  className="font-[600] text-xl outline-none rounded-lg border-0 border-b hover:border-b-gray-400 text-teal-500 bg-gray-50 px-2 w-full"
                />
              ) : (
                <p className="font-[600] text-xl">
                  {localCard?.name || "Development"}
                </p>
              )}

              {localCard?.createdAt && (
                <p className="font-[400] text-sm text-[#818892]">
                  Created - {formatDate(localCard.createdAt, "MMM dd yyyy")}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-5 relative">
              {/* date */}
              <div className="ml-3 relative flex items-center space-x-2 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-lg text-gray-400">
                <Dropdown
                  width={350}
                  style={{ borderRadius: "1rem" }}
                  button={
                    localCard.startDate ? (
                      <div className="p-2 text-center rounded-lg duration-200 text-sm text-[#3699E0] bg-[#EDF7FF] hover:bg-gray-300">
                        {formatDate(localCard.startDate, "MMM, dd")} -{" "}
                        {formatDate(localCard.endDate, "MMM, dd")}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[#3699E0] bg-[#EDF7FF] hover:bg-gray-300 p-2 rounded-lg text-sm">
                        <p className="mr-2">Start - End</p>
                        <CalendarDaysIcon className="w-[14px] h-[14px] leading-5" />
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

              {/* chat */}
              <div
                className={`cursor-pointer hover:bg-gray-200  p-1 rounded-lg space-x-5`}
              >
                <span
                  className={`rounded-full ring-[1px] p-1 ${
                    showChat ? "bg-[#54CC7C] ring-[#ECECEC]" : "ring-[#54CC7C]"
                  } text-black font-bold grid place-items-center`}
                  onClick={() => setShowChat((showChat) => !showChat)}
                >
                  <ChatBubbleBottomCenterTextIcon
                    className={`w-5 h-5 ${
                      showChat ? "text-white" : "text-[#54CC7C]"
                    } `}
                  />
                </span>
              </div>

              {/* assignee */}
              <div>
                <div className="cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-lg text-gray-400 space-x-5 pl-[25px]">
                  <Dropdown
                    position={"bottom right"}
                    width={450}
                    style={{ borderRadius: "1rem" }}
                    button={
                      <div className="flex p-2 gap-2 items-center">
                        {localCard.assignee?.length ? (
                          localCard.assignee.map((user, i) => (
                            <div className="ml-[-20px]">
                              {user.avatar ? (
                                <span className="rounded-full    text-black font-bold grid place-items-center p-1">
                                  <img
                                    src={user.avatar}
                                    alt=""
                                    className="h-7 w-7 text-[#14BCBE] flex justify-center items-center rounded-full"
                                  />
                                </span>
                              ) : (
                                <span className="rounded-full ring-[1px] bg-white ring-[#ECECEC] text-black font-bold grid place-items-center p-1">
                                  <p className="h-5 w-5 text-[#14BCBE] flex justify-center items-center">
                                    {i || user?.fullName.charAt(0)}
                                  </p>
                                </span>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="ml-[-20px]">
                            <UserPlus />
                          </div>
                        )}
                        {/* <span>Assignee</span> */}
                        <div className="ml-[-20px]">
                          <p className="rounded-full ring-[1px] bg-white ring-[#ECECEC] text-black font-bold grid place-items-center p-1">
                            <PlusIcon className="h-5 w-5 text-[#14BCBE]" />
                          </p>
                        </div>
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
              </div>

              {/* more */}
              <Dropdown
                position="bottom right"
                button={
                  <EllipsisHorizontalIcon className="text-[#7088A1] cursor-pointer w-10 h-10 p-2 rounded-lg hover:bg-gray-200 hover:text-teal-500 duration-200 ml-0" />
                }
                width="150px"
                style={{ borderRadius: "1rem" }}
                menu={({ closePopup }) => (
                  <CardSettingDropDown
                    close={closePopup}
                    cardID={localCard._id}
                    progress={progress}
                    setProgress={setProgress}
                    listID={listID}
                    noteDone={noteDone}
                    setNoteDone={setNoteDone}
                    toggleEdit={toggleEdit}
                    setToggleEdit={setToggleEdit}
                    // setModalActionToggling={
                    //     setModalActionToggling
                    // }
                    // setCardSettingDropDownToggle={
                    //     setModalActionToggling
                    // }
                  />
                )}
              />

              <div
                onClick={() => {
                  // setBoardModal(localCard);
                  // Prev
                  // navigate(-1 || "/projects/kanban");
                  navigate(
                    `/projects/${selectedWorkspaceId}/squad/${selectedSpaceId}`,
                    {
                      state: {
                        tab: "board",
                      },
                    }
                  );
                }}
              >
                <XMarkIcon className="text-[#7088A1] cursor-pointer w-10 h-10 p-2 rounded-lg hover:bg-red-500 hover:text-gray-200 duration-200" />
              </div>
            </div>
          </div>

          {/* progress bar */}
          {!!(checked?.length + unchecked?.length) ? (
            <div className="relative flex items-center px-1">
              <div className="w-full">
                <div className="relative flex w-full h-px bg-[#ECECEC]">
                  <div className="h-full" />
                </div>
                <div
                  className="relative flex h-1 bg-[#5DD2D3]"
                  style={{
                    width:
                      (checked.length / (checked.length + unchecked.length)) *
                        100 +
                      "%",
                  }}
                >
                  <div className="h-full" />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-2">
                {checked?.length}/{checked?.length + unchecked?.length}
              </p>
            </div>
          ) : (
            <div className="relative flex items-center px-1">
              <div className="relative flex w-full h-px bg-[#ECECEC]">
                <div className="h-full" />
              </div>
            </div>
          )}

          {/* main part */}
          {/* overflow issue fixed here */}
          <div className="flex  h-5/6	 gap-5">
            <div className={`flex flex-col ${showChat ? "w-7/12" : "w-full"} `}>
              <div className="overflow-scroll lg:overflow-scroll md:overflow-scroll xl:overflow-scroll sm:overflow-scroll  no-scrollbar">
                {/* show routing */}
                {/* <div className="flex items-center py-4 text-gray-400 ">
                                    <span className="text-xs font-bold cursor-pointer hover:text-teal-500">
                                        {selectedSpace.name}
                                    </span>
                                    <span className="text-xs font-bold cursor-pointer hover:text-teal-500">
                                        {nameOfBoardList}
                                    </span>
                                </div> */}

                <div className="px-1">
                  <CardTags
                    localCard={localCard}
                    setLocalCard={setLocalCard}
                    selectedSpaceId={selectedSpaceId}
                    selectedWorkspaceId={selectedWorkspaceId}
                    listID={listID}
                    handleDataChange={handleDataChange}
                  />
                </div>

                <div className="py-2 px-1">
                  <div className="py-2 w-fit text-gray-400  group">
                    <p className="text-[14px] text-[#818892]">Description</p>
                  </div>
                  {!editDescription ? (
                    <textarea
                      className="w-full border-0 p-2 rounded-2xl bg-[#ECECEC]/[0.5] text-slate-500 hover:border-gray-400 min-h-[100px]"
                      type="text"
                      defaultValue={localCard?.description}
                      onClick={() => setEditDescription((prev) => !prev)}
                    />
                  ) : (
                    <textarea
                      className={`w-full border-0 p-2 rounded-2xl bg-[#ECECEC]/[0.5] text-slate-500 hover:border-gray-400 min-h-[100px] focus:outline-none ${
                        editDescription ? "ring-[1px]" : ""
                      } focus:ring-[1px] focus:ring-violet-500`}
                      type="text"
                      defaultValue={localCard?.description}
                      onChange={(e) => {
                        setLocalCard((pre) => ({
                          ...pre,
                          description: e.target.value,
                        }));
                      }}
                      onBlur={(e) =>
                        handle_card_description_update_enter_btn(e)
                      }
                    />
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

                {/* checklist */}
                <div className="py-2 px-1">
                  {/* <div className="flex items-center gap-2 py-2 cursor-pointer w-fit rounded-md duration-200 text-gray-400 group">
                                <CheckList className="text-[#B9C3CE] group-hover:text-teal-400" />{' '}
                                <span>Checklist</span>
                            </div> */}
                  <div className="py-2 w-fit text-gray-400  group">
                    <p className="text-[14px] text-[#818892]">Checklist</p>
                  </div>

                  {localCard?.startDate && localCard?.endDate && (
                    <div className="border-b-[1px] border-b-[#ECECEC] pb-2 mb-2">
                      <p className="font-[600]">
                        Task of {formatDate(localCard.startDate, "MMM, dd")} -{" "}
                        {formatDate(localCard.endDate, "MMM, dd")}
                      </p>
                    </div>
                  )}
                  {/* <div className="border-b-[1px] border-b-[#ECECEC] pb-2 mb-2">
                                        <p className="font-[600]">
                                            Task of{' '}
                                            {localCard?.startDate
                                                ? formatDate(
                                                      localCard.startDate,
                                                      'MMM, dd'
                                                  )
                                                : 'Start'}{' '}
                                            -{' '}
                                            {localCard?.endDate
                                                ? formatDate(
                                                      localCard.endDate,
                                                      'MMM, dd'
                                                  )
                                                : 'End'}
                                        </p>
                                    </div> */}

                  <div className="">
                    {localCard?.checkList?.length > 0 &&
                      localCard?.checkList?.map((item) => (
                        <div
                          className="flex items-center justify-between overflow-visible"
                          key={item._id}
                        >
                          <label>
                            <input
                              type="checkbox"
                              className="w-4 h-4 cursor-pointer rounded-full border border-[#6576FF] accent-[#6576FF] focus:ring-red-900"
                              defaultChecked={item.checked}
                              onClick={(e) =>
                                handle_check_list_update_on_change(e, item._id)
                              }
                            />
                          </label>
 

            {/* There is a issue */}


                          <input
                            type="text"
                            id="large-input"
                            defaultValue={item.content}
                            onBlur={(e) =>
                              handle_check_list_update_on_change(e, item._id)
                            }
                            className="flex-1 mx-2 my-2 px-2 py-0.5 rounded-md border outline-none border-white focus:border-teal-600 duration-200 resize-y h-full text-centerd "
                          />
                          <div
                            onClick={() =>
                              handle_remove_check_list_item(item._id)
                            }
                            className="boardActionDropDownSm flex justify-center"
                          >
                            <Delete className="group-hover:text-teal-500" />
                            {/* <p>Delete</p> */}
                          </div>

                          {/* <Dropdown
                            width={120}
                            position="left center"
                            button={
                              <EllipsisHorizontalIcon className="text-[#7088A1] cursor-pointer w-10 h-10 p-2 rounded-lg hover:bg-gray-200 hover:text-teal-500 duration-200" />
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
                              </div>
                            )}
                          /> */}
                        </div>
                      ))}

                    {newCheckListItemJSX && (
                      <div className="flex items-center justify-between">
                        {/* <input
                                                    type="checkbox"
                                                    name="check"
                                                    className="w-4 h-4 cursor-pointer"
                                                    style={{ color: 'red' }}
                                                    checked={
                                                        checkListItem?.checked
                                                    }
                                                    onChange={
                                                        handle_check_list_change
                                                    }
                                                /> */}

                        {cLLoading ? (
                          <ClipLoader color="#36d7b7" size="20" />
                        ) : (
                          <input
                            title="Please save list to check"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer rounded-full border border-[#6576FF]"
                            checked={false}
                          />
                        )}
                        <input
                          title="Press enter to save and continue"
                          type="text"
                          name="content"
                          value={checkListItem?.content}
                          onChange={handle_check_list_change}
                          onKeyDown={handle_check_list_item_enter_btn}
                          className="flex-1 mx-2 my-2 px-2 py-0.5 rounded-md border outline-none border-teal-600 duration-200"
                        />
                        <div
                          onClick={() => {
                            setCheckListItem();
                            setNewCheckListItemJSX(false);
                          }}
                          className="boardActionDropDownSm flex justify-center"
                        >
                          <Delete className="group-hover:text-teal-500" />
                        </div>
                        {/* <Dropdown
                          width={120}
                          position="left center"
                          button={
                            <EllipsisHorizontalIcon className="text-[#7088A1] cursor-pointer w-10 h-10 p-2 rounded-lg hover:bg-gray-200 hover:text-teal-500 duration-200" />
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
                        /> */}
                      </div>
                    )}

                    <Button
                      className="bg-[#E4FFED] hover:bg-green-300 mt-2"
                      onClick={handle_create_check_list}
                    >
                      <p className="flex justify-center items-center text-[15px] text-[#45BA6B]">
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Add item
                      </p>
                    </Button>
                  </div>
                </div>

                {/* <div className="flex items-center gap-2 py-2 cursor-pointer w-fit rounded-md duration-200 text-gray-400 group">
                            <Attachment className="mt-4 mb-4 text-[#B9C3CE] group-hover:text-teal-400" />{' '}
                            <span>Attachments</span>
                        </div> */}
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

                <div className="flex items-center py-2 px-1 gap-1 flex-wrap">
                  <div className="py-2 w-fit text-gray-400  group">
                    <p className="text-[14px] text-[#818892]">Attachments</p>
                  </div>

                  {attachFileLoading && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-[#9cb4db20] grid place-items-center">
                      <div className="loading_continuous"></div>
                    </div>
                  )}

                  {localCard?.attachments?.length > 0 &&
                    localCard?.attachments?.map((file, i) => (
                      <DocView
                        button={
                          <div
                            key={i}
                            className="relative rounded-md p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 group w-[100px] h-[100px]"
                          >
                            <p
                              className="absolute top-[-2px] right-[-2px] px-1.5 py-0 rounded-full text-center leading-5 text-red-500 border-0 border-red-500 bg-white duration-200 invisible group-hover:visible"
                              onClick={() => handle_attach_delete(file)}
                            >
                              x
                            </p>
                            <div className="w-full h-full">
                              <PreviewDoc
                                file={file}
                                i={i}
                                setImages={setImages}
                              />
                            </div>
                            {/* <div className="text-sm pt-2">
                                                                <p>
                                                                    By{' '}
                                                                    <b>
                                                                        {
                                                                            userInfo.username
                                                                        }
                                                                    </b>
                                                                </p>
                                                            </div>  */}
                          </div>
                        }
                        docs={docs}
                        index={i}
                      />
                    ))}
                </div>
                <div className="py-2 px-1">
                  <DragDropFile
                    setAttachFileLoading={setAttachFileLoading}
                    cardAttachmentUpdateApiCall={cardAttachmentUpdateApiCall}
                    selectedSpaceId={selectedSpaceId}
                    listID={listID}
                    card={localCard}
                    setLocalCard={setLocalCard}
                    handleDataChange={handleDataChange}
                  />
                </div>
              </div>
            </div>
            {/* <div className="lg:h-60 h-60 md:h-[50vh] sm:h-[40vh] xl:h-[80vh]" >
          
           </div> */}
            {showChat ? (
              <CardMessage listId={listID} cardId={localCard._id} />
            ) : null}
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

      {/* {localCard?.attachments && (
                <DocView docs={docs} />

                <ImgsViewer
                    imgs={
                        localCard?.attachments.map((img) => ({ src: img })) ||
                        []
                    }
                    currImg={images.currentImage}
                    isOpen={images.isOpen}
                    onClickPrev={() =>
                        setImages((p) => ({
                            ...p,
                            currentImage: p.currentImage - 1,
                        }))
                    }
                    onClickNext={(e) =>
                        setImages((p) => ({
                            ...p,
                            currentImage: p.currentImage + 1,
                        }))
                    }
                    onClose={() => setImages((p) => ({ ...p, isOpen: false }))}
                />
            )} */}
    </React.Fragment>
  );
};

export default CardDetails;
