import { ImAttachment } from "react-icons/im";
import { GoMention } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
// import { AiOutlineGif } from "react-icons/ai";
// import GIF from "./GIF";
import { get_mentionable_users, send_message } from "../../api/message";
import { useSelector } from "react-redux";
import { MentionsInput, Mention } from "react-mentions";
import classNames from "./mention.module.css";
import { useRef } from "react";
import AudioInput from "./Audio/Input";
import AudioRender from "./Audio/Render";

const MessageBox = () => {
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const [audio, setAudio] = useState(null);
  const inputRef = useRef();
  const [users, setUsers] = useState([]);

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

  // const [attachFile, setAttachFile] = useState(false);
  // const [showGif, setShowGif] = useState(false);

  const onEmojiClick = (e, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleAttach = () => {
    setShowEmojis(false);
    // setShowGif(false);
    // setAttachFile((prev) => !prev);
  };

  const handleEmoji = () => {
    // setShowGif(false);
    // setAttachFile(false);
    setShowEmojis((prev) => !prev);
  };

  const handleMention = () => {
    setShowEmojis(false);
    setInput((prev) => prev + "@");
    inputRef.current.focus();
    // setAttachFile(false);
    // setShowGif(false);
  };

  // const handleGif = () => {
  //   setAttachFile(false);
  //   setShowEmojis(false);
  //   setMentionModal(false);
  //   setShowGif((prev) => !prev);
  // };

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
  return (
    <>
      {audio && <AudioRender url={audio} />}
      <AudioInput setAudioURL={setAudio} />
      <div className="px-3 mt-[10px] relative text-gray-300 flex w-full">
        <div className="w-full h-full flex justify-center align-middle">
          <div className="w-full relative border rounded-md p-3 mt-2 pr-[130px]">
            <MentionsInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              singleLine={true}
              onKeyDown={(e) =>
                e.key === "Enter" ? handleSendMessage() : null
              }
              // className="outline-0 w-full p-5 relative input-style rounded-3xl border-[3px] outline-none	border-gray-300 text-slate-600	 py-3.5	pl-9 pr-[120px]"
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
                      className={focused ? "bg-[#ddd] p-2" : "bg-[#f1f1f1] p-2"}
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
          </div>

          <div className="text-gray-400 flex absolute right-[30px] bottom-1/2  translate-y-1/2 pt-2">
            <label
              className="px-1.5 cursor-pointer relative"
              htmlFor="userInputFile"
              onClick={() => handleAttach()}
            >
              <ImAttachment
                className="duration-300  hover:text-teal-400 "
                onClick={() => handleAttach()}
              />

              <input type="file" id="userInputFile" className="hidden" />
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

            {/* <div className="px-2  ">
      <AiOutlineGif
        className="duration-300 cursor-pointer hover:text-teal-400"
        onClick={handleGif}
      />
      {showGif && (
        <div className="absolute right-0 bottom-8 w-[600px] bg-white drop-shadow-xl p-2.5 h-[400px]">
          <GIF />
        </div>
      )}
    </div> */}
          </div>

          {/* <div className="text-slate-400 absolute right-0 -bottom-[21px] text-sm	">
      <small className="text-gray-500">#bold*</small>
      <small className="px-1 italic">_italic_</small>
      <small>~strikethrough~</small>
    </div> */}
        </div>

        {/* {mentionModal && (
      <div className="w-full border overflow-auto	 absolute left-0 bottom-[90px] bg-white z-50 rounded-xl p-1.5 h-[450px] shadow-lg shadow-gray-300	">
        <div className="py-2 px-3.5 rounded-lg text-gray-500 hover:bg-slate-50 hover:text-teal-500">
          <p>@channel Notifies everyone in space</p>
        </div>

        <div className="py-2 px-3.5 rounded-lg text-gray-500 hover:bg-slate-50 hover:text-teal-500">
          <p>@space Notifies everyone in space</p>
        </div>

        <div className="py-2 px-3.5 rounded-lg text-gray-500 hover:bg-slate-50 hover:text-teal-500">
          <p>@here Notifies everyone in space</p>
        </div>

        {users.map((item) => (
          <div
            className="flex py-2 px-3.5 rounded-lg text-gray-500 hover:bg-slate-50 hover:text-teal-500"
            key={item.id}
          >
            <div className="w-8 h-8 border-slate-700	border-4 rounded-full">
              <img src={item.img} alt="user" className="rounded-full" />
            </div>
            <h6 className="my-auto pl-2">{item.name}</h6>
          </div>
        ))}
      </div>
    )} */}
      </div>
    </>
  );
};

export default MessageBox;
