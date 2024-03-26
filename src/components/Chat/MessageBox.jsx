import { ImAttachment } from "react-icons/im";
import { GoMention } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { BiMicrophone, BiSend } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import { get_mentionable_users, send_message } from "../../api/message";
import { useSelector } from "react-redux";
import { MentionsInput, Mention } from "react-mentions";
import classNames from "./mention.module.css";
import { useRef } from "react";
import api from "../../api";

import { useReactMediaRecorder } from "react-media-recorder";
import { populateUsers, sliceText } from "../../util/helpers";
import { ScaleLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { addSingleMessage, makeSendingFailed } from "../../store/slice/message";

const MessageBox = ({
  messageToRespond,
  setMessageToRespond,
  custom,
  onComment,
 
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

  const [audio, setAudio] = useState(null);
  const inputRef = useRef();
  const [users, setUsers] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [isRecording, setRecording] = useState(false);
  const [audioSent, setAudioSent] = useState(false);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    if (Boolean(selectedSpaceId)) {
      const loadUsers = async () => {
        try {
          const { data } = await get_mentionable_users(selectedSpaceId);

          const arr = data?.users?.map((user) => ({
            id: user._id,
            display: user.fullName,
          }));

          setUsers(arr);
        } catch (error) {
          console.log(error);
        }
      };

      loadUsers();
    }
  }, [selectedSpaceId]);

  const onEmojiClick = (e, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleAttach = () => {
    setShowEmojis(false);
  };

  const handleEmoji = () => {
    setShowEmojis((prev) => !prev);
  };

  const handleMention = () => {
    setShowEmojis(false);
    setInput((prev) => (prev ? prev + " @" : "@"));
    inputRef.current.focus();
  };

  const handleSendMessage = async () => {
    setMessageToRespond();

    const msgID = Date.now();

    try {
      const text = String(input).trim();
      if (text === "") {
        return;
      }
      setInput("");
      if (custom) {
        await onComment({ text });
      } else {
        const obj = {
          _id: msgID,
          sender: {
            _id: userId,
            fullName: user?.fullName,
            username: user?.username,
            avatar: user?.avatar,
          },
          to: selectedSpaceId,
          chatHeaderRef: messageToRespond?._id,
          content: {
            text: text,
            attachments: [],
            mentionedUsers: [],
          },
          seenBy: [],
          reactions: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
        };

        dispatch(addSingleMessage(obj));

        await send_message(selectedSpaceId, {
          _id: msgID,
          textMessage: text,
          replayOf: messageToRespond?._id,
        });
      }
      setInput("");
    } catch (error) {
      dispatch(makeSendingFailed(msgID));
      console.log(error);
    }
  };

  const uploadAudioFile = async (url) => {
    setMessageToRespond();
    try {
      const formData = new FormData();
      let blob = await fetch(url).then((r) => r.blob());
      var wavefilefromblob = new File([blob], `${Date.now()}.wav`);
      if (custom) {
        await onComment({ audio: wavefilefromblob });
      } else {
        formData.append("voice", wavefilefromblob);
        if (messageToRespond?._id) {
          formData.append("replayOf", messageToRespond?._id);
        }
        let config = {
          method: "post",
          url: `spaces/${selectedSpaceId}/chat/send-messages`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            let UpPer = parseInt(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadPercentage(UpPer);
          },
        };
        const { data } = await api(config);
      }
      setUploadPercentage(0);
    } catch (error) {
      console.log(error);
    }
  };

  const onMediaFilePicked = async (e) => {
    setMessageToRespond();

    try {
      if (custom) {
        await onComment({ image: e.target.files });
      } else {
        const formData = new FormData();

        if (messageToRespond?._id) {
          formData.append("replayOf", messageToRespond?._id);
        }
        for (const file of e.target.files) {
          formData.append("attachments", file);
        }
        let config = {
          method: "post",
          url: `spaces/${selectedSpaceId}/chat/send-messages`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            let UpPer = parseInt(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadPercentage(UpPer);
          },
        };
        await api(config);
        setUploadPercentage(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const handleStartRecording = async () => {
    try {
      const permission = await window?.navigator?.permissions?.query({
        name: "microphone",
      });

      if (permission?.state === "denied") {
        alert(
          "Microphone permission is required. Go to site settings and give microphone permission for this site."
        );
      } else {
        setAudioSent(false);
        setRecording(true);

        clearBlobUrl();
        startRecording();
      }
    } catch (error) {
      setAudioSent(false);
      setRecording(true);

      clearBlobUrl();
      startRecording();
    }
  };

  useEffect(() => {
    if (Boolean(mediaBlobUrl) && audioSent) {
      uploadAudioFile(mediaBlobUrl);
    }
  }, [mediaBlobUrl]);
  return (
    <>
      <div
        style={{
          background: "rgb(107, 199, 220)",
          width: `${uploadPercentage}%`,
          height: "2px",
          transition: "1s all",
        }}
      ></div>

      <div className="px-3 mt-[10px] relative text-gray-300 flex w-full">
        <div className="w-full h-full flex justify-center align-middle">
          <div
            className={`w-full ${
              messageToRespond && "border-[0.5px] border-white p-3 rounded-md"
            }`}
          >
            {messageToRespond && (
              <div className="flex mb-2 justify-between border-l-4 border-blue-500 bg-slate-200 text-neutral-500 p-3 rounded-md">
                <div>
                  <p className="text-bold text-blue-500 text-sm mb-1">
                    {messageToRespond?.sender?.fullName}
                  </p>
                  {messageToRespond?.content?.text ? (
                    <p
                      className="text-sm text-gray-900"
                      dangerouslySetInnerHTML={{
                        __html: populateUsers(messageToRespond?.content),
                      }}
                    ></p>
                  ) : Boolean(messageToRespond?.content?.voice) ? (
                    <p className="text-sm">Voice</p>
                  ) : (
                    <p className="text-sm">Attachment</p>
                  )}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setMessageToRespond()}
                >
                  <MdClose />
                </div>
              </div>
            )}
            {!isRecording ? (
              <>
                <div className="w-full flex items-stretch justify-between relative   bg-white rounded-[20px] px-3">
                  <MentionsInput
                    value={input}
                    placeholder="Write message"
                    onChange={(e) => setInput(e.target.value)}
                    // singleLine={input.length >= 50 ? false : true}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? handleSendMessage() : null
                    }
                    classNames={classNames}
                    customSuggestionsContainer={(children) => (
                      <div className="bg-white absolute bottom-6 min-w-[300px] shadow-sm rounded-lg">
                        {children}
                      </div>
                    )}
                    // allowSuggestionsAboveCursor={true}
                    inputRef={inputRef}
                    autoFocus
                  >
                    <Mention
                      className={classNames.mentions__mention}
                      trigger="@"
                      data={users}
                      markup="{{__id__}}"
                      renderSuggestion={(entry) => {
                        return (
                          <h1
                            className={
                              "bg-white text-sm px-5 py-2 hover:bg-blue-500 hover:text-white border-[0.2px] border-gray-300"
                            }
                          >
                            {entry.display}
                          </h1>
                        );
                      }}
                      displayTransform={(id) =>
                        users.find((user) => user.id === id).display
                      }
                    />
                  </MentionsInput>
                  {/* <div className="text-gray-400 absolute bottom-5 right-1 flex mt-[5px] ">
                                    <div className="px-2 cursor-pointer relative">
                                        <BiMicrophone
                                            size={20}
                                            className="duration-300  hover:text-blue-500 mt-[-2px]"
                                            onClick={handleStartRecording}
                                        />
                                    </div>
                                    

                                  
                                </div> */}
                </div>
                <div className="flex mt-3 mx-3 text-[#818892] ">
                    <label
                      className="px-1.5 cursor-pointer relative"
                      htmlFor="userInputFile"
                      onClick={() => handleAttach()}
                    >
                      <ImAttachment
                        className="duration-300   hover:text-blue-500 "
                        onClick={() => handleAttach()}
                      />
                      <input
                        type="file"
                        id="userInputFile"
                        className="hidden"
                        multiple
                        onChange={onMediaFilePicked}
                      />
                    </label>
                    <div className="px-2 cursor-pointer relative">
                      <GoMention
                        className="duration-300  hover:text-blue-500"
                        onClick={handleMention}
                      />
                    </div>
                    <div className="px-2 cursor-pointer duration-300  hover:text-blue-500 relative">
                      <BsEmojiSmile onClick={() => handleEmoji()} />
                      {showEmojis && (
                        <div className="absolute  left-[14px] bottom-8">
                          <Picker onEmojiClick={onEmojiClick} />
                        </div>
                      )}
                    </div>
                  </div>
              </>
            ) : (
              <div className="w-full flex align-middle">
                <div className="mr-5 my-auto">
                  <MdDeleteOutline
                    size={30}
                    className="duration-300 text-red-400"
                    onClick={() => {
                      setRecording(false);
                      setAudioSent(false);
                      stopRecording();
                    }}
                  />
                </div>

                <div className="flex flex-1 mx-auto w-full overflow-hidden cursor-pointer relative">
                  {/* <span className="text-xs ">Recording...</span> */}
                  {Array.from({ length: 20 }).map(() => (
                    <ScaleLoader width={2} color="#6576FF" />
                  ))}
                </div>

                <div className="ml-5 my-auto">
                  <BiSend
                    size={30}
                    className="duration-300 text-blue-500  hover:text-blue-600"
                    onClick={() => {
                      setRecording(false);
                      setAudioSent(true);
                      stopRecording();
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBox;
