import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Board from "../Board/Board";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Chat from "../Chat/Chat";
import SquadMembers from "./SquadMembers/SquadMembers";
import { get_space_members } from "../../api/space";
import { get_tags } from "../../api/tags";
import { useAppStateContext } from "../../context/FeatureContext";
import { useBoardCardContext } from "../../context/BoardCardContext";
import ShowFile from "./ShowFile/ShowFile";
import Add from "../../assets/icon_component/Add";
import Check from "../../assets/icons/svg/Check";
import { PiFolderOpenBold } from "react-icons/pi";
import AddMemberBefore from "./../../assets/icons/svg/AddMemberBefore";
import { selectTag } from "../../store/slice/TagId";
import avatar from "../../../src/assets/profile_circle.svg";
import AiIcon from "../../assets/icons/robot1.png";
import AiIcon2 from "../../assets/icons/robot.png";
import { useSelector } from "react-redux";

const SquadScreen = ({ currentWorkspace, selectedSpace, singleMember }) => {
  const { showChat, setShowChat, selectedTab, setSelectedTab } =
    useAppStateContext();
  const { workspace_id } = useParams();
  const [showType, setShowType] = useState("grid");
  const [showSquadMembers, setShowSquadMembers] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  const { addBoard, setAddBoard } = useBoardCardContext();
  const [tags, setTags] = useState([]);
  const [TabsName, setTabsName] = useState(["All"]);
  const [members, setMembers] = useState([]);

  const selectTags = tags?.tags?.filter((tag) => tag?.name === selectedTab);

  const selectTagId = selectTags ? selectTags[0] : null;
  useEffect(() => {
    dispatch(selectTag(selectTagId));
  }, [selectTagId, dispatch]);

  const filteredLists = useSelector(
    (state) => state?.cardsLists?.filterBoardLists
  );

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

  const addBoardRef = React.useRef();

  const TabsScreen = {
    messages: (
      <Chat
        selectedSpace={selectedSpace}
        members={members}
        reload={reload}
        setReload={setReload}
        listId={filteredLists[0]}
      />
    ),
    file: <ShowFile selectedSpaceId={selectedSpace?._id} showFile={showFile} />,
    board: (
      <Board
        reload={reload}
        selectedSpaceId={workspace_id}
        showType={showType}
        addBoardRef={addBoardRef}
      />
    ),
    members: (
      <SquadMembers
        setMember={setMembers}
        showType={showType}
        selectedSpace={selectedSpace}
      />
    ),
  };
  return (
    <div className="bg-[#FFF] w-full h-full mb-0 pb-0 -mt-[80px]">
      <div className={`relative bg-[#FFF] h-full flex flex-col`}>
        <div className="w-full h-full bg-white rounded-[16px] px-[40px] pt-[80px] flex flex-col">
          <div className="flex flex-row items-center gap-4  py-[10px]">
            <div className="flex items-center w-full gap-8">
              <div className="flex items-center w-[80%]  duration-200 pb-1">
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
                <div
                  onClick={() => setSelectedTab("Done")}
                  className={`${
                    selectedTab === "Done"
                      ? " text-[#6576FF] font-inter bg-slate-200 py-2 px-2  rounded-lg"
                      : "text-[#818892] "
                  } text-md cursor-pointer flex gap-2 border py-1 px-2 rounded-md font-inter mr-3 whitespace-nowrap `}
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
              </div>
            </div>

            <div className="flex items-center justify-between w-1/2 ">
             

              <div className="flex items-center gap-[18px] relative">
              <div className="flex items-center gap-[18px] relative">
                <div
                  className="border-[1px] p-1 px-3 rounded-md cursor-pointer select-none flex items-center  gap-1"
                  onClick={(text) => {
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
              <div
                className={`${
                  singleMember ? "hidden" : "flex ml-2 items-center justify-start"
                }`}
              >
                {members.slice(0, 3).map((user, i) => (
                  <div key={i} className="ml-[-10px]">
                    <span className="rounded-full ml-[-6px]   text-black font-bold grid place-items-center p-1">
                      <img
                        src={user?.avatar ? user?.avatar : avatar}
                        alt=""
                        className="h-7 w-7 text-[#14BCBE] flex justify-center items-center rounded-full"
                      />
                    </span>
                  </div>
                ))}

                <div
                  className="ml-[-10px]"
                  onClick={() => {
                    setShowSquadMembers(!showSquadMembers);
                    setShowFile(false);
                    setShowChat(false);
                  }}
                >
                  <AddMemberBefore />
                </div>
              </div>
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
                    {showChat ? (
                      <img src={AiIcon} alt="" className={`w-5 h-5  `} />
                    ) : (
                      <img src={AiIcon2} alt="" className={`w-5 h-5  `} />
                    )}
                  </span>
                </div>
                <div
                  className="cursor-pointer rounded-md p-1 hover:bg-gray-200"
                  onClick={() => {
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
