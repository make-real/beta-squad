import React from "react";
import { Outlet } from "react-router-dom";
import UserSettings from "../UserSettings/UserSettings";

const UserSettingLayout = () => {
  return (
    <div>
      <UserSettings />
      <div>{<Outlet />}</div>
    </div>
  );
};

export default UserSettingLayout;
