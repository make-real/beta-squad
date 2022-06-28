import { Bell, CloseMenuBtn, OpenMenuBtn, OverWatch, Plus, Search, SMS, Task } from "../assets/icons";
import { useStyleContext } from "../context/StyleContext";
import Tippy from "@tippyjs/react";
import asserts from "../assets";
import 'tippy.js/dist/tippy.css';


const SideBar = () => {

    const { margin, setMargin } = useStyleContext();

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
            <div className={`${!margin ? 'w-[0px]' : 'w-[275px]'} bg-[#202F3E] duration-200`}>

                <div className="flex items-center justify-between bg-[#162432] pr-3 pl-5">

                    <div className="flex items-center space-x-4">

                        <div className="mt-3 mb-2">
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
      
                    <div className='cursor-pointer' onClick={() => setMargin(false)}>
                        <CloseMenuBtn width={24} height={24} className='text-gray-400 hover:text-gray-50' />
                    </div>
                </div>

            </div>


        </section>
    )
}

export default SideBar