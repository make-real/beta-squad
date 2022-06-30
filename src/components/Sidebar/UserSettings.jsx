import { useStyleContext } from "../../context/StyleContext";
import {
    Addons,
    Calendar,
    LogOut,
    Mobile,
    Settings,
    Smile,
    SpaceLogo,
    Subscription,
} from "../../assets/icons";


const UserSettings = ({ userMenu }) => {

    const { margin } = useStyleContext();

    return (

        //   🟨🟨🟨 For User Settings DropDown Menu 🟨🟨🟨
        <div
            className={`${margin && userMenu ? "fixed" : "hidden"
                } top-12 left-0 z-50 w-[235px] h-[345px] bg-white rounded-md before:content-[''] before:w-8 before:h-8 before:bg-white before:absolute before:top-[-4px] before:left-[66px] before:rotate-45 before:z-[-10]`}
        >
            <nav className="py-4 px-3">
                <a
                    href="/#"
                    className="userSettings group"
                >
                    <SpaceLogo className="text-[#B9C3CE] group-hover:text-purple-500" />
                    <span>Show Workspace list</span>
                </a>
                <a
                    href="/#"
                    className="userSettings group"
                >
                    <Smile className="text-[#B9C3CE] group-hover:text-purple-500" />
                    <span>Set your status</span>
                </a>

                <div className="border-b border-gray-300 my-2"></div>

                <a
                    href="/#"
                    className="userSettings group"
                >
                    <Settings className="text-[#B9C3CE]" />{" "}
                    <span className="group-hover:text-purple-500">Settings</span>
                </a>
                <a
                    href="/#"
                    className="userSettings group"
                >
                    <Subscription className="text-[#B9C3CE]" />{" "}
                    <span className="group-hover:text-purple-500">Subscription</span>
                </a>
                <a
                    href="/#"
                    className="userSettings group"
                >
                    <Calendar className="text-[#B9C3CE]" />{" "}
                    <span className="group-hover:text-purple-500">Book a demo</span>
                </a>
                <a
                    href="/#"
                    className="userSettings group"
                >
                    <Addons className="text-[#B9C3CE]" />{" "}
                    <span className="group-hover:text-purple-500">Addons</span>
                </a>
                <a
                    href="/#"
                    className="userSettings group"
                >
                    <Mobile className="text-[#B9C3CE]" />{" "}
                    <span className="group-hover:text-purple-500">Apps</span>
                </a>
                <a
                    href="/login"
                    className="userSettings group"
                >
                    <LogOut className="text-[#B9C3CE]" />{" "}
                    <span className="group-hover:text-purple-500">Log out</span>
                </a>
            </nav>
        </div>

    )
}

export default UserSettings