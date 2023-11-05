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
        height: 20,
        barGap: 1,
        barWidth: 1,
        barRadius: 1,
        cursorWidth: 1,
        waveColor: "#D3D0D0",
        progressColor: "#6576FF",
        hideCursor: false,
        plugins: [],
        overflow: "hidden"
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
    <div className='flex items-center'>
      {isPlaying ? (
        <span className='w-6 h-6 flex justify-center items-center bg-black rounded-full'>
          <BsPauseFill
            size={30}
            className='animate-pulse text-white'
            onClick={playAudio}
          />
        </span>
      ) : (
        <span className='w-6 h-6 flex justify-center items-center bg-black rounded-full'>
          <BsPlayFill size={30} className='text-white' onClick={playAudio} />
        </span>
      )}

      <div
      className=" w-[170px]		lg:w-[190px] xl:w-[250px]"
        id={`waveform_${rendomID}`}
        style={{
        }}
      />
    </div>
  );
};

export default AudioInput;
