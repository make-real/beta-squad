// import { Plus } from '../../assets/icons';
import { useEffect, useRef, useState } from "react";
import { Bars2Icon, PlusIcon } from "@heroicons/react/24/outline";
import { ClipLoader } from "react-spinners";

// This <Component /> called by 🟨🟨🟨 Board.jsx 🟨🟨🟨
// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const TopAddBtn = ({ loading, showType, onSubmit, btnText, placeHolder,setInputToggle,inputToggle }) => {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null); // Add a ref to the input element

  useEffect(() => {
    if (btnText !== "card") {
      setInputToggle(true);
    }
  }, [btnText]);
  const handleSubmit = (e) => {
    e.preventDefault();

    // value send into caller/Parent component...
    if (onSubmit) onSubmit(userInput);

    // Reset input field + Close User Input Window after user input something
    setUserInput("");

    setInputToggle(!loading);
    setInputToggle(!inputToggle)
  };

  // handle keyBoard enter button press
  const handleEnter = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };
  useEffect(() => {
    if (inputToggle && inputRef.current) {
      inputRef.current.focus(); // Focus on the input element when inputToggle is true
    }
  }, [inputToggle]);

  return (
   <div>
     <div
     
    >
      {
        inputToggle &&<div  className={`${
            btnText === "card"
              ? "w-full rounded-b-2xl"
              : `${
                  showType === "grid" ? "w-72 absolute top-[150px] left-3" : "w-full"
                } rounded-2xl bg-[#ECECEC]/[0.4]`
          }`}>
            <form className="w-full px-3 py-2" onSubmit={handleSubmit}>
          <p className="py-2 font-normal text-[#424D5B]">
            {btnText === "card" ? "Card name" : "List name"}
          </p>

          <div className="relative">
            <Bars2Icon className="absolute text-[#818892] bg-[#ECECEC] rounded-md top-[10px] left-3 h-5 w-5" />
            <textarea
              rows="1"
              required
              autoFocus
              value={userInput}
              ref={inputRef} // Assign the ref to the input element

              placeholder={placeHolder}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleEnter}
              className={`pl-10 pr-3 py-2 w-full rounded-lg outline-none`}
            />
          </div>
          <div className="flex justify-between gap-2 mt-3 mb-2">
            <button
              onClick={() => {
                setInputToggle(false);
                setUserInput("");
              }}
              className="w-40 p-2 duration-200 text-black font-bold bg-[#ECECEC] hover:bg-gray-300 hover:text-red-500 rounded-lg"
            >
              Cancel
            </button>

            {/* 🚧🚧🚧 If 2 button tag's use here, interpreter show Form not connected warning in console 🚧🚧🚧 */}

            <button
              primary="true"
              type="submit"
              className="w-40 p-2 duration-200 text-white font-bold bg-[#6576FF] hover:bg-[#323f9e] rounded-lg flex justify-center items-center 
                        "
            >
              Add
              {loading && (
                <div className={"flex justify-center ml-2"}>
                  <ClipLoader color="#36d7b7" size="20px" />
                </div>
              )}
            </button>
          </div>
        </form>
        </div>
      }
    </div>
   </div>
  );
};

export default TopAddBtn;
