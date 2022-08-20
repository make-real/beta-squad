import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef } from "react";
import Button from "../../Button";
import color from "../../../colors.json";

const AudioInput = ({ url }) => {
  const waveform = useRef(null);

  useEffect(() => {
    if (!waveform.current) {
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
      });
      url && waveform.current.load(url);
    }
  }, [url]);

  const playAudio = () => {
    if (waveform.current.isPlaying()) {
      waveform.current.pause();
    } else {
      waveform.current.play();
    }
  };

  return (
    <>
      <div id="waveform" />
      <Button m="4" onClick={playAudio}>
        Play / Pause
      </Button>
    </>
  );
};

export default AudioInput;
