import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { get_single_messages } from "../../api/chat";
import { addBulkMessagePrivate } from "../../store/slice/privateChat";
import PrivateTextMessage from "../Chat/PrivateTextMessage";
import PrivateMessageBox from "../Chat/PrivateMessageBox";
import SearchIcon from "../../assets/search.svg";
import GoogleMeet from "../../assets/images/meet.png";
import GridIcon from "../../assets/icon_component/Grid";
import RowVerticalIcon from "../../assets/icon_component/RowVertical";
import Development from "../../assets/images/development.avif";
import images from "../../assets";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { AddBtn } from "../Board";
import { useCommingSoonContext } from "../../context/FeatureContext";
import SquadScreen from "./SquadScreen";
import CalendarIcon from "../../assets/icons/svg/CalenderIcon";
import Add from "../../assets/icon_component/Add";
import Check from "../../assets/icons/svg/Check";
import { useBoardCardContext } from "../../context/BoardCardContext";
import { get_tags } from "../../api/tags";
import FileIcon from "../../assets/icons/svg/FileIcon";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import ShowFile from "./ShowFile/ShowFile";

const SingleScreen = () => {
  const location = useLocation();
  const {
    addBoardList,
    addBoard,
    setAddBoard,
    filterBoardList,
    filteredList,
    setFilteredLists,
    boardLists,
  } = useBoardCardContext();
  const { showModal, setShowModal } = useCommingSoonContext();
  const [tabsName, setTabsName] = useState(["All"]);
  const [tags, setTags] = useState();
  const [showFile, setShowFile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { participantID, workspace_id } = useParams();
  const [selectedTab, setSelectedTab] = useState("messages");
  const [selectedMember, setSelectedMember] = useState({});
  const workspaceMembers = useSelector(
    (state) => state.workspace.workspaceMembers
  );
  const [showType, setShowType] = useState("grid");

  const dispatch = useDispatch();

  useEffect(() => {
    if (workspaceMembers) {
      setSelectedMember(
        workspaceMembers.find((value) => value._id === participantID)
      );
    }
  }, [workspaceMembers, participantID]);

  const singleMember = true;
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

  const TabsScreen = {
    messages: <SingleChatScreen participantID={participantID} />,
    file: <ShowFile />,
    board: (
      <SingleBoardScreen participantID={participantID} showType={showType} />
    ),
  };

  const TabsName = {
    messages: "Messages",
    board: "Board",
  };

  const addBoardRef = React.useRef();
  useEffect(() => {
    let tab = location.hash.slice(1);
    if (tab) {
      setSelectedTab(tab);
    }
  }, [location]);
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
  }, []);

  return (
    <div className="bg-[#FFF] w-full h-full">
      {/* <div className="relative h-full flex flex-col">
        <div className="w-full h-full bg-white rounded-[16px] px-[40px] pt-[30px] pb-[36px] flex flex-col">
          <div className="flex items-center justify-between">
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
                      startCall("video")
                      setShowModal(!showModal);
                    }}
                  >
                    <img src={VideoCallIcon} alt="video_call" />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      startCall("audio")
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
          <div className="w-full mt-[40px] h-full overflow-hidden">
            {TabsScreen[selectedTab]}
          </div>
        </div>
      </div> */}
      {/* test*/}
      <div className="bg-[#FFF] w-full h-full mb-0 pb-0">
        <div className={`relative bg-[#FFF] h-full flex flex-col`}>
          <div className="w-full h-full bg-white rounded-[16px] px-[40px] pt-[20px] flex flex-col">
            <div className="flex flex-row justify-end items-center gap-4  py-[10px]">
              <div className="flex items-center   justify-end w-1/2 ">
                <div className="flex items-center gap-[22px] relative">
                 {/* single chat icon and functionality removed from here */}




                 
                  {/* <div
                    className={`cursor-pointer hover:bg-gray-200 p-1 rounded-lg`}
                  >
                    <span
                      className={`rounded-full ring-[1px] p-1 ${
                        showChat
                          ? "bg-[#54CC7C] ring-[#ECECEC]"
                          : "ring-[#54CC7C]"
                      } text-black font-bold grid place-items-center`}
                      onClick={() => {
                        setShowChat((showChat) => !showChat);
                      }}
                    >
                      <ChatBubbleBottomCenterTextIcon
                        className={`w-5 h-5 ${
                          showChat ? "text-white" : "text-[#54CC7C]"
                        } `}
                      />
                    </span>
                  </div> */}
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setShowChat(false);

                      setShowFile(!showFile);
                    }}
                  >
                    <FileIcon
                      className={`w-5 h-5 ${
                        showFile ? "text-white" : "text-[#54CC7C]"
                      } `}
                    />
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
              <div className={`h-full w-full pb-5 mx-auto overflow-hidden`}>
                {TabsScreen["board"]}
              </div>

              {!showChat && showFile && (
                <div className={`h-full w-1/2 mx-auto  overflow-hidden`}>
                  {TabsScreen["file"]}
                </div>
              )}
              {showChat && (
                <div className={`h-full w-1/2 mx-auto  overflow-hidden`}>
                  {TabsScreen["messages"]}
                </div>
              )}
            </div>
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

