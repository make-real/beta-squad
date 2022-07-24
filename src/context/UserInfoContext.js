import { createContext, useContext, useEffect, useState } from "react"

const UserInfo = createContext();

export const UserInfoContext = ({ children }) => {

    // get login user info from server OR localStorage 
    const [loginUserInfo, setLoginUserInfo] = useState({} || JSON.parse(localStorage.getItem('userInfo')));


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