import { Close, Copy, Delete, DotsSingle, LinkingChain } from '../../assets/icons'
import { useState } from 'react';
import RightOK from './../../assets/icons/svg/RightOK';


const BoardModal = ({ setBoardModal }) => {

    const [modalActionToggling, setModalActionToggling] = useState(false);

    return (
        <section
            className='fixed top-0 right-0 left-0 bottom-0 z-40 bg-black/30 grid place-items-center'
            onClick={() => setBoardModal(false)}
        >

            <div className='bg-gray-50 w-3/4 h-[80vh] rounded-2xl' onClick={(e) => e.stopPropagation()}>

                <div className='flex items-center justify-between'>

                    <div>

                    </div>

                    <div className='flex items-center p-3 relative'>
                        <DotsSingle
                            className='text-[#7088A1] cursor-pointer w-8 h-8 p-1 py-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200'
                            onClick={(e) => { e.stopPropagation(); setModalActionToggling(pre => !pre) }}
                        />
                        <Close
                            className='text-[#7088A1] cursor-pointer w-8 h-8 p-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200'
                            onClick={() => setBoardModal(false)}
                        />


                        {   // Little Action Menu for Board Modal 
                            modalActionToggling &&
                            <div className='w-[210px] absolute top-[65px] right-[30px] bg-white p-2 rounded-lg shadow-xl z-20 after:content-[""] after:w-8 after:h-8 after:bg-white after:absolute after:top-[-10px] after:right-[15px] after:rotate-45 after:z-[-10]'>

                                <div className='flex items-center gap-3 p-2 cursor-pointer rounded-lg duration-200 hover:bg-gray-200 text-[#B9C3CE] mb-1 group z-60'>
                                    <Copy className='group-hover:text-teal-500' /> <span>Copy Card</span>
                                </div>

                                <div className='flex items-center gap-3 p-2 cursor-pointer rounded-lg duration-200 hover:bg-gray-200 text-[#B9C3CE] mb-1 group'>
                                    <LinkingChain className='group-hover:text-teal-500' /> <span>Copy Card link</span>
                                </div>
                                <div className='flex items-center gap-3 p-2 cursor-pointer rounded-lg duration-200 hover:bg-gray-200 text-[#B9C3CE] mb-1 group'>
                                    <RightOK className='group-hover:text-teal-500' /> <span>Make as not done</span>
                                </div>
                                <div className='flex items-center gap-3 p-2 cursor-pointer rounded-lg duration-200 hover:bg-gray-200 text-[#B9C3CE] mb-1 group'>
                                    <Delete className='group-hover:text-teal-500' /> <span>Archive Card</span>
                                </div>
                            </div>
                        }

                    </div>
                </div>

                <div></div>

                <div></div>

            </div>
        </section >
    )
}

export default BoardModal