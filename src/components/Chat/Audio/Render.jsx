import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
// import audio from "./audio.mp3";
import color from "../../../colors.json";

const AudioInput = ({ url }) => {
  const waveform = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if wavesurfer object is already created.
    if (!waveform.current) {
      // Create a wavesurfer object
      // More info about options here https://wavesurfer-js.org/docs/options.html
      waveform.current = Wavesurfer.create({
        container: "#waveform",
        width: 200,
        waveColor: color.themeColor,
        barGap: 2,
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 3,
        cursorHeight: 3,
        cursorColor: color.secondary,
        plugins: [
          // WaveSurfer.microphone.create()
        ],
      });
      url && waveform.current.load(url);
    }
  }, [url]);

  const playAudio = () => {
    // Check if the audio is already playing
    if (waveform.current.isPlaying()) {
      waveform.current.pause();
      setIsPlaying(false);
    } else {
      waveform.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex">
      {isPlaying ? (
        <AiOutlinePauseCircle
          size={30}
          className="text-red-500 animate-pulse my-auto"
          onClick={playAudio}
        />
      ) : (
        <AiOutlinePlayCircle
          size={30}
          className="text-secondary my-auto"
          onClick={playAudio}
        />
      )}
      <div id="waveform" />
    </div>
  );
};

export default AudioInput;
