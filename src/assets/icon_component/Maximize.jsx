import React from "react";

const Maximize = ({ className, style, onClick, color = "#818892" }) => {
    return (
        <svg
            className={className}
            style={style}
            onClick={onClick}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z"
                stroke={color}
                strokeLinecap="round"
                stroke-linejoin="round"
            />
            <path d="M13.5 4.5L4.5 13.5" stroke={color} strokeLinecap="round" stroke-linejoin="round" />
            <path d="M13.5 7.5V4.5H10.5" stroke={color} strokeLinecap="round" stroke-linejoin="round" />
            <path d="M4.5 10.5V13.5H7.5" stroke={color} strokeLinecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export default Maximize;
