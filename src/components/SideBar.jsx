import React, { useState } from 'react'

const SideBar = () => {

    const [margin, setMargin] = useState(false)

    // ${!margin ? 'w-[60px]' : 'w-[275px]'}

    return (
        <section className={`min-h-screen bg-gray-800 flex`}>


            {/* 🟨🟨🟨 always visible sidebar 🟨🟨🟨 */}
            <div className='flex flex-col items-center bg-[#293c4f] w-[60px] pt-2 z-20'>
                <div className='w-12 h-10 bg-green-500' onClick={() => setMargin(true)}>

                </div>
            </div>


            {/* 🟨🟨🟨 toggling sidebar 🟨🟨🟨 */}
            <div className={`${!margin ? 'w-[0px]' : 'w-[275px]'} bg-gray-700 pt-2`}>
                <div className='w-12 h-10 bg-orange-500 float-right' onClick={() => setMargin(false)}>

                </div>
            </div>




        </section>
    )
}

export default SideBar