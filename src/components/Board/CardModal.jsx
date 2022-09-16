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
import { cardAttachmentUpdateApiCall, cardUpdateApiCall, createChecklistItem, deleteChecklistItem, getAllUser, getSpaceMembers, updateChecklistItem } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import Dropdown from "../Dropdown";
import ConfirmDialog from "./ConfirmDialog";
import AssigneeUser from "../AssigneeUser/AssigneeUser";


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
const CardModal = ({ setBoardModal, noteDone, setNoteDone, card, listID, progress, setProgress, progressStatus }) => {

  const [localCard, setLocalCard] = useState(card);
  const { updateCard, boardLists } = useBoardCardContext();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const selectedSpace = useSelector((state) => state.space.selectedSpaceObj);
  const userSelectedWorkSpaceId = useSelector((state) => state.workspace.selectedWorkspace);
  const nameOfBoardList = boardLists.find(({ _id }) => _id === listID).name;

  const [showTags, setShowTags] = useState(false);
  const [tagsFromAPI, setTagsFromAPI] = useState([]);
  const [openAssigneeModal, setOpenAssigneeModal] = useState(false);

  // const [searchUserForAssignee, setSearchUserForAssignee] = useState('');
  // const [allUserForAssignee, setAllUserForAssignee] = useState([]);

  const [modalActionToggling, setModalActionToggling] = useState(false);
  const [newCheckListItemJSX, setNewCheckListItemJSX] = useState(false);
  const [attachFileLoading, setAttachFileLoading] = useState(false);
  const [deleteAttachFile, setDeleteAttachFile] = useState('');
  const [deleteAttachFileLoading, setDeleteAttachFileLoading] = useState(false);
  const [createNewTag, setCreateNewTag] = useState({
    name: "",
    color: "#47b9ea",
  });

  const [checkListItem, setCheckListItem] = useState({
    checked: false,
    content: '',
  })



  // 🟩🟩🟩
  // user esc key press Event Listener for closing modal...
  useEffect(() => {
    const handleEscapeKeyPress = e => {
      if (e.code === "Escape") setBoardModal(false);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, [setBoardModal]);

  // 🟩🟩🟩
  // CardInfo Modal Data Update when user input new data...
  useEffect(
    () => updateCard(listID, card._id, localCard),
    [listID, card._id, localCard]
  );

  // console.log(localCard);
  // 🟩🟩🟩
  useEffect(() => {
    const getTags = async () => {
      try {
        // GET Method || For fetching all tag's under specific workShop
        const { data } = await get_tags(userSelectedWorkSpaceId);

        // tags
        const remainTag = data?.tags.filter(({ _id }) => !localCard?.tags?.some(tag => tag._id === _id));

        setTagsFromAPI(remainTag);
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
  }, [userSelectedWorkSpaceId, createNewTag]);


  // 🟩🟩🟩
  const handle_add_tags = async (tag) => {
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

  // 🟥🟥🟥
  const handle_delete_tags = async (tag) => {

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

  // 🟩🟩🟩
  const handle_new_tag_creation = async (e) => {
    e.preventDefault();

    try {
      // POST Method for creating tag's inside a specific workSpace
      const { data } = await create_tag({ workSpaceId: userSelectedWorkSpaceId, ...createNewTag });
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

  // 🟩🟩🟩
  // const debounceHandler = (fun, delay) => {
  //   let timeOutId;
  //   return (...arg) => {
  //     clearTimeout(timeOutId);
  //     timeOutId = setTimeout(() => {
  //       fun(...arg)
  //     }, delay);
  //   }
  // }

  // const getCardName = (cardName) => {
  //   setLocalCard(pre => ({ ...pre, name: cardName }));

  // }

  // const deBounceGetCardName = debounceHandler(getCardName, 1000);


  // 🟩🟩🟩
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

  // 🟩🟩🟩
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

  // ✅✅✅
  const handle_create_check_list = () => setNewCheckListItemJSX(true);

  // ✅✅✅
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

      setCheckListItem({ checked: '', content: '' });
    }

  }

  // ✅✅✅
  const handle_check_list_change = e => {
    const { checked, name, value } = e.target;
    setCheckListItem(pre => ({ ...pre, [name]: [name].includes('content') ? value : checked }));
  }

  // ✅✅✅
  const handle_check_list_update_on_change = async (e, itemId) => {

    let updatedCheckList;
    const { type } = e.target;
    const tempCard = { ...localCard };

    if (type === 'checkbox') {
      updatedCheckList = {
        ...tempCard,
        checkList: tempCard.checkList.map(item => item?._id === itemId
          ? { ...item, checked: e.target.checked }
          : item
        )
      }
    } else {
      updatedCheckList = {
        ...tempCard,
        checkList: tempCard.checkList.map(item => item?._id === itemId
          ? { ...item, content: e.target.value }
          : item
        )
      }
    }

    // update UI
    setLocalCard(updatedCheckList);

    // updated object send at server
    const updatedCheckListItemObj = updatedCheckList?.checkList?.find(({ _id }) => _id === itemId)

    try {
      await updateChecklistItem(selectedSpaceId, listID, card._id, itemId, updatedCheckListItemObj);
    } catch (error) {
      console.log(error?.response?.data?.issue?.message);
    }

  }

  // 🟥🟥🟥
  const handle_remove_check_list_item = async (itemId) => {
    const tempCard = { ...localCard };

    const updatedCheckList = {
      ...tempCard,
      checkList: tempCard.checkList.filter(item => item._id !== itemId)
    }
    // updating ui...
    setLocalCard(updatedCheckList);

    try {
      const { data } = await deleteChecklistItem(selectedSpaceId, listID, card._id, itemId);
      toast.success(data?.message, { autoClose: 2000 });
    } catch (error) {
      console.log(error?.response?.data?.issue?.message);
    }
  }

  // 🟩🟩🟩 📌📌📌📌📌📌📌📌📌📌📌📌📌📌
  const handle_card_attachments = async e => {

    const files = e.target.files;

    const formData = new FormData();

    for (const file of files) {
      formData.append('attachments', file);
    }

    try {
      setAttachFileLoading(true);
      const { data } = await cardAttachmentUpdateApiCall(selectedSpaceId, listID, card._id, formData);
      setLocalCard(pre => ({ ...pre, attachments: data.updatedCard.attachments }))
      setAttachFileLoading(false);

    } catch (error) {
      console.log(error?.response?.data?.issue);
    }

  }

  // 🟥🟥🟥 📌📌📌📌📌📌📌📌📌📌📌📌📌📌
  const handle_attach_delete = file => {
    setDeleteAttachFileLoading(true);
    setDeleteAttachFile(file)
  }

  // 🟩🟩🟩
  const handle_open_assignee_modal = ( ) => {

    setOpenAssigneeModal(pre => !pre)

    // try {
    //   if (!openAssigneeModal) {
    //     const { data } = await getSpaceMembers(selectedSpaceId);
    //     console.log(data)
    //     const remainUser = data.members.filter(({ _id }) => !localCard?.assignee?.some(user => user._id === _id));
    //     setAllUserForAssignee(remainUser)
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

  }

  // // 🟩🟩🟩
  // const handle_add_assignee_users = async (user) => {
  //   setAllUserForAssignee(pre => pre.filter(({ _id }) => _id !== user._id));

  //   try {
  //     const { data } = await cardUpdateApiCall(selectedSpaceId, listID, card._id, { assignUser: user._id });
  //     setLocalCard(data.updatedCard)
  //   } catch (error) {
  //     toast.error(error.response.data.issue.assignUser, { autoClose: 2000 });
  //   }
  // }

  // // 🟥🟥🟥
  // const handle_remove_assignee_users = async (user) => {

  //   setAllUserForAssignee(pre => ([user, ...pre]));

  //   try {
  //     const { data } = await cardUpdateApiCall(selectedSpaceId, listID, card._id, { removeAssignedUser: user._id });
  //     setLocalCard(data.updatedCard)
  //   } catch (error) {
  //     toast.error(error.response.data.issue.assignUser, { autoClose: 2000 });
  //   }
  // }



  return (
    <section
      className="fixed top-0 right-0 left-0 bottom-0 z-[500] bg-black/30 grid place-items-center "
      onClick={() => setBoardModal(false)}
    >

      <div
        className="bg-gray-50 w-[60%] rounded-2xl overflow-y-auto overflow-x-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* 🟨🟨🟨 Section 1 ||| Heading area 🟨🟨🟨 */}
        <div className="flex items-center justify-between border-b border-gray-300 p-2">
          <div className="flex flex-wrap items-center pl-4 text-gray-400 text-sm">
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200">
              <RightOK />
              <span onClick={() => setProgress(pre => pre === 4 ? 0 : 4)}>Done</span>
            </div>

            <div className="flex items-center space-x-2 px-3 pl-4">
              <span>Progress:</span>
              <Progress progress={progress} setProgress={setProgress} />
            </div>

            {/* 🟨🟨🟨🟨🟨🟨 Assignee Section 🟨🟨🟨🟨🟨🟨 */}
            <div className="relative flex items-center space-x-2 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl text-gray-400">

              <div onClick={handle_open_assignee_modal} className='flex gap-2 px-3 py-2'>
                <UserPlus />
                <span>Assignee</span>
              </div>


              {
                openAssigneeModal &&
                <AssigneeUser
                  listID={listID}
                  localCard={localCard}
                  spaceID={selectedSpaceId}
                  setLocalCard={setLocalCard}
                  openAssigneeModal={openAssigneeModal}
                // searchUserForAssignee={searchUserForAssignee}
                // setSearchUserForAssignee={setSearchUserForAssignee}
                // allUserForAssignee={allUserForAssignee}
                // setAllUserForAssignee={setAllUserForAssignee}
                // handle_remove_assignee_users={handle_remove_assignee_users}
                // allUserForAssignee={allUserForAssignee}
                // handle_add_assignee_users={handle_add_assignee_users}
                />


                // <div className="absolute top-12 left-[50%] translate-x-[-50%]  w-[450px] bg-white rounded-md z-50 shadow-[1px_1px_8px_8px_rgba(0,0,0,.3)] before:content-[''] before:absolute before:top-[-6px] before:z-[-50] before:left-[50%] before:translate-x-[-50%] before:rotate-45 before:bg-white before:w-7 before:h-7"
                // >
                //   <div className="flex py-3 px-4 items-center justify-between text-gray-600">
                //     <p>Assign user to card</p>
                //     <p className="px-2 py-1 cursor-pointer hover:bg-gray-400 duration-300 rounded-md">Assign yourself</p>
                //   </div>

                //   <div className="px-4 pb-.5">
                //     {/* 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎 */}
                //     <input
                //       type="text"
                //       value={searchUserForAssignee}
                //       onChange={e => setSearchUserForAssignee(e.target.value)}
                //       className="text-black w-full px-2 py-1 rounded-md outline-none border focus:border-blue-400 duration-150"
                //     />
                //   </div>

                //   {
                //     // * List of users ===> that Assign yet...
                //     // 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
                //     localCard?.assignee?.length > 0 &&
                //     <div className={`mt-2 px-2  ${allUserForAssignee?.length === 0 && 'pb-2'}`}>
                //       <p className="text-black py-1">Already assigned</p>
                //       {
                //         localCard?.assignee?.map(user =>
                //           <div
                //             key={user?._id}
                //             className="relative group flex items-center px-2.5 py-2 hover:bg-gray-200 space-x-3 cursor-pointer rounded-lg hover:after:content-['X'] after:absolute after:text-themeColor after:right-4"
                //             onClick={() => handle_remove_assignee_users(user)}
                //           >
                //             {
                //               user.avatar
                //                 ? <img src={user.avatar} alt="" className="w-6 h-6 rounded-full ring ring-teal-500" />
                //                 : <p className="w-6 h-6 rounded-full ring ring-teal-500 text-black font-bold grid place-items-center">
                //                   {user?.fullName.charAt(0)}
                //                 </p>
                //             }

                //             <span className="duration-150 group-hover:text-black">{user?.fullName}</span>
                //           </div>
                //         )
                //       }
                //     </div>
                //   }

                //   {
                //     // ? Just Print List of users ===> that NOT Assign yet...
                //     // 🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵
                //     allUserForAssignee?.length > 0 &&
                //     <div className="mt-2 px-2 overflow-y-auto h-[250px] customScroll pb-2">
                //       <p className="text-black py-1">Not assigned</p>
                //       {
                //         allUserForAssignee
                //           ?.filter(user => user.fullName?.toLowerCase()?.includes(searchUserForAssignee?.toLowerCase()))
                //           ?.map(user =>
                //             <div
                //               key={user?._id}
                //               className="relative group flex items-center px-2.5 py-2 hover:bg-gray-200 space-x-3 cursor-pointer rounded-lg hover:after:content-['Assign'] after:absolute after:text-themeColor after:right-2"
                //               onClick={() => handle_add_assignee_users(user)}
                //             >
                //               {
                //                 user.avatar
                //                   ? <img src={user.avatar} alt="" className="w-6 h-6 rounded-full ring ring-teal-500" />
                //                   : <p className="w-6 h-6 rounded-full ring ring-teal-500 text-black font-bold grid place-items-center">
                //                     {user?.fullName.charAt(0)}
                //                   </p>
                //               }
                //               <span className="duration-150 group-hover:text-black">{user?.fullName}</span>
                //             </div>
                //           )
                //       }
                //     </div>
                //   }
                // </div>
              }
            </div>

            {/* <div className="flex items-center space-x-2 cursor-pointer p-3 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl">
              <EyeOpen width="22" height="22" />
              <span>Follow</span>
            </div>

            <div className="cursor-pointer p-3 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl">
              Start - Due
            </div> */}
          </div>

          <div className="flex items-center p-3 relative">
            <Dropdown
              button={<DotsSingle
                className="text-[#7088A1] cursor-pointer w-8 h-8 p-1 py-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200"
              />}
              menu={
                () => (
                  <CardSettingDropDown
                    cardID={card._id}
                    setProgress={setProgress}
                    listID={listID}
                    noteDone={noteDone}
                    setNoteDone={setNoteDone}
                    setModalActionToggling={setModalActionToggling}
                    setCardSettingDropDownToggle={setModalActionToggling}
                  />
                )
              }
            />

            <Close
              className="text-[#7088A1] cursor-pointer w-8 h-8 p-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200"
              onClick={() => setBoardModal(false)}
            />
          </div>
        </div>


        {/* 🟨🟨🟨 Section 2 ||| Middle area 🟨🟨🟨 */}
        <div className="flex flex-col border-b border-gray-300 ">
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
                    onClick={() => handle_delete_tags(tag)}
                  >
                    {tag.name}
                  </span>
                ))
              }
              {tagsFromAPI.length > 0 ? (
                <form onSubmit={handle_new_tag_creation}>
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
                      key={i}
                      onClick={() => {
                        setShowTags(false);
                        handle_add_tags(tag);
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

          <div className="mt-4 ml-4 w-full">
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

          <div className="mt-4 ml-4 ">
            <div className="flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group">
              <CheckList className="text-[#B9C3CE] group-hover:text-teal-400" />{" "}
              <span>Checklist</span>
            </div>

            <div className="space-y-2">
              {
                // check list print/display
                // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
                localCard?.checkList?.length > 0 &&
                localCard?.checkList?.map(item => (
                  <div className="flex items-center justify-between px-8" key={item._id}>

                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                      defaultChecked={item.checked}
                      onChange={(e) => handle_check_list_update_on_change(e, item._id)}
                    />

                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => handle_check_list_update_on_change(e, item._id)}
                      className="flex-1 mx-2 px-1 py-0.5 rounded-md border outline-none border-gray-300 focus:border-teal-600 duration-200"
                    />

                    <div className="relative group cursor-pointer px-2 hover:text-red-400">
                      <DotsSingle />
                      <div className="absolute top-[-22px] left-5 hidden group-hover:block bg-gray-200 px-3 py-1 rounded-md">

                        <p
                          className="hover:text-red-500 duration-200 hover:underline text-black"
                          onClick={() => handle_remove_check_list_item(item._id)}
                        >
                          Delete
                        </p>

                        <p className="text-black">Assign</p>

                      </div>
                    </div>
                  </div>
                ))
              }

              {
                // check list input
                // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
                newCheckListItemJSX &&
                <div className="flex items-center justify-between px-8">
                  <input
                    type="checkbox"
                    name="check"
                    className="w-4 h-4 cursor-pointer"
                    checked={checkListItem.checked}
                    onChange={handle_check_list_change}
                  />
                  <input
                    type="text"
                    name="content"
                    value={checkListItem.content}
                    onChange={handle_check_list_change}
                    onKeyDown={handle_check_list_item_enter_btn}
                    className="flex-1 mx-2 px-1 py-0.5 rounded-md border outline-none border-gray-300 focus:border-teal-600 duration-200"
                  />
                  <div className="px-2 cursor-pointer hover:text-red-400">
                    <DotsSingle />
                  </div>
                </div>
              }


              <p className="text-[#B9C3CE] px-3 py-2 rounded-md bg-slate-100 inline-block mt-2 ml-4 cursor-pointer hover:bg-slate-200 duration-150" onClick={handle_create_check_list}>
                Add item to check ist
              </p>
            </div>

          </div>

          <div className="mt-4 ml-4 mb-4">
            <label
              // onChange={cardAttachments}
              // 📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌
              htmlFor="file" className="flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group">
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
          </div>

          <div className="mb-4 mx-8 flex items-center gap-1 flex-wrap">
            {
              // 📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌
              attachFileLoading &&
              <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black/70 grid place-items-center">
                <div className="loading_continuous"></div>
              </div>
            }
            {
              // 📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌
              localCard?.attachments?.length > 0 &&
              localCard?.attachments?.map((file, i) =>
                <div
                  key={i}
                  className="relative rounded-md p-2 cursor-pointer hover:bg-gray-200 group"
                >
                  <div
                    className="absolute top-2 right-2 w-5 h-5 bg-gray-500 rounded-full text-center leading-5 hover:text-red-500 hover:bg-white duration-200 invisible group-hover:visible"
                    onClick={() => handle_attach_delete(file)}
                  >
                    x
                  </div>

                  <img src={file} alt="" className=" w-28 h-24" />
                  <div className="text-sm pt-2">
                    {/* <p><b>{getFileName(file)}</b></p> */}
                    {/* <p>Added <b>time</b></p> */}
                    <p>By <b>{userInfo.username}</b></p>
                  </div>
                </div>
              )
            }

            {
              deleteAttachFileLoading &&
              <ConfirmDialog
                listID={listID}
                cardID={localCard?._id}
                deleteAttachment
                setLocalCard={setLocalCard}
                setDeleteAttachFileLoading={setDeleteAttachFileLoading}
                deleteAttachFile={deleteAttachFile}
              />
            }
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
