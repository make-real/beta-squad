import { createContext, useContext, useEffect, useState } from "react";
import { get_my_profile } from "../api/auth";

const UserInfo = createContext();

export const UserInfoContext = ({ children }) => {
  const [loginUserInfo, setLoginUserInfo] = useState(
    {} || JSON.parse(localStorage.getItem("userInfo"))
  );

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await get_my_profile();
      setLoginUserInfo(data.user);
    };

    // 🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
    // this logic re-call it-self again & again at login screen...
    // please re-factor this logic... & delete this comment...
    // thank you... 🤗

    // getUserInfo();
    // 🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
  }, []);

  useEffect(
    () => localStorage.setItem("userInfo", JSON.stringify(loginUserInfo)),
    [loginUserInfo]
  );

  return (
    <UserInfo.Provider value={{ loginUserInfo, setLoginUserInfo }}>
      {children}
    </UserInfo.Provider>
  );
};

export const useUserInfoContext = () => useContext(UserInfo);
