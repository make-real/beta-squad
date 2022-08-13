import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loader({ dark }) {
  return (
    <div className="mt-1">
      <ClipLoader color={dark ? "white" : "black"} size="20px" className="mt-1"/>
    </div>
  );
}
