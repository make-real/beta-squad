import React from "react";
import {
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../Board/Board";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Chat from "../Chat/Chat";
import SquadMembers from "./SquadMembers/SquadMembers";
import { get_space_members, remove_space_members } from "../../api/space";
import { addBoardListApiCall } from "../../hooks/useFetch";
import { get_tags } from "../../api/tags";
import {
  useAppStateContext,
  useCommingSoonContext,
} from "../../context/FeatureContext";
import { useBoardCardContext } from "../../context/BoardCardContext";
import CalendarIcon from "../../assets/icons/svg/CalenderIcon";
import GoogleMeet from "../../assets/images/meet.png";
import ShowFile from "./ShowFile/ShowFile";
import Add from "../../assets/icon_component/Add";
import Check from "../../assets/icons/svg/Check";
import { PiFolderOpenBold } from "react-icons/pi";
import AddMemberBefore from './../../assets/icons/svg/AddMemberBefore';
import { MdElectricScooter } from "react-icons/md";
import { selectTag } from "../../store/slice/TagId";
import { calcLength } from "framer-motion";

import { toast } from "react-toastify";
import avatar from "../../../src/assets/profile_circle.svg"



const SquadScreen = ({ currentWorkspace, selectedSpace, singleMember }) => {
  const { showModal, setShowModal } = useCommingSoonContext();
  const { showChat, setShowChat, selectedTab, setSelectedTab } =
    useAppStateContext();
  const { participantID, workspace_id } = useParams();
  const [showType, setShowType] = useState("grid");
  const [showSquadMembers, setShowSquadMembers] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const dispatch = useDispatch()


  const {
    addBoardList,
    addBoard,
    setAddBoard,
    filterBoardList,
    filteredList,
    setFilteredLists,
    boardLists,
  } = useBoardCardContext();
  const [tags, setTags] = useState([]);
  const [TabsName, setTabsName] = useState(["All"]);
;

  const [members, setMembers] = useState([]);

 const selectTags =  tags?.tags?.filter(tag => tag?.name === selectedTab)

 const selectTagId=selectTags? selectTags[0] :null
  useEffect(()=>{
     dispatch(selectTag(selectTagId))
  
  },[selectTagId,dispatch])
   

 

  const handleBoardListCreation = async (squadId, text) => {
    const listObject = { name: text };
    setListLoading(true);

    try {
      const { data } = await addBoardListApiCall(squadId, listObject);
      setListLoading(false);
      addBoardList(data.list);

      toast.success(`${data?.list?.name} - list create successfully`, {
          autoClose: 3000,
      });
    } catch (error) {
      console.log(error.response.data);

      setListLoading(false);
      // toast.error(error?.response?.data?.issue?.message, {
      //     autoClose: 3000,
      // });
    }
  };

  const fetchSquadMembers = async () => {
    try {
      if (selectedSpace?._id) {
        const { data } = await get_space_members(selectedSpace?._id);

        setMembers(data?.members);
      }
    } catch (err) {
      console.log("Error occured ==> ", err);
    }
  };

  const getTags = async () => {
    try {
      // GET Method || For fetching all tag's under specific workShop
      const { data } = await get_tags({
        workSpaceId: workspace_id,
      });

      setTags(data);
      const remainTag = data?.tags.map((item) => item?.name);
      setTabsName(["All", ...remainTag]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTags();
  }, [selectedSpace]);
  

  useEffect(() => {
    if (selectedSpace) {
      fetchSquadMembers();
    }
  }, [selectedSpace]);

  useEffect(() => {
    if (!selectedTab) {
      setSelectedTab("All");
    }
  }, []);

  useEffect(() => {
    if (selectedTab === "All") {
      filterBoardList("All");
    } else {
      filterBoardList(selectedTab);
    }
  }, [selectedTab, filteredList, boardLists]);

  // useEffect(() => {
  //   if (state?.tab) {
  //     setSelectedTab(state?.tab ?? "messages");
  //     window.history.replaceState({}, document.title);
  //   }
  // }, [state?.tab]);

  // useEffect(() => {
  //   let tab = location?.hash?.slice(1);
  //   if (tab) {
  //     setSelectedTab(tab);
  //   }
  // }, [location]);

  const addBoardRef = React.useRef();

  const TabsScreen = {
    messages: <Chat />,
    file: <ShowFile selectedSpaceId={selectedSpace?._id} showFile={showFile} />,
    board: (
      <Board
        selectedSpaceId={workspace_id}
        showType={showType}
        addBoardRef={addBoardRef}
      />
    ),
    members: <SquadMembers showType={showType} selectedSpace={selectedSpace} />,
  };

  return (
    <div className="bg-[#FFF] w-full h-full mb-0 pb-0 -mt-[80px]">
      <div className={`relative bg-[#FFF] h-full flex flex-col`}>
        <div className="w-full h-full bg-white rounded-[16px] px-[40px] pt-[80px] flex flex-col">
          <div className="flex flex-row items-center gap-4  py-[10px]">
            <div className="flex items-center w-full gap-8">
              <div className="flex items-center w-[60%] duration-200 overflow-auto customScroll pb-1">
                {TabsName.map((value, idx) => {
                  return (
                    <p
                      key={idx}
                      onClick={() => setSelectedTab(value)}
                      className={`${
                        selectedTab === value
                          ? " text-[#6576FF] font-inter py-1 bg-slate-200 px-2  rounded-lg"
                          : "text-[#818892] "
                      } text-md cursor-pointer font-inter mr-3 whitespace-nowrap px-2  py-1 `}
                    >
                      {value}
                    </p>
                  );
                })}
              </div>
              <div className="flex">
                <div
                  onClick={() =>setSelectedTab("Done")}
                  className={`${
                    selectedTab === "Done"
                      ? " text-[#6576FF] font-inter bg-slate-200 py-2 px-2  rounded-lg"
                      : "text-[#818892] "
                  } text-md cursor-pointer flex gap-2 border py-1 px-2 rounded-md font-inter mr-3 whitespace-nowrap `}
                  // onClick={(text) => handleBoardListCreation(workspace_id, text)}
                >
                  <Check size="18" />
                  <h3
                    className={`${
                      selectedTab === "Done"
                        ? "text-[#6576FF]"
                        : "text-gray-400"
                    }  font-inter text-sm whitespace-nowrap`}
                  >
                    Done
                  </h3>
                </div>
                <div
                  className="border-[1px] p-1 px-3 rounded-md cursor-pointer select-none flex items-center  gap-1"
                  // onClick={(text) => handleBoardListCreation(workspace_id, text)}
                  onClick={() => {
                    setAddBoard(!addBoard);
                    if (addBoard === false) {
                      addBoardRef.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  <Add />
                  <h3 className="text-gray-400 font-inter text-sm whitespace-nowrap">
                    New board
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-1/2 ">
              <div className="flex items-center">
                <div className={`${singleMember ? "hidden":"flex items-center justify-start"}`}>
                {members.slice(0, 3).map((user, i) => (
                        <div key={i} className="ml-[-10px]">
                            <span className="rounded-full ml-[-6px]   text-black font-bold grid place-items-center p-1">
                              <img
                                src={
                                  user?.avatar ? user?.avatar:
                                  avatar
                                }
                                alt=""
                                className="h-7 w-7 text-[#14BCBE] flex justify-center items-center rounded-full"
                              />
                            </span>
                        </div>
                      ))}

                  <div
                    className="ml-[-10px]"
                    onClick={() => {
                      setShowSquadMembers(!showSquadMembers)
                      setShowFile(false);
                      setShowChat(false);
                    }}
                  >
                   <AddMemberBefore />
                  </div>
                  {/* {showAddMemberModal && <AddMembers selectedSpace={selectedSpace} setShowAddMemberModal={setShowAddMemberModal} />} */}
                </div>
              </div>
              <div className="flex items-center gap-[22px] relative">

                {/* chat icon disabled from here */}
                <div
                  className={`cursor-pointer hover:bg-gray-200 p-1 rounded-lg`}
                >
                  <span
                    className={`rounded-full ring-[1px] p-1 ${
                      showChat
                        ? "bg-[#54CC7C] ring-[#ECECEC]"
                        : "ring-[#54CC7C]"
                    } text-black font-bold grid place-items-center`}
                    onClick={() => {
                      if (showSquadMembers) {
                        setShowSquadMembers(!showSquadMembers);
                        if (!showChat) {
                          setShowChat(!showChat);
                        }
                        if (showChat) {
                        }
                      } else setShowChat((showChat) => !showChat);
                      setShowFile(false);
                    }}
                  >
                    <ChatBubbleBottomCenterTextIcon
                      className={`w-5 h-5 ${
                        showChat ? "text-white" : "text-[#54CC7C]"
                      } `}
                    />
                  </span>
                </div>



                <div
                  className="cursor-pointer rounded-md p-1 hover:bg-gray-200"
                  onClick={() => {
                    //startCall("video")

                    setShowSquadMembers(false);

                    setShowChat(false);

                    setShowFile(!showFile);
                  }}
                >
                  <span
                    className={`rounded-full ring-[1px] p-1 ${
                      showFile
                        ? "bg-[#54CC7C] ring-[#ECECEC]"
                        : "ring-[#54CC7C] "
                    }  font-bold grid place-items-center`}
                    
                  >
                  <PiFolderOpenBold
                    className={`w-5 h-5 ${
                      showFile ? "text-white" : "text-[#54CC7C]"
                    } `}
                  />
                  </span>
                  {/* <img src={VideoCallIcon} alt="video_call" /> */}
                </div>

                {/* Calender is disabled from here */}



                {/* <div
                  className="cursor-pointer rounded-md p-1 hover:bg-gray-200"
                  onClick={() => {
                    //startCall("audio");
                    setShowModal(!showModal);
                  }}
                >
                  <CalendarIcon /> */}
                  {/* <img src={AudioCallIcon} alt="audio_call" /> */}
                {/* </div> */}

                   {/* Google meet is disabled from here */}


                {/* <div
                  className="cursor-pointer rounded-md p-1 hover:bg-gray-200"
                  onClick={() => { */}
                    {/* //startCall("audio");
                    // setShowModal(!showModal); */}
                  {/* }}
                >
                  <a
                    className="rounded-full ring-[1px] ring-[#54CC7C] p-1 grid place-items-center"
                    href="https://meet.google.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={GoogleMeet}
                      alt="google_mmet"
                      className="h-5 w-5"
                    />
                  </a>
                </div> */}
              </div>
            </div>
            
          </div>
          <div className=" flex flex-row h-full">
            <div className={`h-full w-full pb-5 mx-auto  overflow-hidden`}>
              {TabsScreen["board"]}
            </div>
            {showSquadMembers && (
              <div className={`h-full w-1/2 mx-auto  overflow-hidden`}>
                {TabsScreen["members"]}
              </div>
            )}
            {!showSquadMembers && !showChat && showFile && (
              <div className={`h-full w-1/2 mx-auto  overflow-hidden`}>
                {TabsScreen["file"]}
              </div>
            )}
            {!showSquadMembers && showChat && (
              <div className={`h-full w-1/2 mx-auto  overflow-hidden`}>
                {TabsScreen["messages"]}
              </div>
            )}
            {/* {!showSquadMembers && !showChat && !showFile && (
              <div className={`h-full w-1/2 mx-auto  overflow-hidden`}>
                {TabsScreen["board"]}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadScreen;
