import {
  LogOut,
  Mobile,
  Settings,
} from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { userLogOut } from "../../hooks/useFetch";

const UserSettingsDropDown = ({ userMenu, setUserMenu }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await userLogOut();
    } catch (error) {
      console.log(error);
    }

    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <nav>
       

        <Link
          to="/settings"
          className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm"
        >
          <Settings className="text-[#B9C3CE]" />
          <span className="group-hover:text-purple-500">Settings</span>
        </Link>

       

        <div
          onClick={handleLogOut}
          className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm"
        >
          <LogOut className="text-[#B9C3CE]" />
          <span className="group-hover:text-purple-500">Log out</span>
        </div>
      </nav>
    </div>
  );
};

export default UserSettingsDropDown;
