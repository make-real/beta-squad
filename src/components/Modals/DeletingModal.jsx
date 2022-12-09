import React from "react";
import DustbinIcon from "../../assets/icon_component/Dustbin";

const DeletingModal = ({ type, done, data }) => {
    return (
        <>
            {type === "project" ? (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-50">
                    <div className="w-[500px] h-[300px] bg-white rounded-[16px] flex items-center flex-col justify-center">
                        <DustbinIcon />
                        <h1 className="text-[#031124] text-[30px] font-bold mt-[30px]">
                            {done ? "Deleted" : "Deleting"}
                        </h1>
                        {done && (
                            <p className="text-[#818892] mt-[7px]">
                                {data.name} is successfully deleted
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                "MEmber Delete"
            )}
        </>
    );
};

export default DeletingModal;
