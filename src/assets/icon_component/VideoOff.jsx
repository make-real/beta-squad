import React from "react";

const VideoOff = ({ className, style, onClick }) => {
    return (
        <svg
            onClick={onClick}
            className={className}
            style={style}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                opacity="0.4"
                d="M5.83333 3.45825H10.8333C12.1895 3.45825 12.9292 3.72729 13.3509 4.149C13.7726 4.57071 14.0417 5.31044 14.0417 6.66659V13.3333C14.0417 14.6894 13.7726 15.4291 13.3509 15.8508C12.9292 16.2725 12.1895 16.5416 10.8333 16.5416H5.83333C4.56696 16.5416 3.80058 16.1078 3.33658 15.551C2.85328 14.9711 2.625 14.1683 2.625 13.3333V6.66659C2.625 5.31044 2.89404 4.57071 3.31575 4.149C3.73746 3.72729 4.47718 3.45825 5.83333 3.45825Z"
                fill="#818892"
                stroke="#818892"
                strokeWidth="1.5"
            />
            <path
                d="M10.399 7.91676C10.399 8.3678 10.0333 8.73343 9.58229 8.73343C9.13126 8.73343 8.76562 8.3678 8.76562 7.91676C8.76562 7.46573 9.13126 7.1001 9.58229 7.1001C10.0333 7.1001 10.399 7.46573 10.399 7.91676Z"
                fill="#818892"
                stroke="#818892"
                strokeWidth="1.5"
            />
            <path
                d="M16.4408 13.9384L16.438 13.9364L15.5401 13.3054V6.69459L16.4372 6.06419C16.4373 6.06411 16.4374 6.06404 16.4375 6.06397C16.8215 5.79491 17.1074 5.7306 17.2905 5.72339C17.4776 5.71601 17.6145 5.76633 17.6982 5.80921C17.7759 5.849 17.8946 5.92978 17.996 6.08729C18.0952 6.24136 18.2068 6.51332 18.2068 6.98334V13.025C18.2068 13.495 18.0952 13.767 17.996 13.9211C17.8946 14.0786 17.7759 14.1594 17.6982 14.1991L17.6982 14.1991L17.6908 14.203C17.626 14.2371 17.5033 14.2833 17.3318 14.2833C17.1467 14.2833 16.8459 14.2259 16.4408 13.9384Z"
                fill="#818892"
                stroke="#818892"
                strokeWidth="1.5"
            />
        </svg>
    );
};

export default VideoOff;
