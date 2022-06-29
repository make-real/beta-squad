import { Addons, ArrowLeft, ArrowRight, Bell, Calendar, CloseMenuBtn, Dots, Eye, Folder, Logo, LogoRed, LogOut, Mobile, OpenMenuBtn, OverWatch, Plus, Search, Settings, Smile, SMS, SpaceLogo, Subscription, Task } from "../assets/icons";
import { useStyleContext } from "../context/StyleContext";
import Tippy from "@tippyjs/react";
import asserts from "../assets";
import 'tippy.js/dist/tippy.css';
import { useState } from "react";


const SideBar = () => {

    const { margin, setMargin } = useStyleContext();
    const [userMenu, setUserMenu] = useState(false);

    return (
        <section className={`fixed top-0 bottom-0 bg-gray-800 flex z-20`}>

            {/* 🟨🟨🟨 always visible sidebar 🟨🟨🟨 */}
            <div className='flex flex-col items-center bg-[#293c4f] w-[50px] pt-2 z-20'>
                {
                    margin
                        ? (
                            <>
                                <Tippy placement='right' content="Make Reals" className="bg-gray-600/70 text-[10px] w-40 ">
                                    <div className="relative ml-1.5 mr-1 p-1.5 bg-[#7088A1] rounded-[5px] cursor-pointer duration-200 hover:bg-[#4D6378] before:content-[''] before:absolute before:top-[50%] before:left-[-6px] before:translate-y-[-50%] before:bg-white before:w-[2px] before:h-5 before:rounded-md">
                                        <img src={asserts.makeReal} alt="searchIcon" className="rounded-[4px]" />
                                    </div>
                                </Tippy>

                                <div className="w-10 h-10 mt-2 bg-[#1f2e3d] flex items-center justify-center cursor-pointer rounded-[5px] shadow-xl hover:bg-[#4D6378] group">
                                    <Plus className='text-white duration-200 group-hover:text-purple-300 hover:z-10' />
                                </div>
                            </>
                        )
                        : (
                            <>
                                <OpenMenuBtn width={28} height={28} onClick={() => setMargin(true)} className='cursor-pointer text-gray-400 hover:text-gray-50' />

                                <div className="mt-3 mb-2">
                                    <img alt="userImage" src={asserts.Mahbub} className="w-8 h-8 rounded-full cursor-pointer" />
                                </div>

                                <div className="w-10 h-10 mt-2 rounded-md hover:bg-[#3a4b5e] cursor-pointer flex justify-center items-center">
                                    <Search />
                                </div>

                                <div className="w-10 h-10 mt-2 rounded-md hover:bg-[#3a4b5e] cursor-pointer flex justify-center items-center">
                                    <Task />
                                </div>

                                <div className="w-10 h-10 mt-2 rounded-md hover:bg-[#3a4b5e] cursor-pointer flex justify-center items-center">
                                    <OverWatch />
                                </div>
                            </>
                        )
                }
            </div>



            {/* 🟨🟨🟨 toggling sidebar 🟨🟨🟨 */}
            <div className={`${!margin ? 'hidden' : 'w-[275px]'} bg-[#202F3E] duration-200`}>

                <div className="flex items-center justify-between bg-[#162432] pr-3 pl-5">

                    <div className="flex items-center space-x-4">

                        <div className="mt-3 mb-2" onClick={() => setUserMenu(pre => !pre)}>
                            <img alt="userImage" src={asserts.Mahbub} className="w-6 h-6 rounded-full cursor-pointer" />
                        </div>

                        <div className=" cursor-pointer flex justify-center items-center">
                            <SMS className='text-[#1F2E3D] hover:text-gray-200' />
                        </div>

                        <div className=" cursor-pointer flex justify-center items-center">
                            <Bell className='text-[#1F2E3D] hover:text-gray-200' />
                        </div>
                    </div>

                    <p className="capitalize text-gray-500 text-sm">make real</p>

                    <div className='cursor-pointer' onClick={() => { setMargin(false); setUserMenu(false) }}>
                        <CloseMenuBtn width={24} height={24} className='text-gray-400 hover:text-gray-50' />
                    </div>
                </div>


                <div className="flex items-center w-full m-3 space-x-4">
                    <div className="w-[60%] hover:bg-[#344453] duration-200 flex items-center space-x-3 p-2 mt-[2px] cursor-pointer rounded-lg mr-2 ">
                        <Search /> <p className="text-[#7088a1] font-bold">Search...</p>
                    </div>

                    <div className="w-[20%] flex justify-between" >
                        <ArrowLeft className='cursor-pointer' />
                        <ArrowRight className='cursor-pointer' />
                    </div>
                </div>


                <div className="flex items-center px-2.5 py-1 m-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg">
                    <Task />
                    <p className="uppercase text-[#7088a1] font-bold">My Tasks</p>
                </div>


                <div className="flex items-center px-2.5 py-1 m-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg">
                    <OverWatch />
                    <p className="uppercase text-[#7088a1] font-bold">OverWatch</p>
                </div>


                <div className="flex w-full items-center m-3 justify-between pr-4 mt-8">
                    <div className="hover:bg-[#344453] duration-200 flex items-center space-x-3 p-2 cursor-pointer rounded-lg mr-2 w-full ">
                        <p className="text-[#7088a1] font-bold w-full">YOUR SPACES</p> <Search />
                    </div>

                    <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-[#344453] rounded-lg duration-200" >
                        <Plus className='cursor-pointer text-gray-600 w-6 h-6 p-1 rounded-full bg-gray-400 ' />
                    </div>
                </div>


                {/* 🟨🟨🟨 Folder Creation 🟨🟨🟨 */}
                <div className="hover:bg-[#344453] duration-200 flex items-center p-2 cursor-pointer rounded-lg mr-2 ml-6 w-fit">
                    <Folder className="text-[#3f5266] text-sm" /> <p className="text-[#3f5266] font-bold ml-2 text-sm">Create Folder</p>
                </div>


                {/* 🟨🟨🟨 User Space Join List 🟨🟨🟨 */}
                <div className="my-10">

                    <div className="flex space-x-3 px-2 items-center group">
                        <Dots className='invisible group-hover:visible cursor-grab' />
                        <div className="flex items-center px-2.5 py-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg">
                            <Logo /> <p className=" text-[#7088a1] font-bold">Developer Space</p>
                        </div>
                    </div>

                    <div className="flex space-x-3 px-2 items-center group">
                        <Dots className='invisible group-hover:visible cursor-grab' />
                        <div className="flex items-center px-2.5 py-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg">
                            <Logo /> <p className=" text-[#7088a1] font-bold">Space Clone</p>
                        </div>
                    </div>

                    <div className="flex space-x-3 px-2 items-center group">
                        <Dots className='invisible group-hover:visible cursor-grab' />
                        <div className="flex items-center px-2.5 py-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg">
                            <LogoRed /> <p className=" text-[#7088a1] font-bold">Personal Space</p>
                        </div>
                    </div>

                </div>





                <div className="flex w-full items-center m-3 justify-between pr-4 mt-8">
                    <div className="hover:bg-[#344453] duration-200 flex items-center space-x-3 p-2 cursor-pointer rounded-lg mr-2 w-full ">
                        <p className="text-[#7088a1] font-bold w-full">CHATS</p> <Search />
                    </div>

                    <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-[#344453] rounded-lg duration-200" >
                        <Plus className='cursor-pointer text-gray-600 w-6 h-6 p-1 rounded-full bg-gray-400 ' />
                    </div>
                </div>

                {/* 🟨🟨🟨 User Logo List 🟨🟨🟨 */}
                <div className="mt-8">

                    <div className="flex items-center justify-between p-2.5 mr-2 ml-2 hover:bg-[#344453] cursor-pointer rounded-lg group">
                        <div className="flex items-center space-x-4">
                            <img src={asserts.Mahbub} className="w-8 h-8 rounded-full cursor-pointer ring-4 ring-green-400" alt="userImage" />
                            <p className="capitalize text-[#7088a1] font-bold">Mahbub</p>
                        </div>
                        <Eye className='invisible group-hover:visible' />
                    </div>

                    <div className="flex items-center justify-between p-2.5 mr-2 ml-2 hover:bg-[#344453] cursor-pointer rounded-lg group">
                        <div className="flex items-center space-x-4">
                            <img src={asserts.defaultList} className="w-8 h-8 rounded-full cursor-pointer ring-4 ring-green-400" alt="userImage" />
                            <p className="capitalize text-[#7088a1] font-bold">Hey Bot</p>
                        </div>
                        <Eye className='invisible group-hover:visible' />
                    </div>

                    <div className="flex items-center justify-between p-2.5 mr-2 ml-2 hover:bg-[#344453] cursor-pointer rounded-lg group">
                        <div className="flex items-center space-x-4">
                            <img src={asserts.user} className="w-8 h-8 rounded-full cursor-pointer ring-4 ring-green-400" alt="userImage" />
                            <p className="capitalize text-[#7088a1] font-bold">Mitu</p>
                        </div>
                        <Eye className='invisible group-hover:visible' />
                    </div>

                </div>



            </div>




            {/* 🟨🟨🟨 For User Settings DropDown Menu 🟨🟨🟨 */}
            <div className={`${(margin && userMenu) ? 'fixed' : 'hidden'} top-12 left-0 z-50 w-[235px] h-[345px] bg-white rounded-md before:content-[''] before:w-8 before:h-8 before:bg-white before:absolute before:top-[-4px] before:left-[66px] before:rotate-45 before:z-[-10]`}>

                <nav className="py-4 px-3">
                    <a href="/#" className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm">
                        <SpaceLogo className='text-[#B9C3CE] group-hover:text-purple-500'/><span>Show Workspace list</span>
                    </a>
                    <a href="/#" className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm">
                        <Smile className='text-[#B9C3CE] group-hover:text-purple-500'/><span>Set your status</span>
                    </a>
                    
                    <div className="border-b border-gray-300 my-2"></div>
                    
                    <a href="/#" className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm">
                        <Settings className='text-[#B9C3CE]'/>  <span className="group-hover:text-purple-500">Settings</span>
                    </a>
                    <a href="/#" className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm">
                        <Subscription className='text-[#B9C3CE]'/>  <span className="group-hover:text-purple-500">Subscription</span>
                    </a>
                    <a href="/#" className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm">
                        <Calendar className='text-[#B9C3CE]'/>  <span className="group-hover:text-purple-500">Book a demo</span>
                    </a>
                    <a href="/#" className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm">
                        <Addons className='text-[#B9C3CE]'/>  <span className="group-hover:text-purple-500">Addons</span>
                    </a>
                    <a href="/#" className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm">
                        <Mobile className='text-[#B9C3CE]'/>  <span className="group-hover:text-purple-500">Apps</span>
                    </a>
                    <a href="/#" className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm">
                        <LogOut className='text-[#B9C3CE]'/>  <span className="group-hover:text-purple-500">Log out</span>
                    </a>
                </nav>
            </div>


        </section>
    )
}

export default SideBar