import { HiOutlineUser, HiOutlinePuzzle, HiMenuAlt1 } from "react-icons/hi";
import { FiVideo, FiSearch, FiSettings } from "react-icons/fi";
import { navLinks } from "../../constant/data";
import { NavLink } from "react-router-dom";
import { TbFilter } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import haySpace from "../../assets/haySpace.png";
import Members from "./Members";
import { IoIosClose } from "react-icons/io";

const NavBar = () => {
  const [linkClick, setLinkClick] = useState("");
  const [sidePanel, setSidePanel] = useState(false);
  const [navIcons, setNavIcons] = useState("");

  const handleSidePanel = (name) => {
    setSidePanel(true);
    setNavIcons(name);
  };

  const activeLink = "mr-8  py-4 font-bold text-teal-400";
  const normalLink =
    "mr-8  py-4 font-bold text-gray-300 hover:text-gray-400 hover:underline";

  return (
    <header className="px-8 py-2 flex items-center justify-between border-b border-gray-300 relative">
      {/* 🟨🟨🟨 Left Side */}
      <div className="flex items-center gap-5">
        <div className="w-12 h-12">
          <img src={haySpace} alt="logo" />
        </div>

        <div div="true">
          <div className="flex items-center gap-3">
            <h2 className="text-teal-500 text-xl font-bold">Space Clone </h2>
            <p className="text-[12px] text-gray-300 font-light">
              Project purpose...
            </p>
          </div>

          <nav>
            {navLinks.map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setLinkClick(path)}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* 🟨🟨🟨 Right Side */}
      <div className="flex items-center justify-center text-gray-400">
        <div className="p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400 ">
          <FiVideo className="text-xl font-bold" />
        </div>

        {linkClick === "/" && (
          <div className="p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400 ">
            <HiMenuAlt1 className="text-xl font-bold" />
          </div>
        )}

        <div
          className={`${linkClick === "/" ? "hidden" : "block"} ${
            linkClick === "timeline" ? "hidden" : "block"
          } p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400`}
        >
          <FiSearch className="text-xl font-bold" />
        </div>

        <div
          onClick={() => handleSidePanel("filter")}
          className={`${linkClick === "/" ? "hidden" : "block"} ${
            linkClick === "timeline" ? "hidden" : "block"
          } p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400`}
        >
          <TbFilter className="text-xl font-bold" />
        </div>

        <div
          className={`${
            linkClick === "kanban" ? "block" : "hidden"
          } p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400`}
        >
          <FaPlus className="text-xl font-bold" />
        </div>

        <div
          onClick={() => handleSidePanel("setting")}
          className="p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400 "
        >
          <FiSettings className="text-xl font-bold" />
        </div>

        <div
          className="flex p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400 "
          onClick={() => handleSidePanel("add-member")}
        >
          <HiOutlineUser className="text-xl font-bold" />
          <span className="my-auto text-xs ">5</span>
        </div>

        <div
          onClick={() => handleSidePanel("add-on")}
          className="p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400 "
        >
          <HiOutlinePuzzle className="text-xl font-bold" />
        </div>
      </div>

      {/* 🟨🟨🟨 side box open */}

      {sidePanel && (
        <div className="fixed border right-0 top-[66px] h-full w-[310px] z-50 bg-gray-100 p-1">
          <div
            className="flex justify-end cursor-pointer text-lg hover:text-teal-500"
            onClick={() => setSidePanel(false)}
          >
            <IoIosClose />
          </div>
          {/* members */}
          {navIcons === "filter" ? (
            <div>
              <h2>filter</h2>
            </div>
          ) : navIcons === "setting" ? (
            <div>
              <h2>setting</h2>
            </div>
          ) : navIcons === "add-member" ? (
            <div>
              <Members />
            </div>
          ) : (
            <div>
              <h2>add on</h2>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
