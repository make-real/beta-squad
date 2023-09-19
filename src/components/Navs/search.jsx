import React from 'react';
import { BsSearch } from "react-icons/bs";

function Search() {
  return (
    <>
      <div className="relative py-[15px] pl-[19px] pr-[66px] flex items-center w-full justify-between">
        <div className="flex">
          <BsSearch className="text-blue-700 mx-5 my-4" />
          <input
            type="text"
            id="large-input"
            placeholder={ 'Search (Coming soon)'}
            className="flex-1 mx-2 -mx-3 my-2 -px-2 py-0.5 bg-[#ECECEC]/[0.7] rounded-full px-32 pb-1 pt-1 border outline-none border-white focus:border-teal-600 duration-200 resize-y h-full text-center"
          />
        </div>
      </div>
    </>
  );
}

export default Search;