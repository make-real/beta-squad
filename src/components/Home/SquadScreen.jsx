import React, { useRef } from "react";
import VideoCallIcon from "../../assets/video_call.svg";
import AudioCallIcon from "../../assets/audio_call.svg";
import { ChatBubbleBottomCenterTextIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../Board/Board";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Chat from "../Chat/Chat";
import SquadMembers from "./SquadMembers/SquadMembers";
import { addLocalAudioTrack, callReceived } from "../../store/slice/global";
import { get_space_members, remove_space_members } from "../../api/space";
import { AddBtn } from "../Board";
import { addBoardListApiCall } from "../../hooks/useFetch";
import { get_tags } from "../../api/tags";
import ring from "../../assets/ring.wav";
import {
  useAppStateContext,
  useCommingSoonContext,
} from "../../context/FeatureContext";
import { useBoardCardContext } from "../../context/BoardCardContext";
import AddMember from "../../assets/icons/svg/AddMember";
import Message from "../../assets/icons/svg/Message";
import PlusIcon from "../../assets/pus.svg";
import FileIcon from "../../assets/icons/svg/FileIcon";
import CalendarIcon from "../../assets/icons/svg/CalenderIcon";
import GoogleMeet from "../../assets/images/meet.png";
import board from "../../store/slice/board";
import AddMemberBefore from "../../assets/icons/svg/AddMemberBefore";
import ShowFile from "./ShowFile/ShowFile";
import Add from "../../assets/icon_component/Add";
import { RightArrow, RightOK } from "../../assets/icons";
import Check from "../../assets/icons/svg/Check";

const SquadScreen = ({ currentWorkspace, selectedSpace }) => {
  const { showModal, setShowModal } = useCommingSoonContext();
  const { showChat, setShowChat, selectedTab, setSelectedTab } =
    useAppStateContext();
  const { participantID, workspace_id } = useParams();
  const [showType, setShowType] = useState("grid");
  const [showSquadMembers, setShowSquadMembers] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const { socket, call } = useSelector((state) => state.global);
  const {
    addBoardList,
    addBoard,
    setAddBoard,
    filterBoardList,
    filteredList,
    setFilteredLists,
    boardLists,
  } = useBoardCardContext();
  const [tags, setTags] = useState();
  const [TabsName, setTabsName] = useState(["All"]);

  const { state } = useLocation();
  const location = useLocation();

  const ringRef = useRef();

  const [members, setMembers] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleBoardListCreation = async (squadId, text) => {
    const listObject = { name: text };
    setListLoading(true);

    try {
      const { data } = await addBoardListApiCall(squadId, listObject);
      setListLoading(false);
      addBoardList(data.list);

      // toast.success(`${data?.list?.name} - list create successfully`, {
      //     autoClose: 3000,
      // });
    } catch (error) {
      console.log(error.response.data);

      setListLoading(false);
      // toast.error(error?.response?.data?.issue?.message, {
      //     autoClose: 3000,
      // });
    }
  };

  console.log("SpaceID: ", selectedSpaceId);
  const fetchSquadMembers = async () => {
    try {
      const { data } = await get_space_members(selectedSpace?._id);

      console.log(data);
      setMembers(data?.members);
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
      setTabsName(["All", ...remainTag, "Done"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTags();
  }, [selectedSpace]);

  //console.log("TAGS: ", tags);
  console.log(TabsName)
  useEffect(() => {
    if (selectedSpace) {
      fetchSquadMembers();
    }
  }, [selectedSpace]);

  useEffect(() => {
    if (call?.data) {
      if (call?.data?.participants?.length != 1) {
        ringRef?.current?.pause();
      }
    }
  }, [call?.data?.participants]);

  useEffect(() => {
    if (!selectedTab) {
      setSelectedTab("All");
    }
  }, []);

 

  useEffect(() => {
    if (selectedTab === "All") {
      setFilteredLists(boardLists);
    } else {
      filterBoardList(selectedTab);
    }
  }, [selectedTab, filteredList, boardLists]);

  const startCall = (type) => {
    if (call?.data) return;

    ringRef.current = new Audio(ring);
    ringRef.current.loop = true;
    ringRef.current.play();

    dispatch(callReceived(true));
    socket?.emit("START_CALL", selectedSpaceId, false, type);
  };

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
    file: <ShowFile />,
    board: (
      <Board
        selectedSpaceId={workspace_id}
        showType={showType}
        addBoardRef={addBoardRef}
      />
    ),
    members: <SquadMembers showType={showType} selectedSpace={selectedSpace} />,
  };

  // const TabsName = {
  //   all: "All",
  //   //importtant: "Important",
  // };
  return (
    <div className="bg-[#FFF] w-full h-full mb-0 pb-0">
      <div className={`relative bg-[#FFF] h-full flex flex-col`}>
        <div className="w-full h-full bg-white rounded-[16px] px-[40px] pt-[70px] flex flex-col">
          <div className="flex flex-row items-center justify-between py-[10px]">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center w-[75%] ">
                {TabsName.slice(0,6).map((value, idx) => {
                  return (
                    <a
                      //href={`#${value.toLowerCase()}`}
                      key={idx}
                      onClick={() => setSelectedTab(value)}
                      className={`${
                        selectedTab === value
                          ? " text-[#6576FF] font-inter bg-[#EEF2FF] py-2 px-5 rounded-lg"
                          : "text-[#818892] px-2"
                      } text-md cursor-pointer font-inter mr-3 whitespace-nowrap`}
                    >
                      {value}
                    </a>
                  );
                })}
              </div>
              <div
                onClick={() => setSelectedTab('Done')}
                className="border-2 p-1 px-3 rounded-md cursor-pointer select-none flex items-center mr-2 gap-1"
                // onClick={(text) => handleBoardListCreation(workspace_id, text)}
                
              >
                <Check/>
                <h3 className="text-gray-400 font-inter text-sm whitespace-nowrap">
                 Done
                </h3>
              </div>
              <div
                className="border-2 p-1 px-3 rounded-md cursor-pointer select-none flex items-center mr-2 gap-1"
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

            <div className="flex items-center justify-between w-1/2 ml-5">
              <div className="flex items-center">
                <div className="flex items-center justify-start">
                  {members.slice(0, 3).map((user, i) => (
                    <div className="ml-[-10px]">
                      {user.avatar ? (
                        <span className="rounded-full ml-[-6px]   text-black font-bold grid place-items-center p-1">
                          <img
                            src={user.avatar}
                            alt=""
                            className="h-7 w-7 text-[#14BCBE] flex justify-center items-center rounded-full"
                          />
                        </span>
                      ) : (
                        <span className="rounded-full ring-[1px] bg-white ring-white text-black font-bold grid place-items-center p-1">
                          <p className="h-7 w-7 text-[#14BCBE] flex justify-center items-center">
                            {i || user?.fullName.charAt(0)}
                          </p>
                        </span>
                      )}
                    </div>
                  ))}
                  <div
                    className="ml-[-10px]"
                    onClick={() => {
                      setShowSquadMembers(!showSquadMembers);
                      setShowFile(false);
                    }}
                  >
                    {showSquadMembers ? <AddMember /> : <AddMemberBefore />}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[22px] relative">
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
                  className="cursor-pointer"
                  onClick={() => {
                    //startCall("video")

                    setShowSquadMembers(false);

                    setShowChat(false);

                    setShowFile(!showFile);
                  }}
                >
                  <FileIcon
                    className={`w-5 h-5 ${
                      showFile ? "text-white" : "text-[#54CC7C]"
                    } `}
                  />
                  {/* <img src={VideoCallIcon} alt="video_call" /> */}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    //startCall("audio");
                    setShowModal(!showModal);
                  }}
                >
                  <CalendarIcon />
                  {/* <img src={AudioCallIcon} alt="audio_call" /> */}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    //startCall("audio");
                    // setShowModal(!showModal);
                  }}
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
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadScreen;
