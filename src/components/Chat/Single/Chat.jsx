import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { get_single_messages } from '../../../api/chat'
import { useSelector } from 'react-redux'
import { addBulkMessagePrivate } from '../../../store/slice/privateChat'
import { useDispatch } from 'react-redux'
import PrivateTextMessage from '../PrivateTextMessage'
import PrivateMessageBox from '../PrivateMessageBox'
import BackArrowIcon from '../../../assets/back_arrow.svg'
import SearchIcon from '../../../assets/search.svg'
import VideoCallIcon from '../../../assets/video_call.svg'
import AudioCallIcon from '../../../assets/audio_call.svg'

import GridIcon from '../../../assets/icon_component/Grid'
import RowVerticalIcon from '../../../assets/icon_component/RowVertical'
import Draggable from 'react-draggable'
import VideoOff from '../../../assets/icon_component/VideoOff'
import MicrophoneOn from '../../../assets/icon_component/MicrophoneOn'
import CallEnd from '../../../assets/icon_component/CallEnd'
import More from '../../../assets/icon_component/More'
import Folder from '../../../assets/icon_component/Folder'

const SingleChat = () => {
    const { participantID, workspace_id } = useParams()
    const [selectedTab, setSelectedTab] = useState('messages')
    const [selectedMember, setSelectedMember] = useState({})
    const workspaceMembers = useSelector(
        (state) => state.workspace.workspaceMembers
    )
    const socket = useSelector((state) => state?.socket?.socket)
    const [showType, setShowType] = useState('grid')
    const [call, setCall] = useState(false)

    const location = useLocation()

    const startCall = () => {
        setCall(true)
        socket.emit('START_CALL', selectedMember._id)
    }

    useEffect(() => {
        socket?.on('ON_CALL', () => setCall(true))
        socket?.on('ON_CALL_END', () => setCall(false))

        return () => {
            socket?.off('ON_CALL')
            socket?.off('ON_CALL_END')
        }
    }, [socket])

    const endCall = () => {
        setCall(false)
        socket.emit('END_CALL', selectedMember._id)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (workspaceMembers) {
            setSelectedMember(
                workspaceMembers.find((value) => value._id === participantID)
            )
        }
    }, [workspaceMembers, participantID])

    useEffect(() => {
        getMessages()
    }, [participantID, workspace_id])

    const getMessages = async () => {
        try {
            const { data } = await get_single_messages(
                workspace_id,
                participantID
            )

            dispatch(addBulkMessagePrivate(data.messages.reverse()))
        } catch (error) {
            console.log(error)
        }
    }

    const TabsScreen = {
        messages: <SingleChatScreen participantID={participantID} />,
        board: <></>,
    }

    const TabsName = {
        messages: 'Messages',
        board: 'Board',
    }

    useEffect(() => {
        let tab = location.hash.slice(1)
        if (tab) {
            setSelectedTab(tab)
        }
    }, [location])

    return (
        <div className="bg-[#F9F9FF] w-full h-full">
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
                                <img
                                    src={SearchIcon}
                                    alt="search"
                                    className=""
                                />
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    className=" placeholder:text-[#99A6B9] border-none outline-none"
                                />
                            </div>
                            {selectedTab === 'messages' ? (
                                <div className="flex items-center gap-[22px] relative">
                                    <div
                                        className="cursor-pointer"
                                        onClick={startCall}
                                    >
                                        <img
                                            src={VideoCallIcon}
                                            alt="video_call"
                                        />
                                    </div>
                                    <div
                                        className="cursor-pointer"
                                        onClick={startCall}
                                    >
                                        <img
                                            src={AudioCallIcon}
                                            alt="audio_call"
                                        />
                                    </div>

                                    {call && (
                                        <Draggable>
                                            <div className="absolute bg-white  drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] right-0 -bottom-[90px] p-5 rounded-xl z-[1000] flex cursor-move">
                                                <div className="flex w-full">
                                                    <Folder
                                                        className="w-[20px] h-[20px] mr-2"
                                                        style={{
                                                            fill: selectedMember?.color,
                                                        }}
                                                    />

                                                    <div>
                                                        <h2 className="text-[15px] leading-[19px] font-medium text-[#424D5B] mr-[9px] truncate w-[100px]">
                                                            {
                                                                selectedMember?.name
                                                            }
                                                        </h2>
                                                        <p className="font-normal text-[12px] leading-[15px] text-[#818892]">
                                                            Ringing...
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center self-start gap-4">
                                                    <VideoOff className="cursor-pointer" />

                                                    <MicrophoneOn className="cursor-pointer" />

                                                    <CallEnd
                                                        className="cursor-pointer"
                                                        onClick={endCall}
                                                    />

                                                    <More className="cursor-pointer" />
                                                </div>
                                            </div>
                                        </Draggable>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-[22px]">
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => setShowType('grid')}
                                    >
                                        <GridIcon
                                            isSelected={showType === 'grid'}
                                        />
                                    </div>
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => setShowType('stack')}
                                    >
                                        <RowVerticalIcon
                                            isSelected={showType === 'stack'}
                                        />
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
                                                ? 'border-b-2 border-b-[#6576FF] text-[#031124]'
                                                : 'text-[#818892]'
                                        } text-[19px] font-medium  pb-[10px] cursor-pointer`}
                                    >
                                        {TabsName[value]}
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                    <div className="w-full mt-[40px] h-full overflow-hidden">
                        {TabsScreen[selectedTab]}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Single Chat work should done here.........
const SingleChatScreen = () => {
    const { participantID, workspace_id } = useParams()

    const [messageToRespond, setMessageToRespond] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        getMessages()
    }, [participantID, workspace_id])

    const getMessages = async () => {
        try {
            const { data } = await get_single_messages(
                workspace_id,
                participantID
            )

            dispatch(addBulkMessagePrivate(data.messages.reverse()))
        } catch (error) {
            console.log(error)
        }
    }

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
                        ? 'h-[calc(100%-245px)]'
                        : 'h-[calc(100%-145px)]'
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
    )
}

export default SingleChat
