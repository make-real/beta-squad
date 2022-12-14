import React from "react";
import { useSelector } from "react-redux";
import DustbinIcon from "../../../../assets/icon_component/Dustbin";

const MemberRemovedModal = ({ data }) => {
    const currentWorkspace = useSelector(
        (state) => state.workspace.currentWorkspace
    );
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999]">
            <div className="w-[500px] h-[300px] bg-white rounded-[16px] flex items-center flex-col justify-center">
                <DustbinIcon />
                <h1 className="text-[#031124] text-[30px] font-bold mt-[30px]">
                    Removed
                </h1>
                <p className="text-[#818892] mt-[7px]">
                    {data.fullName} is successfully removed from{" "}
                    {currentWorkspace.name}
                </p>
            </div>
        </div>
    );
};

export default MemberRemovedModal;
