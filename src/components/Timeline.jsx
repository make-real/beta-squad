import React, { useState } from "react";
import DatePicker from "react-horizontal-datepicker";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosClose,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import { IoCloseOutline, IoPlanet } from "react-icons/io5";

import { RiAddCircleFill } from "react-icons/ri";
import { checkBoxFilter } from "../constant/data";

import AddCard from "./AddCard";

const Timeline = () => {
  const [timeDropDown, setTimeDropDown] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [spaceFilter, setSpaceFilter] = useState(false);

  const selectedDay = (val) => {
    console.log(val);
  };
  const beforeDate = () => {
    const today = new Date();
  };

  return (
    <section className="bg-slate-50	h-full 	p-8 relative">
      <div className="bg-white">
        <div className=" p-1 flex justify-between text-gray-700">
          <div className="flex-1 flex text-[13px]">
            <div className="pl-4 pr-12 py-2 my-auto">
              <h5 className="my-auto  ">Jun 2022</h5>
            </div>
            <div className="flex py-2 px-3">
              <IoIosArrowBack className="my-auto" />
              <h5 className="px-2 my-auto">Week 24</h5>
              <IoIosArrowForward className="my-auto" />
            </div>
            <div className=" border py-2 my-auto text-gray-600 hover:text-gray-800 hover:bg-gray-200">
              <h5 className=" px-10 text-xs">Today</h5>
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <div className=" relative pr-7">
              <button
                class="border my-auto text-gray-600 hover:text-gray-800 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center "
                type="button"
                onClick={() => setTimeDropDown(!timeDropDown)}
              >
                <small className="pr-7 text-sm my-auto">Week</small>
                {timeDropDown ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>

              {timeDropDown && (
                <div class="z-10 w-32 absolute left-0 top-[50px] bg-slate-100	 divide-y divide-gray-100 rounded shadow  dark:bg-gray-700">
                  <ul
                    class="py-1 text-sm text-gray-500 dark:text-gray-200"
                    aria-labelledby="dropdownDefault"
                  >
                    <li class="block pl-4 pr-7 py-2 hover:bg-slate-200 hover:text-gray-700">
                      Dashboard
                    </li>
                    <li class="block pl-4 pr-7 py-2 hover:bg-slate-200 hover:text-gray-700">
                      Settings
                    </li>
                    <li class="block pl-4 pr-7 py-2 hover:bg-slate-200 hover:text-gray-700">
                      Earnings
                    </li>
                    <li class="block pl-4 pr-7 py-2 hover:bg-slate-200 hover:text-gray-700">
                      Sign out
                    </li>
                    <li class="block pl-4 pr-7 py-2 hover:bg-slate-200 hover:text-gray-700">
                      Sign out
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="">
              <button
                class="border text-sm my-auto text-gray-600 hover:text-gray-800 hover:bg-gray-200 font-medium rounded-lg  px-5 py-1.5 text-center inline-flex items-center "
                type="button"
                onClick={() => setSpaceFilter(!spaceFilter)}
              >
                <IoPlanet />
                <span className="px-3">Space Filters</span>
                {spaceFilter ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
            </div>
          </div>
        </div>

        {/* date slider */}
        <div>
          <DatePicker
            getSelectedDay={selectedDay}
            endDate={300}
            selectDate={beforeDate}
            labelFormat={"MMMM"}
            color={"#374e8c"}
            marked={[
              {
                date: new Date(2022, 6, 28),
                marked: true,
                style: {
                  color: "#ff0000",
                  padding: "2px",
                  fontSize: 12,
                },
                text: "1x",
              },
              {
                date: new Date(),
                marked: true,
                text: "5x",
              },
            ]}
          />
        </div>
      </div>

      {/* space filter box  */}
      {spaceFilter && (
        <div className="absolute right-0 top-[100px] w-[320px] h-[450px] rounded-lg z-50  bg-zinc-200	overflow-y-auto pb-4">
          <div
            className="py-2 px-1.5 flex justify-end cursor-pointer hover:text-teal-400"
            onClick={() => setSpaceFilter(false)}
          >
            <IoCloseOutline />
          </div>

          <div className="overflow-y-auto px-2 space-y-5">
            <div className="bg-white px-1.5 py-1.5 rounded-lg">
              <div class="custom_radio px-2.5 py-2 ">
                <h6 className="text-slate-500	">Status</h6>

                <div className="hover:bg-gray-100 mb-1.5 p-1 rounded-lg ">
                  <input type="radio" id="featured-1" name="featured" checked />
                  <label
                    for="featured-1"
                    className="text-sm text-slate-400 hover:text-teal-500"
                  >
                    All task (0)
                  </label>
                </div>

                <div className="hover:bg-gray-100 mb-1.5 p-1 rounded-lg">
                  <input type="radio" id="featured-2" name="featured" />
                  <label
                    for="featured-2"
                    className="text-sm text-slate-400 hover:text-teal-500"
                  >
                    Incompleted (0)
                  </label>
                </div>

                <div className="hover:bg-gray-100 mb-1.5 p-1 rounded-lg">
                  <input type="radio" id="featured-3" name="featured" />
                  <label
                    for="featured-3"
                    className="text-sm text-slate-400 hover:text-teal-500"
                  >
                    Completed (0)
                  </label>
                </div>

                <div className="hover:bg-gray-100 mb-1.5 p-1 rounded-lg">
                  <input type="radio" id="featured-3" name="featured" />
                  <label
                    for="featured-3"
                    className="text-sm text-slate-400 hover:text-teal-500"
                  >
                    Archived tasks (0)
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white px-1.5 py-1.5 rounded-lg space-y-2 ">
              <h6 className="text-slate-500	px-2.5">Due date</h6>

              {checkBoxFilter.map((item) => (
                <div
                  className="px-3.5 hover:bg-gray-100 rounded-lg"
                  key={item.id}
                >
                  <input
                    class="styled-checkbox"
                    id={item.idName}
                    type="checkbox"
                    value={item.value}
                  />
                  <label for={item.idName}>{item.label}</label>
                </div>
              ))}
            </div>

            <div className="bg-white px-1.5 py-1.5 rounded-lg space-y-2 ">
              <h6 className="text-slate-500	px-2.5">Assignee</h6>

              <div className="px-3.5 hover:bg-gray-100 rounded-lg">
                <input
                  class="styled-checkbox"
                  id="unassigned"
                  type="checkbox"
                  value="value9"
                />
                <label for="unassigned">Unassigned (0)</label>
              </div>
            </div>

            <div className="bg-white px-1.5 py-1.5 rounded-lg space-y-2 ">
              <h6 className="text-slate-500	px-2.5">Tag</h6>

              <div className="px-3.5 hover:bg-gray-100 rounded-lg">
                <input
                  class="styled-checkbox"
                  id="tags"
                  type="checkbox"
                  value="value10"
                />
                <label for="tags">No Tags (0)</label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🟨🟨🟨 Position Fixed at the bottom */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-100">
        <div
          onClick={() => setAddCard(true)}
          className="flex gap-3 items-center border border-dashed border-black p-3 rounded bg-white text-gray-500 cursor-pointer duration-300 hover:bg-gray-200"
        >
          <RiAddCircleFill className="text-2xl" />
          <h1>ADD A CARD</h1>
        </div>
        {addCard && <AddCard setAddCard={setAddCard} />}
      </div>
    </section>
  );
};

export default Timeline;
