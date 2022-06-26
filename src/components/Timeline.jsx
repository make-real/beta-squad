import React, { useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import { IoCloseOutline, IoPlanet } from "react-icons/io5";

import { RiAddCircleFill } from "react-icons/ri";

import {
  checkBoxFilter,
  timelineData,
  timelineDataMonth,
} from "../constant/data";

import AddCard from "./AddCard";
import AddCardButton from "./AddCardButton";

const Timeline = () => {
  const [timeDropDown, setTimeDropDown] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [spaceFilter, setSpaceFilter] = useState(false);
  const [timeChange, setTimeChange] = useState("2 Weeks");

  const handleTimeDropDown = () => {
    setTimeDropDown((prev) => !prev);
    setSpaceFilter(false);
  };

  const handleSpaceFilter = () => {
    setTimeDropDown(false);
    setSpaceFilter((prev) => !prev);
  };

  const handleTimeChange = (time) => {
    setTimeChange(time);
    setTimeDropDown(false);
  };

  return (
    <section className="bg-slate-50	h-full ">
      <div className="	p-8 relative">
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
                  onClick={handleTimeDropDown}
                >
                  <small className="pr-7 text-sm my-auto">{timeChange}</small>
                  {timeDropDown ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>

                {timeDropDown && (
                  <div class="z-10 w-32 absolute left-0 top-[50px] bg-slate-100	 divide-y divide-gray-100 rounded shadow  dark:bg-gray-700">
                    <ul
                      class="py-1 text-sm text-gray-500 dark:text-gray-200 cursor-pointer"
                      aria-labelledby="dropdownDefault"
                    >
                      <li
                        class="block pl-4 pr-7 py-2 hover:bg-slate-200 hover:text-gray-700"
                        onClick={() => handleTimeChange("Week")}
                      >
                        Week
                      </li>
                      <li
                        class="block pl-4 pr-7 py-2 hover:bg-slate-200 hover:text-gray-700"
                        onClick={() => handleTimeChange("2 Weeks")}
                      >
                        2 Weeks
                      </li>
                      <li
                        class="block pl-4 pr-7 py-2 hover:bg-slate-200 hover:text-gray-700"
                        onClick={() => handleTimeChange("Month")}
                      >
                        Month
                      </li>
                      <li
                        class="block pl-4 pr-7 py-2 hover:bg-slate-200 hover:text-gray-700"
                        onClick={() => handleTimeChange("3 Months")}
                      >
                        3 Months
                      </li>
                      <li
                        class="block pl-4 pr-7 py-2 hover:bg-slate-200 hover:text-gray-700"
                        onClick={() => handleTimeChange("Half Year")}
                      >
                        Half Year
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="">
                <button
                  class="border text-sm my-auto text-gray-600 hover:text-gray-800 hover:bg-gray-200 font-medium rounded-lg  px-5 py-1.5 text-center inline-flex items-center "
                  type="button"
                  onClick={handleSpaceFilter}
                >
                  <IoPlanet />
                  <span className="px-3">Space Filters</span>
                  {spaceFilter ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>
              </div>
            </div>
          </div>

          <div className="pb-6.5 relative flex">
            {timeChange === "Week" ? (
              <div className="flex w-full">
                {timelineData.slice(0, 7).map((item, index) => (
                  <div className="flex-1" key={item.id}>
                    <div className=" text-center text-xs py-1.5">
                      <h6 className="text-gray-700">{item.number}</h6>
                      <h6 className="text-gray-400">{item.week}</h6>
                    </div>
                    <div
                      className={`h-[120px] w-100  ${
                        index % 2 ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            ) : timeChange === "2 Weeks" ? (
              <div className="flex w-full">
                {timelineData.slice(0, 14).map((item, index) => (
                  <div className="flex-1" key={item.id}>
                    <div className=" text-center text-xs py-1.5">
                      <h6 className="text-gray-700">{item.number}</h6>
                      <h6 className="text-gray-400">{item.week}</h6>
                    </div>
                    <div
                      className={`h-[120px] w-100  ${
                        index % 2 ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            ) : timeChange === "Month" ? (
              <div className="flex w-full">
                {timelineData.map((item, index) => (
                  <div className="flex-1" key={item.id}>
                    <div className=" text-center text-xs py-1.5">
                      <h6 className="text-gray-700">{item.number}</h6>
                      <h6 className="text-gray-400">{item.week}</h6>
                    </div>
                    <div
                      className={`h-[120px] w-100  ${
                        index % 2 ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            ) : timeChange === "3 Months" ? (
              <div className="flex w-full">
                {timelineDataMonth.slice(0, 3).map((item, index) => (
                  <div className="flex-1" key={item.id}>
                    <div className=" text-center text-xs py-1.5">
                      <h6 className="text-gray-700">{item.month}</h6>
                      <h6 className="text-gray-400">{item.year}</h6>
                    </div>
                    <div
                      className={`h-[120px] w-100  ${
                        index % 2 ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex w-full">
                {timelineDataMonth.map((item, index) => (
                  <div className="flex-1" key={item.id}>
                    <div className=" text-center text-xs py-1.5">
                      <h6 className="text-gray-700">{item.month}</h6>
                      <h6 className="text-gray-400">{item.year}</h6>
                    </div>
                    <div
                      className={`h-[120px] w-100  ${
                        index % 2 ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            )}

            <div className="absolute left-0 top-1/2 border border-gray-400 text-gray-400 duration-200 hover:border-gray-600 hover:text-gray-600 py-2.5 px-[6px] bg-white -translate-y-1/3 rounded-r-lg">
              <IoIosArrowBack />
            </div>

            <div className="absolute right-0 top-1/2 border border-gray-400 text-gray-400 duration-200 hover:border-gray-600 hover:text-gray-600 py-2.5 px-[6px] bg-white -translate-y-1/3 rounded-l-lg">
              <IoIosArrowForward />
            </div>
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
                    <input
                      type="radio"
                      id="featured-1"
                      name="featured"
                      checked
                    />
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
      </div>

      <AddCardButton />
    </section>
  );
};

export default Timeline;
