import React from "react";
import LoadingGif from "../../assets/loading.gif";

const LoadingScreen = () => {
    return (
        <div className="flex items-center gap-[10px] justify-center min-h-screen">
            <img className="w-[70px] h-[70px]" src={LoadingGif} alt="" />
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg> */}
            <p className="text-2xl text-[#6576FF] font-medium">Loading...</p>
        </div>
    );
};

export default LoadingScreen;
