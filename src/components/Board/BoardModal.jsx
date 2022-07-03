import BoardActionDropDown from './BoardActionDropDown';
import { ArrowRight, Close, DotsSingle, EyeOpen, RightOK, Tag, UserPlus } from '../../assets/icons';
import { useState } from 'react';


const BoardModal = ({ setBoardModal, noteDone, setNoteDone }) => {

    const [modalActionToggling, setModalActionToggling] = useState(false);
    const [showTags, setShowTags] = useState(false)

    return (
        <section
            className='fixed top-0 right-0 left-0 bottom-0 z-40 bg-black/30 grid place-items-center'
            onClick={() => setBoardModal(false)}
        >

            <div className='bg-gray-50 w-[95%] h-[90vh] rounded-2xl' onClick={e => e.stopPropagation()}>

                {/* 🟨🟨🟨 Section 1 🟨🟨🟨 */}
                <div className='flex items-center justify-between border-b border-gray-300 p-2'>

                    <div className='flex items-center pl-4 text-gray-400 text-sm'>

                        <div
                            className='flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200'>
                            <RightOK />
                            <span>Done</span>
                        </div>

                        <div className='flex items-center space-x-2 px-3 pl-4'>
                            <span>Progress:</span>
                            <div className='p-2 bg-teal-500 rounded-lg cursor-pointer text-white rounded-tl-3xl rounded-bl-3xl'>0%</div>
                            <div className='p-2 bg-gray-200 rounded-lg cursor-pointer hover:text-white hover:bg-teal-500 duration-200 '>25%</div>
                            <div className='p-2 bg-gray-200 rounded-lg cursor-pointer hover:text-white hover:bg-teal-500 duration-200 '>50%</div>
                            <div className='p-2 bg-gray-200 rounded-lg cursor-pointer hover:text-white hover:bg-teal-500 duration-200 '>75%</div>
                            <div className='p-2 bg-gray-200 rounded-lg cursor-pointer hover:text-white hover:bg-teal-500 duration-200 rounded-tr-3xl rounded-br-3xl'>100%</div>
                        </div>

                        <div className='flex items-center space-x-2 cursor-pointer p-3 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl text-gray-400' >
                            <UserPlus />
                            <span>Assignee</span>
                        </div>

                        <div className='flex items-center space-x-2 cursor-pointer p-3 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl'>
                            <EyeOpen width="22" height="22" />
                            <span>Follow</span>
                        </div>

                        <div className='cursor-pointer p-3 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl'>Start - Due</div>

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


                        {
                            // Little Action Menu for Board Modal 
                            modalActionToggling &&
                            <BoardActionDropDown
                                noteDone={noteDone}
                                setNoteDone={setNoteDone}
                                setModalActionToggling={setModalActionToggling}
                            />
                        }

                    </div>
                </div>



                {/* 🟨🟨🟨 Section 2 🟨🟨🟨 */}
                <div className='flex border-b border-gray-300'>

                    <div className='w-1/2 border-r border-gray-300 h-[70vh]'>

                        <div className='flex items-center justify-between p-4 text-gray-400 '>
                            <div className='flex items-center space-x-4'>
                                <span className='text-xs font-bold cursor-pointer hover:text-teal-500'>Space Clone</span>
                                <ArrowRight />
                                <span className='text-xs font-bold cursor-pointer hover:text-teal-500'>Taiseen Vai</span>
                            </div>

                            <div className='text-xs font-bold cursor-pointer hover:text-teal-500'>
                                MOVE TO NEXT LIST
                            </div>
                        </div>

                        <div className='p-3'>
                            <input type="text" className='w-full p-3 outline-none border rounded-md text-teal-500 font-bold bg-gray-50' />
                        </div>

                        <div className='p-3 flex relative'>
                            <div
                                className='w-10 h-10 grid place-items-center cursor-pointer hover:bg-gray-100 rounded-md duration-200'
                                onClick={() => setShowTags(pre => !pre)}
                            >
                                <Tag className='text-[#B9C3CE] hover:text-teal-400' />
                            </div>
                            <input type="text" placeholder='Add a tag...' className='ml-2 px-2 outline-none w-full bg-gray-50' onClick={() => setShowTags(true)} />


                            {
                                showTags &&
                                <div className='max-h-[255px] overflow-y-auto absolute top-[60px] left-[60px] right-0 flex flex-col gap-2 text-gray-800 shadow-2xl '>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-green-500 w-fit rounded-full'>done</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-red-500 w-fit rounded-full'>Important</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-sky-500 w-fit rounded-full'>ON Going...</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-orange-500 w-fit rounded-full'>api ready</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-pink-500 w-fit rounded-full'>Improvement</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-blue-500 w-fit rounded-full'>easy</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-gray-500 w-fit rounded-full'>ON Going...</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-green-500 w-fit rounded-full'>done</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-red-500 w-fit rounded-full'>Important</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-sky-500 w-fit rounded-full'>ON Going...</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-orange-500 w-fit rounded-full'>api ready</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-pink-500 w-fit rounded-full'>Improvement</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-blue-500 w-fit rounded-full'>easy</span></div>
                                    <div className='pl-3 pb-3 hover:bg-gray-300'><span className='px-2 py-1 bg-gray-500 w-fit rounded-full'>ON Going...</span></div>

                                </div>
                            }

                        </div>

                    </div>

                    <div className='w-1/2'>

                    </div>

                </div>



                {/* 🟨🟨🟨 Section 3 🟨🟨🟨 */}
                <div className='flex h-[10vh]'>

                    <div className='w-1/2 border-r border-gray-300 flex items-center justify-center space-x-1 cursor-pointer text-gray-400 hover:text-gray-500 duration-150'>
                        <span>Drop files here or </span>
                        <label htmlFor="file" className='text-teal-600 cursor-pointer hover:text-teal-700 duration-150'>browse</label>
                        <input type="file" id="file" className='hidden' />
                    </div>

                    <div className='w-1/2'>

                    </div>

                </div>

            </div>
        </section >
    )
}

export default BoardModal