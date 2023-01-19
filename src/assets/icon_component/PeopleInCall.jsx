import React from "react";

const PeopleInCall = ({ className, style, onClick, active }) => {
    return (
        <svg
            className={className}
            style={style}
            onClick={onClick}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.6316 5.7233C14.5582 5.71735 14.4845 5.71735 14.4111 5.7233C13.5476 5.67113 12.8672 4.95582 12.8672 4.07508C12.8672 3.1626 13.6081 2.41675 14.5255 2.41675C15.4372 2.41675 16.1825 3.15635 16.1839 4.07266C16.177 4.9568 15.4936 5.67118 14.6316 5.7233Z"
                fill={active ? "#6576FF" : "#818892"}
                stroke={active ? "#6576FF" : "#818892"}
                stroke-width="1.5"
            />
            <path
                d="M16.9068 11.6267L16.9064 11.6269C16.3768 11.9816 15.6662 12.1937 14.919 12.239C15.0443 11.7491 15.1099 11.2387 15.1153 10.7162L15.1154 10.7162V10.7084C15.1154 10.155 15.0439 9.61337 14.9026 9.09789C15.6564 9.14153 16.3664 9.35374 16.9006 9.7083L16.9006 9.70831L16.903 9.70988C17.4047 10.0401 17.5534 10.401 17.5539 10.665C17.5544 10.9298 17.4061 11.2927 16.9068 11.6267Z"
                fill={active ? "#6576FF" : "#818892"}
                stroke={active ? "#6576FF" : "#818892"}
                stroke-width="1.5"
            />
            <path
                d="M5.56165 5.97391C5.49094 5.96714 5.42 5.96714 5.34928 5.97391C4.34575 5.92337 3.55035 5.09511 3.54297 4.07348C3.54384 3.01815 4.40185 2.16675 5.4513 2.16675C6.50737 2.16675 7.35963 3.0251 7.35963 4.07508C7.35963 5.09443 6.56622 5.92333 5.56165 5.97391Z"
                fill={active ? "#6576FF" : "#818892"}
                stroke={active ? "#6576FF" : "#818892"}
            />
            <path
                d="M5.4599 10.7083C5.4599 11.5167 5.6349 12.2833 5.95156 12.975C4.77656 13.1 3.55156 12.85 2.65156 12.2583C1.3349 11.3833 1.3349 9.95833 2.65156 9.08333C3.54323 8.48333 4.80156 8.24167 5.9849 8.37501C5.64323 9.07501 5.4599 9.86668 5.4599 10.7083Z"
                fill={active ? "#6576FF" : "#818892"}
            />
            <path
                d="M10.1 13.225C10.0333 13.2167 9.95833 13.2167 9.88333 13.225C8.35 13.175 7.125 11.9167 7.125 10.3667C7.125 8.78334 8.4 7.5 9.99167 7.5C11.575 7.5 12.8583 8.78334 12.8583 10.3667C12.8583 11.9167 11.6417 13.175 10.1 13.225Z"
                fill={active ? "#6576FF" : "#818892"}
            />
            <path
                d="M7.39297 14.95C6.13464 15.7916 6.13464 17.1749 7.39297 18.0083C8.8263 18.9666 11.1763 18.9666 12.6096 18.0083C13.868 17.1666 13.868 15.7833 12.6096 14.95C11.1846 13.9916 8.83464 13.9916 7.39297 14.95Z"
                fill={active ? "#6576FF" : "#818892"}
            />
        </svg>
    );
};

export default PeopleInCall;
