import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { get_single_messages } from "../../api/chat";
import { addBulkMessagePrivate } from "../../store/slice/privateChat";
import { callReceived } from "../../store/slice/global";
import PrivateTextMessage from "../Chat/PrivateTextMessage";
import PrivateMessageBox from "../Chat/PrivateMessageBox";
import SearchIcon from "../../assets/search.svg";
import VideoCallIcon from "../../assets/video_call.svg";
import AudioCallIcon from "../../assets/audio_call.svg";
import GridIcon from "../../assets/icon_component/Grid";
import RowVerticalIcon from "../../assets/icon_component/RowVertical";
import images from "../../assets";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { AddBtn } from "../Board";
import { useCommingSoonContext } from "../../context/FeatureContext";

const SingleScreen = () => {
  const location = useLocation();
  const { showModal, setShowModal } = useCommingSoonContext();

  const { participantID, workspace_id } = useParams();
  const [selectedTab, setSelectedTab] = useState("messages");
  const [selectedMember, setSelectedMember] = useState({});
  const workspaceMembers = useSelector(
    (state) => state.workspace.workspaceMembers
  );
  const { socket, call } = useSelector((state) => state?.global);
  const [showType, setShowType] = useState("grid");

  const dispatch = useDispatch();

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

  const startCall = (type) => {
    if (call?.data) return;

    dispatch(callReceived(true));
    socket?.emit("START_CALL", selectedMember?._id, true, type);
  };
  const TabsScreen = {
    messages: <SingleChatScreen participantID={participantID} />,
    board: (
      <SingleBoardScreen participantID={participantID} showType={showType} />
    ),
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

// Single Chat work should done here.........
const SingleBoardScreen = ({ showType }) => {
  const { participantID, workspace_id } = useParams();

  const [messageToRespond, setMessageToRespond] = useState();

  const dispatch = useDispatch();

  const userId = JSON.parse(localStorage.getItem("userId"));

  //   useEffect(() => {
  //     getMessages();
  //   }, [participantID, workspace_id]);

  //   const getMessages = async () => {
  //     try {
  //       const { data } = await get_single_messages(workspace_id, participantID);

  //       dispatch(addBulkMessagePrivate(data.messages.reverse()));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <section className={`duration-200 overflow-auto customScroll h-full`}>
      {userId ? (
        showType === "grid" ? (
          <div className="py-4 flex gap-3 items-start  min-w-fit h-[98vh]">
            <p>grid view</p>
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
          <div className="py-4 flex flex-col gap-3 items-start  min-w-fit h-[98vh]">
            <p>stack view</p>
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
