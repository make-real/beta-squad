import React from "react";

const MicrophoneOn = ({ className, style, onClick }) => {
    return (
        <svg onClick={onClick} className={className} style={style} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4">
                <mask id="path-1-inside-1_1294_12353" fill="white">
                    <path d="M10 18.275C5.8 18.275 2.375 14.8583 2.375 10.65V9.08333C2.375 8.75833 2.64167 8.5 2.95833 8.5C3.275 8.5 3.54167 8.76667 3.54167 9.08333V10.65C3.54167 14.2083 6.43333 17.1 9.99167 17.1C13.55 17.1 16.4417 14.2083 16.4417 10.65V9.08333C16.4417 8.75833 16.7083 8.5 17.025 8.5C17.3417 8.5 17.6083 8.76667 17.6083 9.08333V10.65C17.625 14.8583 14.2 18.275 10 18.275Z" />
                </mask>
                <path
                    d="M10 18.275C5.8 18.275 2.375 14.8583 2.375 10.65V9.08333C2.375 8.75833 2.64167 8.5 2.95833 8.5C3.275 8.5 3.54167 8.76667 3.54167 9.08333V10.65C3.54167 14.2083 6.43333 17.1 9.99167 17.1C13.55 17.1 16.4417 14.2083 16.4417 10.65V9.08333C16.4417 8.75833 16.7083 8.5 17.025 8.5C17.3417 8.5 17.6083 8.76667 17.6083 9.08333V10.65C17.625 14.8583 14.2 18.275 10 18.275Z"
                    fill="#11AFE9"
                />
                <path
                    d="M17.6083 10.65H16.1083L16.1083 10.6559L17.6083 10.65ZM10 16.775C6.62736 16.775 3.875 14.0288 3.875 10.65H0.875C0.875 15.6878 4.97264 19.775 10 19.775V16.775ZM3.875 10.65V9.08333H0.875V10.65H3.875ZM3.875 9.08333C3.875 9.60066 3.45613 10 2.95833 10V7C1.82721 7 0.875 7.91601 0.875 9.08333H3.875ZM2.95833 10C2.44657 10 2.04167 9.59509 2.04167 9.08333H5.04167C5.04167 7.93824 4.10343 7 2.95833 7V10ZM2.04167 9.08333V10.65H5.04167V9.08333H2.04167ZM2.04167 10.65C2.04167 15.0368 5.60491 18.6 9.99167 18.6V15.6C7.26176 15.6 5.04167 13.3799 5.04167 10.65H2.04167ZM9.99167 18.6C14.3784 18.6 17.9417 15.0368 17.9417 10.65H14.9417C14.9417 13.3799 12.7216 15.6 9.99167 15.6V18.6ZM17.9417 10.65V9.08333H14.9417V10.65H17.9417ZM17.9417 9.08333C17.9417 9.60066 17.5228 10 17.025 10V7C15.8939 7 14.9417 7.916 14.9417 9.08333H17.9417ZM17.025 10C16.5132 10 16.1083 9.59509 16.1083 9.08333H19.1083C19.1083 7.93824 18.1701 7 17.025 7V10ZM16.1083 9.08333V10.65H19.1083V9.08333H16.1083ZM16.1083 10.6559C16.1217 14.029 13.3738 16.775 10 16.775V19.775C15.0262 19.775 19.1283 15.6877 19.1083 10.6441L16.1083 10.6559Z"
                    fill="#11AFE9"
                    mask="url(#path-1-inside-1_1294_12353)"
                />
            </g>
            <path
                d="M10.9944 9.90666L11.0199 9.91366L11.0459 9.91885C11.0929 9.92826 11.2051 9.95008 11.3263 9.95008C11.8723 9.95008 12.3923 9.58931 12.5427 9.01798C12.6963 8.44712 12.4368 7.87138 11.9486 7.59606C11.9845 7.59892 12.0189 7.60008 12.0513 7.60008C12.5632 7.60008 13.0456 7.28848 13.232 6.77079L13.2331 6.76756C13.463 6.11975 13.127 5.40662 12.4813 5.1645L12.4813 5.16446L12.474 5.16179C10.8165 4.5599 8.98573 4.56039 7.32157 5.16133L7.32155 5.16128L7.31296 5.1645C6.66732 5.40662 6.33128 6.11975 6.56115 6.76756L6.56104 6.7676L6.56572 6.78009C6.76705 7.31697 7.29181 7.63703 7.83691 7.59682C7.34665 7.87519 7.08751 8.45961 7.24518 9.02528C7.42959 9.69545 8.11394 10.0915 8.79031 9.90699L8.79151 9.90666C9.51155 9.709 10.2744 9.709 10.9944 9.90666ZM9.01497 7.29595C9.61755 7.18737 10.2354 7.19043 10.8371 7.30513C10.233 7.21824 9.61974 7.21518 9.01497 7.29595ZM5.66797 6.75008C5.66797 4.3643 7.61552 2.41675 10.0013 2.41675C12.3871 2.41675 14.3346 4.3643 14.3346 6.75008V10.6584C14.3346 13.0442 12.3871 14.9917 10.0013 14.9917C7.61552 14.9917 5.66797 13.0442 5.66797 10.6584V6.75008Z"
                fill="#11AFE9"
                stroke="#11AFE9"
                stroke-width="1.5"
            />
        </svg>
    );
};

export default MicrophoneOn;
