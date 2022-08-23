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

const MessageBox = ({ messageToRespond, setMessageToRespond }) => {
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const [audio, setAudio] = useState(null);
  const inputRef = useRef();
  const [users, setUsers] = useState([]);
  const [uploadParcantage, setUploadParcentage] = useState(0);

  const [isRecording, setRecording] = useState(false);
  const [audioSent, setAudioSent] = useState(false);

  // console.log(messageToRespond);

  useEffect(() => {
    if (Boolean(selectedSpaceId)) {
      const loadUsers = async () => {
        try {
          const { data } = await get_mentionable_users(selectedSpaceId);

          const arr = data?.users?.map((user) => ({
            id: user._id,
            display: user.fullName,
          }));

          console.log(arr);
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
    try {
      const text = String(input).trim();

      if (text === "") {
        return;
      }

      setInput("");

      await send_message(selectedSpaceId, {
        textMessage: text,
      });

      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAudioFile = async (url) => {
    try {
      const formData = new FormData();

      let blob = await fetch(url).then((r) => r.blob());

      var wavefilefromblob = new File([blob], `${Date.now()}.wav`);

      formData.append("attachments", wavefilefromblob);

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

          setUploadParcentage(UpPer);
        },
      };

      await api(config);

      setUploadParcentage(0);
    } catch (error) {
      console.log(error);
    }
  };

  const onMediaFilePicked = async (e) => {
    try {
      const formData = new FormData();

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

          setUploadParcentage(UpPer);
        },
      };

      await api(config);

      setUploadParcentage(0);
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
      // upload audio

      uploadAudioFile(mediaBlobUrl);
      console.log("Uploading...");
    }
  }, [mediaBlobUrl]);

  return (
    <>
      <div
        style={{
          background: "rgb(107, 199, 220)",
          width: `${uploadParcantage}%`,
          height: "2px",
          transition: "1s all",
        }}
      ></div>

      <div className="px-3 mt-[10px] relative text-gray-300 flex w-full">
        <div className="w-full h-full flex justify-center align-middle">
          <div
            className={`w-full ${
              messageToRespond &&
              "border-[0.5px] border-[#2d4154] p-3 rounded-md"
            }`}
          >
            {messageToRespond && (
              <div className="flex mb-2 justify-between border-l-4 border-themeColor bg-slate-200 text-neutral-500 p-3 rounded-md">
                <div>
                  <p className="text-bold text-themeColor text-sm mb-1">{messageToRespond?.sender?.fullName}</p>
                  <p className="text-sm">{messageToRespond?.content?.text || "Attachments"}</p>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setMessageToRespond()}
                >
                  <MdClose />
                </div>
              </div>
            )}
            <div className="w-full flex relative border rounded-md p-3">
              <MentionsInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                singleLine={true}
                onKeyDown={(e) =>
                  e.key === "Enter" ? handleSendMessage() : null
                }
                classNames={classNames}
                customSuggestionsContainer={(children) => (
                  <div className="bg-[#f1f1f1] absolute bottom-5 w-[300px]">
                    {children}
                  </div>
                )}
                allowSuggestionsAboveCursor={true}
                inputRef={inputRef}
                autoFocus
              >
                <Mention
                  className={classNames.mentions__mention}
                  trigger="@"
                  data={users}
                  markup="{{__id__}}"
                  renderSuggestion={(entry, focused) => {
                    return (
                      <h1
                        className={
                          focused ? "bg-[#ddd] p-2" : "bg-[#f1f1f1] p-2"
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
              <div className="text-gray-400 flex mt-[5px]">
                {isRecording ? (
                  <>
                    <div className="px-2 cursor-pointer relative">
                      <MdDeleteOutline
                        className="duration-300 text-[red]  hover:text-teal-400"
                        onClick={() => {
                          setRecording(false);
                          setAudioSent(false);

                          stopRecording();
                        }}
                      />
                    </div>

                    <div className="px-2 cursor-pointer relative">
                      <span className="text-xs "> Recording...</span>
                    </div>

                    <div className="px-2 cursor-pointer relative">
                      <BiSend
                        className="duration-300 text-teal-400  hover:text-teal-500"
                        onClick={() => {
                          setRecording(false);
                          setAudioSent(true);
                          stopRecording();
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="px-2 cursor-pointer relative">
                    <BiMicrophone
                      size={20}
                      className="duration-300  hover:text-teal-400 mt-[-2px]"
                      onClick={handleStartRecording}
                    />
                  </div>
                )}

                <label
                  className="px-1.5 cursor-pointer relative"
                  htmlFor="userInputFile"
                  onClick={() => handleAttach()}
                >
                  <ImAttachment
                    className="duration-300  hover:text-teal-400 "
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
                    className="duration-300  hover:text-teal-400"
                    onClick={handleMention}
                  />
                </div>
                <div className="px-2 cursor-pointer duration-300  hover:text-teal-400 relative">
                  <BsEmojiSmile onClick={() => handleEmoji()} />
                  {showEmojis && (
                    <div className="absolute  right-0 bottom-8">
                      <Picker onEmojiClick={onEmojiClick} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBox;
