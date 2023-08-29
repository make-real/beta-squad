import React from "react";

const More = ({ className, style, color = "#818892" }) => {
    return (
        <svg className={className} style={style} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.6">
                <path
                    d="M9.75693 4.75479C9.69247 4.69032 9.65625 4.60289 9.65625 4.51172C9.65625 4.42055 9.69247 4.33312 9.75693 4.26865C9.8214 4.20419 9.90883 4.16797 10 4.16797C10.0912 4.16797 10.1786 4.20418 10.2431 4.26865C10.3075 4.33312 10.3438 4.42055 10.3438 4.51172C10.3438 4.60289 10.3075 4.69032 10.2431 4.75479C10.1786 4.81925 10.0912 4.85547 10 4.85547C9.90883 4.85547 9.8214 4.81925 9.75693 4.75479ZM9.75693 10.2235C9.69247 10.1591 9.65625 10.0716 9.65625 9.98047C9.65625 9.8893 9.69247 9.80187 9.75693 9.7374C9.8214 9.67294 9.90883 9.63672 10 9.63672C10.0912 9.63672 10.1786 9.67294 10.2431 9.7374C10.3075 9.80187 10.3438 9.8893 10.3438 9.98047C10.3438 10.0716 10.3075 10.1591 10.2431 10.2235C10.1786 10.288 10.0912 10.3242 10 10.3242C9.90883 10.3242 9.8214 10.288 9.75693 10.2235ZM9.75693 15.6923C9.69247 15.6278 9.65625 15.5404 9.65625 15.4492C9.65625 15.3581 9.69247 15.2706 9.75693 15.2062C9.8214 15.1417 9.90883 15.1055 10 15.1055C10.0912 15.1055 10.1786 15.1417 10.2431 15.2062C10.3075 15.2706 10.3438 15.3581 10.3438 15.4492C10.3438 15.5404 10.3075 15.6278 10.2431 15.6923C10.1786 15.7568 10.0912 15.793 10 15.793C9.90883 15.793 9.8214 15.7568 9.75693 15.6923Z"
                    fill={color}
                    stroke={color}
                    strokeWidth="1.5"
                />
            </g>
        </svg>
    );
};

export default More;
