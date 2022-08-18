import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import colors from "../colors.json";

export const Loader = ({ dark, className }) => {
  return (
    <div className={"flex justify-center " + className || "mt-1"}>
      <ClipLoader color={dark ? "white" : "black"} size="20px" />
    </div>
  );
};

export const PageLoader = ({ dark, className }) => {
  return (
    <div className="flex w-full h-full my-auto justify-center align-middle text-red">
      <BeatLoader
        style={{ margin: "auto" }}
        color={colors.themeColor}
        size="20px"
      />
    </div>
  );
};
