import React from "react";
import CrossIcon from "../../../../assets/cross.svg";
const AddFile = ({setShowAdd}) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] py-[20px] z-[999]">
      <div className="h-1/2 relative w-[614px] max-h-[725px] bg-white rounded-[16px] px-[60px] py-[40px] overflow-y-scroll no-scrollbar flex flex-col">
      <div
                    onClick={() => setShowAdd(false)}
                    className="w-max absolute top-[30px] right-[30px] cursor-pointer"
                >
                    <img src={CrossIcon} alt="" />
                </div>
      </div>
    </div>
  );
};

export default AddFile;