// Single Chat work should done here.........
const SingleBoardScreen = ({ showType }) => {
  const { participantID, workspace_id } = useParams();

  const [messageToRespond, setMessageToRespond] = useState();

  const dispatch = useDispatch();

  const userId = JSON.parse(localStorage.getItem("userId"));

  return (
    <section className="duration-200 overflow-hidden">
      {userId ? (
        showType === "grid" ? (
          <div className="flex flex-col items-center justify-center">
            <div className="h-full relative w-full max-w-[40%] max-h-[50%] bg-white rounded-[16px] px-[30px] overflow-y-scroll no-scrollbar flex flex-col items-center justify-center">

              <img src={Development} alt="" className="h-1/8" />
              <h1 className="text-[#6576FF] opacity-80 text-2xl">
               Something great is coming soon
              </h1>
            </div>
            {/* <DragDropContext onDragEnd={dragEnd}>
              <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex items-start"
                  >
                    {filterdBoardList()?.map((boardList, index) => (
                      <BoardList
                        showType={showType}
                        key={boardList?._id}
                        boardList={boardList}
                        listIndex={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <AddBtn
              loading={listLoading}
              showType={showType}
              placeHolder="Add list name..."
              btnText="list"
              onSubmit={(text) => handleBoardListCreation(squadId, text)}
            /> */}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="h-full relative w-full max-w-[40%] max-h-[50%] bg-white rounded-[16px] px-[62px] py-[50px] overflow-y-scroll no-scrollbar flex flex-col items-center justify-center">
              <img src={Development} alt="" className="h-1/8" />
              <h1 className="text-[#6576FF] opacity-80 text-2xl">
                We are developing this feature
              </h1>
            </div>
            {/* <p>stack view</p> */}
            {/* <DragDropContext onDragEnd={dragEnd}>
              <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col items-start w-full"
                  >
                    {filterdBoardList()?.map((boardList, index) => (
                      <BoardStackList
                        showType={showType}
                        key={boardList?._id}
                        boardList={boardList}
                        listIndex={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <AddBtn
              loading={listLoading}
              showType={showType}
              placeHolder="Add list name..."
              btnText="list"
              onSubmit={(text) => handleBoardListCreation(squadId, text)}
            /> */}
          </div>
        )
      ) : (
        <div className="h-[100vh] w-[calc(100vw - 325px)] flex justify-center flex-col items-center">
          <img src={images.chattingStart} alt="" className="w-36 mx-auto" />
          <h2 className="text-2xl font-bold">What a quiet team!</h2>
          <p className="text-center max-w-[400px]">
            Don’t be shy, create a space to start communication with your team
            mates.
          </p>
        </div>
      )}
    </section>
  );
};

export default SingleScreen;
