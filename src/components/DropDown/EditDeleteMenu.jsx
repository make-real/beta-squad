import React from "react";
import PencilIcon from "../../assets/pencil.svg";
import HorizontalDotsIcon from "../../assets/horizontal_dots.svg";
import DeleteIcon from "../../assets/delete.svg";

const EditDeleteMenu = ({
    className,
    data,
    deleteFunc,
    editFunc,
    boxClassName,
}) => {
    return (
        <div className="group">
            <img
                src={HorizontalDotsIcon}
                alt=""
                className={`${className} cursor-pointer`}
            />
            <div
                className={`group-hover:scale-100 scale-0 origin-top-right transition-transform absolute right-[-10px] top-[30px] bg-white normal-shadow rounded-[16px] flex flex-col z-20 ${boxClassName}`}
            >
                <div
                    className="flex items-center gap-[25px] px-[30px] py-[17px] hover:bg-[#FEB45E10] cursor-pointer"
                    onClick={() => editFunc(data)}
                >
                    <img src={PencilIcon} />
                    <p className="font-semibold text-[#031124]">Edit</p>
                </div>
                <div
                    className="flex items-center gap-[25px] px-[30px] py-[17px] hover:bg-[#FB397F10] cursor-pointer"
                    onClick={() => deleteFunc(data)}
                >
                    <img src={DeleteIcon} />
                    <p className="font-semibold text-[#031124]">Delete</p>
                </div>
            </div>
        </div>
    );
};

export default EditDeleteMenu;
