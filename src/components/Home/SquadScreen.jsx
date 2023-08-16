import React, { useRef } from "react";
import VideoCallIcon from "../../assets/video_call.svg";
import AudioCallIcon from "../../assets/audio_call.svg";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../Board/Board";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Chat from "../Chat/Chat";
import SquadMembers from "./SquadMembers/SquadMembers";
import { addLocalAudioTrack, callReceived } from "../../store/slice/global";
import { get_space_members, remove_space_members } from "../../api/space";

import ring from "../../assets/ring.wav";
import { useCommingSoonContext } from "../../context/FeatureContext";

const SquadScreen = ({ currentWorkspace, selectedSpace }) => {
  const { showModal, setShowModal } = useCommingSoonContext();
  const { participantID, workspace_id } = useParams();
  const [selectedTab, setSelectedTab] = useState("board");
  const [showType, setShowType] = useState("grid");
  const [showChat, setShowChat] = useState(true);
  const dispatch = useDispatch();
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const { socket, call } = useSelector((state) => state.global);

  const { state } = useLocation();
  const location = useLocation();

  const ringRef = useRef();

  const [members, setMembers] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchSquadMembers = async () => {
    try {
      const { data } = await get_space_members(selectedSpace?._id);
      console.log(data);
      setMembers(data?.members);
    } catch (err) {
      // toast.error(err?.message, {
      //     autoClose: 3000,
      // })
      console.log("Error occured ==> ", err);
    }
  };

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

  const startCall = (type) => {
    if (call?.data) return;

    ringRef.current = new Audio(ring);
    ringRef.current.loop = true;
    ringRef.current.play();

    dispatch(callReceived(true));
    socket?.emit("START_CALL", selectedSpaceId, false, type);
  };

  useEffect(() => {
    if (state?.tab) {
      setSelectedTab(state?.tab ?? "messages");
      window.history.replaceState({}, document.title);
    }
  }, [state?.tab]);

  useEffect(() => {
    let tab = location?.hash?.slice(1);
    if (tab) {
      setSelectedTab(tab);
    }
  }, [location]);

  const TabsScreen = {
    messages: <Chat />,
    board: <Board selectedSpaceId={workspace_id} showType={showType} />,
    members: <SquadMembers showType={showType} selectedSpace={selectedSpace} />,
  };

  const TabsName = {
    // messages: "Messages",
    board: "Board",
    // members: "Members",
  };

  return (
    <div className="bg-[#FFF] w-full h-full">
      <div className={`relative bg-[#FFF] h-full flex flex-col`}>
        <div className="w-full h-full bg-white rounded-[16px] px-[40px] pt-[70px] flex flex-col">
          <div className="flex flex-row items-center justify-between pb-[20px]">
            {/* <div className="flex items-center gap-[10px]">
                            <FolderIcon className="w-[20px] h-[20px]" style={{ fill: selectedSpace?.color }} />
                            <h2 className="text-[20px] text-[#424D5B] font-semibold mr-[9px]">{selectedSpace?.name}</h2>
                        </div> */}
            <div className="flex items-center gap-[50px] w-full">
              {Object.keys(TabsName).map((value, idx) => {
                return (
                  <a
                    href={`#${value.toLowerCase()}`}
                    key={idx}
                    onClick={() => setSelectedTab(value)}
                    className={`${
                      selectedTab === value
                        ? "border-b-2 border-b-[#6576FF] text-[#031124]"
                        : "text-[#818892]"
                    } text-[19px] font-medium   cursor-pointer`}
                  >
                    {TabsName[value]}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center justify-between w-1/2">
              <div className="flex items-center">
                <div
                  className={`cursor-pointer hover:bg-gray-200 p-1 rounded-lg space-x-5 mr-5`}
                >
                  <span
                    className={`rounded-full ring-[1px] p-1 ${
                      showChat
                        ? "bg-[#54CC7C] ring-[#ECECEC]"
                        : "ring-[#54CC7C]"
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
                {members.map((user, i) => (
                  <div className="ml-[-10px]">
                    {user.avatar ? (
                      <span className="rounded-full ring-[1px] bg-white ring-white text-black font-bold grid place-items-center p-1">
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
              </div>
              <div className="flex items-center gap-[22px] relative">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    //startCall("video")
                    setShowModal(!showModal);
                  }}
                >
                  <img src={VideoCallIcon} alt="video_call" />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    //startCall("audio");
                    setShowModal(!showModal);
                  }}
                >
                  <img src={AudioCallIcon} alt="audio_call" />
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-row h-full">
            <div className={`h-full w-full pb-10 mx-auto  overflow-hidden`}>
              {TabsScreen["board"]}
            </div>
            {showChat && (
              <div
                className={`h-full w-1/2 pb-10 mx-auto  overflow-hidden ml-5`}
              >
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
