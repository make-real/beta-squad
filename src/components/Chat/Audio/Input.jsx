import React, { Fragment } from "react";
import Button from "../../Button";

let recorder;
let gumStream;

const AudioRender = ({ setAudioURL }) => {
  function toggleRecording() {
    if (recorder && recorder.state === "recording") {
      recorder.stop();
      gumStream.getAudioTracks()[0].stop();
    } else {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(function (stream) {
          let oldPreviewElm;
          oldPreviewElm = document.getElementById("preview");
          if (oldPreviewElm.hasChildNodes()) {
            oldPreviewElm.removeChild(oldPreviewElm.childNodes[0]);
          }
          gumStream = stream;
          recorder = new MediaRecorder(stream);
          recorder.ondataavailable = function (e) {
            let url = URL.createObjectURL(e.data);
            setAudioURL(url);
          };
          recorder.start();
        });
    }
  }
  return (
    <Fragment>
      <Button
        id="recordButton"
        onClick={() => {
          toggleRecording();
        }}
      >
        Record
      </Button>
      <div id="preview" />
    </Fragment>
  );
};

export default AudioRender;
