import { createContext, useContext, useEffect, useState } from "react";
import { get_my_profile } from "../api/auth";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/slice/userInfo";

const UserInfo = createContext();

export const UserInfoContext = ({ children }) => {
    const [loginUserInfo, setLoginUserInfo] = useState(
        {} || JSON.parse(localStorage.getItem("userInfo"))
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const getUserInfo = async () => {
            if (!JSON.parse(localStorage.getItem("jwt"))) return;
            const { data } = await get_my_profile();
            setLoginUserInfo(data.user);
        };
        getUserInfo();
    }, []);



    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("userInfo"))) {
            localStorage.setItem("userInfo", JSON.stringify(loginUserInfo));
        }
        dispatch(setUserInfo(loginUserInfo));
    }, [loginUserInfo]);

    console.log(loginUserInfo)

    return (
        <UserInfo.Provider value={{ loginUserInfo, setLoginUserInfo }}>
            {children}
        </UserInfo.Provider>
    );
};

export const useUserInfoContext = () => useContext(UserInfo);
