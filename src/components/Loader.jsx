import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loader({ dark, className }) {
  return (
    <div className={className || "mt-1"}>
      <ClipLoader color={dark ? "white" : "black"} size="20px" />
    </div>
  );
}
