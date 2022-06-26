import { useStyleContext } from "../context/StyleContext";

const SideBar = () => {


    const { margin, setMargin } = useStyleContext();

    // ${!margin ? 'w-[60px]' : 'w-[275px]'}

    return (
        <section className={`fixed top-0 bottom-0 bg-gray-800 flex z-20`}>


            {/* 🟨🟨🟨 always visible sidebar 🟨🟨🟨 */}
            <div className='flex flex-col items-center bg-[#293c4f] w-[50px] pt-2 z-20'>
                <div className='w-10 h-9 bg-green-500 cursor-pointer' onClick={() => setMargin(true)}>

                </div>
            </div>


            {/* 🟨🟨🟨 toggling sidebar 🟨🟨🟨 */}
            <div className={`${!margin ? 'w-[0px]' : 'w-[275px]'} bg-gray-700 pt-2 duration-200`}>
                <div className='w-10 h-9 bg-orange-500 cursor-pointer float-right' onClick={() => setMargin(false)}>

                </div>
            </div>


        </section>
    )
}

export default SideBar