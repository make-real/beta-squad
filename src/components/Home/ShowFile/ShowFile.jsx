import React from "react";
import { CardSettingDropDown } from "../../Board";
import PlusIcon from "../../../assets/plus.svg";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Dropdown from "../../Dropdown";
import { useState } from "react";

import Check from "../../../assets/icons/svg/Check";

const ShowFile = () => {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div
      style={{}}
      className={`overflow-y-scroll  no-scrollbar custom-shadow bg-[#ECECEC80] py-10 px-4 rounded-2xl`}
    >
      <div>
        <div className="w-full relative h-[75px] mb-4 border rounded-[16px] items-center px-2 flex justify-between  bg-[#FFFFFF]">
          <div className="flex items-center gap-2">
            <img
              className="w-6 h-6"
              src="https://i.ibb.co/JpSjLqx/image-6.png"
              alt=""
            />
            <div>
              <h5 className="font-inter text-[16px] font-normal leading-6">
                Meeting Notes 15th May
              </h5>
              <p className="font-inter font-light text-[11px] leading-6">
                Added 12 Nov 2023
              </p>
            </div>
          </div>
          <Dropdown
            position="bottom right"
            button={
              <EllipsisHorizontalIcon className="text-[#7088A1] cursor-pointer w-10 h-10 p-2 rounded-lg hover:bg-gray-200 hover:text-teal-500 duration-200 ml-0" />
            }
            width="150px"
            style={{ borderRadius: "1rem" }}
            menu={({ closePopup }) => (
              <CardSettingDropDown
              // close={closePopup}
              // cardID={localCard._id}
              // progress={progress}
              // setProgress={setProgress}
              // listID={listID}
              // noteDone={noteDone}
              // setNoteDone={setNoteDone}
              // toggleEdit={toggleEdit}
              // setToggleEdit={setToggleEdit}
              // setModalActionToggling={
              //     setModalActionToggling
              // }
              // setCardSettingDropDownToggle={
              //     setModalActionToggling
              // }
              />
            )}
          />
        </div>
        {showAdd ? (
          <div className="w-full relative   py-4  border rounded-[16px]  px-4    bg-[#FFFFFF]">
            <input
              type="text"
              className="border w-full text-[12px] font-inter font-normal mx-auto py-3 px-4 rounded-[10px] mb-4 "
              placeholder="Add Links Ex. https://docs.google.com/bug-test-rep..."
            />
            <input
              type="text"
              className="border w-full text-[12px]  font-inter font-normal mx-auto py-3 px-4 rounded-[10px] mb-4"
              placeholder="Title (Optional) Ex. Bug Test Report"
            />
            <div className="flex justify-center">
              {" "}
              <div
              
                className="border-2  p-1 py-1 w-24 px-3 rounded-md cursor-pointer select-none flex items-center mr-2 gap-1 justify-center"
                // onClick={(text) => handleBoardListCreation(workspace_id, text)}
                onClick={() => 
                  {
                    setShowAdd(false)
                  }}
              >
                <Check />
                <h3 className="text-gray-400 font-inter text-md whitespace-nowrap">
                  Done
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setShowAdd(!showAdd);
            }}
            className="w-full h-[75px]  rounded-[16px] flex items-center justify-center gap-[16px] cursor-pointer"
          >
            <div className="w-[36px]  h-[36px] rounded-full bg-white flex items-center justify-center">
              <img src={PlusIcon} alt="" />
            </div>
            <h1 className="text-[#818892] ">Add File Links</h1>
          </div>
        )}
      </div>

      {/* {
        showAdd && <AddFile setShowAdd={setShowAdd}  />
      } */}
    </div>
  );
};

export default ShowFile;