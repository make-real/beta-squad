import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { get_single_messages } from "../../../api/chat";
import { useSelector } from "react-redux";
import { addBulkMessagePrivate } from "../../../store/slice/privateChat";
import { useDispatch } from "react-redux";
import PrivateTextMessage from "../PrivateTextMessage";
import PrivateMessageBox from "../PrivateMessageBox";
import SearchIcon from "../../../assets/search.svg";
import VideoCallIcon from "../../../assets/video_call.svg";
import AudioCallIcon from "../../../assets/audio_call.svg";

import GridIcon from "../../../assets/icon_component/Grid";
import RowVerticalIcon from "../../../assets/icon_component/RowVertical";
import Draggable from "react-draggable";
import VideoOff from "../../../assets/icon_component/VideoOff";
import MicrophoneOn from "../../../assets/icon_component/MicrophoneOn";
import CallEnd from "../../../assets/icon_component/CallEnd";
import More from "../../../assets/icon_component/More";
import Folder from "../../../assets/icon_component/Folder";
import { callReceived } from "../../../store/slice/global";

import ring from "../../../assets/ring.wav";
import { useRef } from "react";
import { useCommingSoonContext } from "../../../context/FeatureContext";

const SingleChat = () => {
  const location = useLocation();
  const { participantID, workspace_id } = useParams();
  const [selectedTab, setSelectedTab] = useState("messages");
  const [selectedMember, setSelectedMember] = useState({});
  const workspaceMembers = useSelector(
    (state) => state.workspace.workspaceMembers
  );
  const { socket, call } = useSelector((state) => state?.global);
  const [showType, setShowType] = useState("grid");

  const dispatch = useDispatch();
  const { showModal, setShowModal } = useCommingSoonContext();

  useEffect(() => {
    if (workspaceMembers) {
      setSelectedMember(
        workspaceMembers.find((value) => value._id === participantID)
      );
    }
  }, [workspaceMembers, participantID]);

  useEffect(() => {
    getMessages();
  }, [participantID, workspace_id]);

  const getMessages = async () => {
    try {
      const { data } = await get_single_messages(workspace_id, participantID);

      dispatch(addBulkMessagePrivate(data.messages.reverse()));
    } catch (error) {
      console.log(error);
    }
  };

  const ringRef = useRef();

  useEffect(() => {
    if (call?.data?.participants?.length != 1) {
      ringRef?.current?.pause();
    }
  }, [call?.data?.participants]);

  const startCall = (type) => {
    if (call?.data) return;

    ringRef.current = new Audio(ring);
    ringRef.current.loop = true;
    ringRef.current.play();

    dispatch(callReceived(true));
    socket?.emit("START_CALL", selectedMember?._id, true, type);
  };
  const TabsScreen = {
    messages: <SingleChatScreen participantID={participantID} />,
    board: <></>,
  };

  const TabsName = {
    messages: "Messages",
    board: "Board",
  };

  useEffect(() => {
    let tab = location.hash.slice(1);
    if (tab) {
      setSelectedTab(tab);
    }
  }, [location]);

  return (
    <div className="bg-[#FFF] w-full h-full">
      <div className="relative pt-[40px] pb-[40px] px-[40px] h-full flex flex-col">
        <div className="w-full h-full bg-white rounded-[16px] px-[40px] pt-[30px] pb-[36px] flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[11px]">
              <div className="relative">
                <img
                  src={selectedMember?.avatar}
                  alt=""
                  className="w-[27px] h-[27px] rounded-full border-[2px] border-[#6576FF] object-cover"
                />
                <div className="absolute w-[12px] h-[12px] rounded-full bg-[#54CC7C] bottom-0 right-[-4px]"></div>
              </div>
              <h2 className="text-[20px] text-[#424D5B] font-semibold mr-[9px]">
                {selectedMember?.fullName}
              </h2>
            </div>

            <div className="flex items-center">
              <div className="flex items-center gap-[12px]">
                <img src={SearchIcon} alt="search" className="" />
                <input
                  type="text"
                  placeholder="Search here"
                  className=" placeholder:text-[#99A6B9] border-none outline-none"
                />
              </div>
              {selectedTab === "messages" ? (
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
                      //startCall("audio")
                      setShowModal(!showModal);
                    }}
                  >
                    <img src={AudioCallIcon} alt="audio_call" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-[22px]">
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowType("grid")}
                  >
                    <GridIcon isSelected={showType === "grid"} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowType("stack")}
                  >
                    <RowVerticalIcon isSelected={showType === "stack"} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-[30px]">
            <div className="flex items-center gap-[45px]">
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
                    } text-[19px] font-medium  pb-[10px] cursor-pointer`}
                  >
                    {TabsName[value]}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="w-full mt-[40px] h-full overflow-hidden">
            {TabsScreen[selectedTab]}
          </div>
        </div>
      </div>
    </div>
  );
};

// Single Chat work should done here.........
const SingleChatScreen = () => {
  const { participantID, workspace_id } = useParams();

  const [messageToRespond, setMessageToRespond] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    getMessages();
  }, [participantID, workspace_id]);

  const getMessages = async () => {
    try {
      const { data } = await get_single_messages(workspace_id, participantID);

      dispatch(addBulkMessagePrivate(data.messages.reverse()));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`border border-[#ECECEC] pb-5 rounded-lg h-full flex flex-col `}
    >
      <div
        // Previous
        style={
          {
            // height: `calc(100vh - ${messageToRespond ? 245 : 145}px)`,
            // marginTop: "70px",
          }
        }
        // now
        // style={{
        //     height: `calc(100% - ${messageToRespond ? 170 : 70}px)`,
        // }}
        className={`overflow-y-auto hide-scrollbar overflow-x-hidden border-b-[0.5px] pt-5 customScroll flex-1 
                ${
                  messageToRespond
                    ? "h-[calc(100%-245px)]"
                    : "h-[calc(100%-145px)]"
                }
                `}
      >
        <PrivateTextMessage
          messageToRespond={messageToRespond}
          setMessageToRespond={setMessageToRespond}
        />
      </div>
      <PrivateMessageBox
        messageToRespond={messageToRespond}
        setMessageToRespond={setMessageToRespond}
      />
    </div>
  );
};

export default SingleChat;
