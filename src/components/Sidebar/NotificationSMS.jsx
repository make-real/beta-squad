import { useStyleContext } from "../../context/StyleContext";
import asserts from "../../assets";


const NotificationSMS = ({ userNotificationSMS }) => {

    const { margin } = useStyleContext();


    return (
        <section className={`w-[465px] h-[495px] bg-white shadow-2xl ${margin && userNotificationSMS ? 'fixed' : 'hidden'} top-[60px] left-[95px] p-3     before:content-[""] before:w-8 before:h-8 before:absolute before:top-[-10px] before:left-2 before:rotate-45 before:-  before:bg-white`}>

            <div className="flex justify-between text-sm text-gray-500">
                <span className="px-3 py-2 hover:bg-gray-300 duration-200 rounded-lg hover:text-fuchsia-600 cursor-pointer font-bold">
                    Notifications</span>

                <div className="flex">
                    <span className="px-3 py-2 hover:bg-gray-300 duration-200 rounded-lg hover:text-fuchsia-600 cursor-pointer font-bold">
                        Archive all
                    </span>

                    <span className="px-3 py-2 hover:bg-gray-300 duration-200 rounded-lg hover:text-fuchsia-600 cursor-pointer font-bold">
                        Mark all as read</span>
                </div>
            </div>

            <div className="flex items-center gap-3 p-2 border-b border-gray-300 text-sm mt-2">
                <img src={asserts.Mahbub} className='w-11 h-11 rounded-full' alt="" />
                <div>
                    Mahbub mentioned you in space <span className="underline">Space Clone: </span>
                    <span className="font-bold text-fuchsia-700">@taiseen.cse </span>
                    <span className="font-bold text-fuchsia-700">@mousumitu </span>
                    <p className="text-gray-400 text-xs pt-1">Jun 25 at 3:30 PM</p>
                </div>
            </div>
        </section>
    )
}

export default NotificationSMS
