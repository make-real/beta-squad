import { createContext, useContext, useEffect, useState } from "react"
import { getUserProfileInfo } from "../hooks/useFetch";
import axios from '../net'


const UserInfo = createContext();

export const UserInfoContext = ({ children }) => {

    // get login user info from server OR localStorage 
    const [loginUserInfo, setLoginUserInfo] = useState({} || JSON.parse(localStorage.getItem('userInfo')));

    const userId = JSON.parse(localStorage.getItem('userId'));
    const { data } = getUserProfileInfo(userId)

    useEffect(() => setLoginUserInfo(data?.user), [data]);


    // set login user info at localStorage 
    useEffect(() => localStorage.setItem('userInfo', JSON.stringify(loginUserInfo)), [loginUserInfo])


    return (
        <UserInfo.Provider value={{ loginUserInfo, setLoginUserInfo }}>
            {
                children
            }
        </UserInfo.Provider>
    )
}

export const useUserInfoContext = () => useContext(UserInfo);