import React from "react";
import PlusIcon from "../../assets/plus.svg";
import ArrowDown from "../../assets/arrowdown.svg";
import EditDeleteMenu from "../DropDown/EditDeleteMenu";

const SquadMembers = ({ showType }) => {
    return showType === "grid" ? (
        <div className="mt-[30px] flex items-center gap-[30px] flex-wrap">
            <div className="w-[297px] h-[162px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer">
                <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
                    <img src={PlusIcon} alt="" />
                </div>
            </div>
            {Array(5)
                .fill(0)
                .map((_) => {
                    return (
                        <div className="relative w-[297px] h-[162px] rounded-[16px] bg-[#6576FF10] cursor-pointer px-[13px] pt-[20px]">
                            <EditDeleteMenu className="absolute top-[10px] right-[10px]" />
                            <div className="flex items-center gap-[10px]">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlEkYksQu3pTAX_h1orl4H8z6oihY7LhrnLxGWElZg&s"
                                    alt=""
                                    className="w-[50px] h-[50px] object-cover rounded-full"
                                />
                                <h2 className="text-[#424D5B] font-semibold">
                                    Md Isfat Sharik
                                </h2>
                            </div>
                            <div className="flex items-center gap-[16px] mt-[13px]">
                                <p className="text-[#818892]">UI/UX designer</p>
                                <img src={ArrowDown} alt="" />
                            </div>
                            <p className="text-[#818892] mt-[10px]">
                                isfatsharikworksapace@gmail.com
                            </p>
                        </div>
                    );
                })}
        </div>
    ) : (
        showType === "stack" && (
            <div className="mt-[30px] flex flex-col items-center gap-[10px]">
                <div className="w-full h-[51px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer">
                    <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center">
                        <img src={PlusIcon} alt="" />
                    </div>
                </div>
                {Array(5)
                    .fill(0)
                    .map((_) => {
                        return (
                            <div className="relative w-full h-[90px] rounded-[16px] bg-[#6576FF10] cursor-pointer flex items-center gap-[13px] justify-between border px-[13px]">
                                <div className="flex items-center gap-[10px]">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlEkYksQu3pTAX_h1orl4H8z6oihY7LhrnLxGWElZg&s"
                                        alt=""
                                        className="w-[50px] h-[50px] object-cover rounded-full"
                                    />
                                    <h2 className="text-[#424D5B] font-semibold">
                                        Md Isfat Sharik
                                    </h2>
                                </div>
                                <div className="flex items-center gap-[16px]">
                                    <p className="text-[#818892]">
                                        UI/UX designer
                                    </p>
                                    <img src={ArrowDown} alt="" />
                                </div>
                                <p className="text-[#818892]">
                                    isfatsharikworksapace@gmail.com
                                </p>
                                <EditDeleteMenu className="absolute top-[10px] right-[10px]" />
                            </div>
                        );
                    })}
            </div>
        )
    );
};

export default SquadMembers;
