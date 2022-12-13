import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get_single_messages } from "../../../api/chat";
import { useSelector } from "react-redux";
import { addBulkMessagePrivate } from "../../../store/slice/privateChat";
import { useDispatch } from "react-redux";
import PrivateTextMessage from "../PrivateTextMessage";
import PrivateMessageBox from "../PrivateMessageBox";
import BackArrowIcon from "../../../assets/back_arrow.svg";
import SearchIcon from "../../../assets/search.svg";

const SingleChat = () => {
    const { participantID } = useParams();
    const [selectedTab, setSelectedTab] = useState("messages");
    const [messageToRespond, setMessageToRespond] = useState();
    const [selectedMember, setSelectedMember] = useState({});
    const { selectedWorkspace } = useSelector((state) => state.workspace);
    const currentWorkspace = useSelector(
        (state) => state.workspace.currentWorkspace
    );
    const workspaceMembers = useSelector(
        (state) => state.workspace.workspaceMembers
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (workspaceMembers) {
            setSelectedMember(
                workspaceMembers.find((value) => value._id === participantID)
            );
        }
    }, [workspaceMembers]);

    useEffect(() => {
        getMessages();
    }, [participantID, selectedWorkspace]);

    const getMessages = async () => {
        try {
            console.log("Sending...");
            const { data } = await get_single_messages(
                selectedWorkspace,
                participantID
            );

            console.log(data.message);

            dispatch(addBulkMessagePrivate(data.messages.reverse()));
        } catch (error) {
            console.log(error);
        }
    };

    const TabsScreen = {
        messages: <SingleChatScreen />,
        board: <p>Board</p>,
    };

    const TabsName = {
        messages: "Messages",
        board: "Board",
    };

    return (
        <div className="relative pt-[45px] px-[63px] pb-[60px] bg-[#F9F9FF] h-full flex flex-col">
            <div className="flex items-center">
                <Link to="/projects" className="mr-[8px] cursor-pointer">
                    <img src={BackArrowIcon} alt="back_arrow" />
                </Link>
                <p className=" mr-[12px] font-medium text-[15px] text-[#818892]">
                    {currentWorkspace?.name}
                </p>
                <p className="mr-[10px] text-[#00000020] text-[15px] font-medium">
                    /
                </p>
                <p className="text-[#031124] text-[15px] font-medium">
                    {selectedMember?.fullName}
                </p>
            </div>
            <div className="mt-[40px] w-full h-full bg-white rounded-[16px] px-[60px] pt-[50px] pb-[36px] flex flex-col">
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
                    </div>
                </div>
                <div className="mt-[38px]">
                    <div className="flex items-center gap-[45px]">
                        {Object.keys(TabsName).map((value) => {
                            return (
                                <h2
                                    onClick={() => setSelectedTab(value)}
                                    className={`${
                                        selectedTab === value
                                            ? "border-b-2 border-b-[#6576FF] text-[#031124]"
                                            : "text-[#818892]"
                                    } text-[19px] font-medium  pb-[10px] cursor-pointer`}
                                >
                                    {TabsName[value]}
                                </h2>
                            );
                        })}
                    </div>
                </div>
                <div className="w-full mt-[40px] h-full">
                    {TabsScreen[selectedTab]}
                </div>
            </div>
        </div>
    );
};

// Single Chat work should done here.........
const SingleChatScreen = ({ participantID }) => {
    const [messageToRespond, setMessageToRespond] = useState();

    const dispatch = useDispatch();

    const { selectedWorkspace } = useSelector((state) => state.workspace);

    useEffect(() => {
        getMessages();
    }, [participantID, selectedWorkspace]);

    const getMessages = async () => {
        try {
            console.log("Sending...");
            const { data } = await get_single_messages(
                selectedWorkspace,
                participantID
            );

            console.log(data.message);

            dispatch(addBulkMessagePrivate(data.messages.reverse()));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={`bg-[#ECECEC] pb-10 rounded-lg`}>
            <div
                // Previous
                style={{
                    height: `calc(100vh - ${messageToRespond ? 245 : 145}px)`,
                    // marginTop: "70px",
                }}
                // now
                // style={{
                //     height: `calc(100% - ${messageToRespond ? 170 : 70}px)`,
                // }}
                className={`overflow-y-auto hide-scrollbar overflow-x-hidden border-b-[0.5px] pt-5 customScroll`}
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
