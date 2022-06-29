import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import SideBar from "../SideBar";

const Layout = () => {
  return (
    <div>
      <SideBar />
      <NavBar />
      <div className="">{<Outlet />}</div>
    </div>
  );
};

export default Layout;