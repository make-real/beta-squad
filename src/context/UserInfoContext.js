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
            localStorage.setItem("userInfo", JSON.stringify(data.user)); // Update local storage here
        };
        getUserInfo();
    }, []);

    useEffect(() => {
        dispatch(setUserInfo(loginUserInfo));
    }, [loginUserInfo, dispatch]);

    return (
        <UserInfo.Provider value={{ loginUserInfo, setLoginUserInfo }}>
            {children}
        </UserInfo.Provider>
    );
};

export const useUserInfoContext = () => useContext(UserInfo);
