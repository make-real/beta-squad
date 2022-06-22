import React, { useState } from "react";
import Picker from "emoji-picker-react";

const Timeline = () => {
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const onEmojiClick = (e, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojis(false);
  };

  return (
    <div>
      <div className="">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="emoji picker demo"
          className="border"
        />
        <button className="button" onClick={() => setShowEmojis(!showEmojis)}>
          emoji
        </button>
      </div>

      {showEmojis && (
        <div>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default Timeline;
