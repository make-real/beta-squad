import React from 'react';
import { BsSearch } from "react-icons/bs";

function Search() {
  return (
    <>
      <div className="relative py-[15px] pl-[19px] pr-[66px]  flex items-center w-full justify-between">
        <div className="flex relative">
          <div className='absolute left-0 inset-y-0 flex items-center'>
            <BsSearch className="text-blue-700 mx-5 my-4 " />
            </div>
          
          <input
            type="text"
            id="large-input"
            placeholder='Search (Coming soon)'
            className="flex-1 mx-2 my-2 h-[40px] -px-2 py-0.5 bg-[#9cb4db20] rounded-full px-32 pb-1 pt-1 border outline-none border-white focus:border-teal-600 duration-200 resize-y  text-center"
          />
        </div>
      </div>
    </>
  );
}

export default Search;