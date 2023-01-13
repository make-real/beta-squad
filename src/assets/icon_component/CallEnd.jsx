import React from "react";

const CallEnd = ({ className, style, onClick }) => {
    return (
        <svg
            onClick={onClick}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
        >
            <circle cx="12" cy="12" r="12" fill="#FF3659" />
            <path
                d="M16.7053 8.00011L17.532 7.17344C17.7253 6.98011 17.7253 6.66011 17.532 6.46678C17.3386 6.27344 17.0186 6.27344 16.8253 6.46678L15.9986 7.29344L15.172 6.46678C14.9786 6.27344 14.6586 6.27344 14.4653 6.46678C14.272 6.66011 14.272 6.98011 14.4653 7.17344L15.292 8.00011L14.4653 8.82678C14.272 9.02011 14.272 9.34011 14.4653 9.53344C14.5653 9.63344 14.692 9.68011 14.8186 9.68011C14.9453 9.68011 15.072 9.63344 15.172 9.53344L15.9986 8.70678L16.8253 9.53344C16.9253 9.63344 17.052 9.68011 17.1786 9.68011C17.3053 9.68011 17.432 9.63344 17.532 9.53344C17.7253 9.34011 17.7253 9.02011 17.532 8.82678L16.7053 8.00011Z"
                fill="white"
            />
            <path
                d="M11.8587 13.4733L9.6787 15.6533C9.4387 15.4399 9.20536 15.2199 8.9787 14.9933C8.29203 14.2999 7.67203 13.5733 7.1187 12.8133C6.57203 12.0533 6.13203 11.2933 5.81203 10.5399C5.49203 9.77992 5.33203 9.05325 5.33203 8.35992C5.33203 7.90659 5.41203 7.47325 5.57203 7.07325C5.73203 6.66659 5.98536 6.29325 6.3387 5.95992C6.76536 5.53992 7.23203 5.33325 7.72536 5.33325C7.91203 5.33325 8.0987 5.37325 8.26536 5.45325C8.4387 5.53325 8.59203 5.65325 8.71203 5.82659L10.2587 8.00659C10.3787 8.17325 10.4654 8.32659 10.5254 8.47325C10.5854 8.61325 10.6187 8.75325 10.6187 8.87992C10.6187 9.03992 10.572 9.19992 10.4787 9.35325C10.392 9.50659 10.2654 9.66659 10.1054 9.82659L9.5987 10.3533C9.52536 10.4266 9.49203 10.5133 9.49203 10.6199C9.49203 10.6733 9.4987 10.7199 9.51203 10.7733C9.53203 10.8266 9.55203 10.8666 9.56536 10.9066C9.68536 11.1266 9.89203 11.4133 10.1854 11.7599C10.4854 12.1066 10.8054 12.4599 11.152 12.8133C11.392 13.0466 11.6254 13.2733 11.8587 13.4733Z"
                fill="white"
            />
            <path
                d="M18.6451 16.2201C18.6451 16.4068 18.6118 16.6001 18.5451 16.7868C18.5251 16.8401 18.5051 16.8934 18.4784 16.9468C18.3651 17.1868 18.2184 17.4134 18.0251 17.6268C17.6984 17.9868 17.3384 18.2468 16.9318 18.4134C16.9251 18.4134 16.9184 18.4201 16.9118 18.4201C16.5184 18.5801 16.0918 18.6668 15.6318 18.6668C14.9518 18.6668 14.2251 18.5068 13.4584 18.1801C12.6918 17.8534 11.9251 17.4134 11.1651 16.8601C10.9051 16.6668 10.6451 16.4734 10.3984 16.2668L12.5784 14.0868C12.7651 14.2268 12.9318 14.3334 13.0718 14.4068C13.1051 14.4201 13.1451 14.4401 13.1918 14.4601C13.2451 14.4801 13.2984 14.4868 13.3584 14.4868C13.4718 14.4868 13.5584 14.4468 13.6318 14.3734L14.1384 13.8734C14.3051 13.7068 14.4651 13.5801 14.6184 13.5001C14.7718 13.4068 14.9251 13.3601 15.0918 13.3601C15.2184 13.3601 15.3518 13.3868 15.4984 13.4468C15.6451 13.5068 15.7984 13.5934 15.9651 13.7068L18.1718 15.2734C18.3451 15.3934 18.4651 15.5334 18.5384 15.7001C18.6051 15.8668 18.6451 16.0334 18.6451 16.2201Z"
                fill="white"
            />
        </svg>
    );
};

export default CallEnd;