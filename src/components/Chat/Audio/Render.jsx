import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
// import audio from "./audio.mp3";
import color from "../../../colors.json";

const AudioInput = ({ url, rendomID = Math.floor(Math.random() * 100) }) => {
  const waveform = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if wavesurfer object is already created.
    if (!waveform.current) {
      // Create a wavesurfer object
      // More info about options here https://wavesurfer-js.org/docs/options.html
      waveform.current = Wavesurfer.create({
        container: `#waveform_${rendomID}`,
        width: 200,
        height: 50,
        barGap: 2,
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 3,
        waveColor: "#D3D0D0",
        progressColor: "#6576FF",
        hideCursor: false,
        plugins: [],
      });

      waveform.current.on("finish", () => {
        setIsPlaying(false);
        waveform.current.seekTo(0);
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
    <div className='flex'>
      {isPlaying ? (
        <span className='w-10 h-10 flex justify-center items-center bg-black rounded-full'>
          <BsPauseFill
            size={30}
            className='animate-pulse text-white'
            onClick={playAudio}
          />
        </span>
      ) : (
        <span className='w-10 h-10 flex justify-center items-center bg-black rounded-full'>
          <BsPlayFill size={30} className='text-white' onClick={playAudio} />
        </span>
      )}

      <div
        id={`waveform_${rendomID}`}
        style={{
          width: "300px",
        }}
      />
    </div>
  );
};

export default AudioInput;
