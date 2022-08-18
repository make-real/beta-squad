import { ArrowRight, Attachment, CheckList, Close, Description, DotsSingle, EyeOpen, RightOK, Tag, UserPlus } from '../../assets/icons';
import { CardSettingDropDown } from '.';
import { useState, useEffect } from 'react';


// This <Component /> called by 🟨🟨🟨 Card.jsx 🟨🟨🟨
const CardModal = ({ setBoardModal, noteDone, setNoteDone, card }) => {

    const [modalActionToggling, setModalActionToggling] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [setTags, setSetTags] = useState([]);
    const [tagContext, setTagContext] = useState(['done', 'Important', 'ON Going...', 'api ready', 'Improvement', 'easy', 'good']);
    const tagColor = [
        'bg-red-500',
        'bg-orange-500',
        'bg-green-500',
        'bg-pink-500',
        'bg-blue-500',
        'bg-gray-500',
    ]


    console.log(card);

    // user esc key press Event Listener for closing modal... 
    useEffect(() => {
        const handleEscapeKeyPress = e => {
            if (e.code === 'Escape') setBoardModal(false);
        }

        document.addEventListener('keydown', handleEscapeKeyPress);
        return () => document.removeEventListener('keydown', handleEscapeKeyPress);
    }, [setBoardModal]);


    const handleAddTags = (tag) => {
        setSetTags(pre => [...pre, tag]);
        setTagContext(pre => pre.filter(data => data !== tag));
    }

    const handleDeleteTags = (tag) => {
        setSetTags(pre => pre.filter(item => item !== tag));
        setTagContext(pre => [...pre, tag]);
    }


    // assignee: []
    // attachments: []
    // checkList: []
    // id: 1660414745825.4255
    // name: "sdfsdfdsf"
    // progress: 0
    // tags: []

    return (
        <section
            className='fixed top-0 right-0 left-0 bottom-0 bg-black/30 grid place-items-center'
            onClick={() => setBoardModal(false)}
        >

            <div className='bg-gray-50 w-[60%] rounded-2xl' onClick={e => e.stopPropagation()}>



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
                            <CardSettingDropDown
                                noteDone={noteDone}
                                setNoteDone={setNoteDone}
                                setModalActionToggling={setModalActionToggling}
                            />
                        }

                    </div>
                </div>




                {/* 🟨🟨🟨 Section 2 ||| Middle area 🟨🟨🟨 */}
                <div className='flex flex-col border-b border-gray-300'>

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
                        <input
                            type="text"
                            defaultValue={card?.name}
                            className='w-full p-3 outline-none border rounded-md text-teal-500 font-bold bg-gray-50'
                        />
                    </div>


                    <div className='p-3 flex relative'>
                        <div
                            className='ml-2 w-10 h-10 grid place-items-center cursor-pointer hover:bg-gray-100 rounded-md duration-200 group'
                            onClick={() => setShowTags(pre => !pre)}
                        >
                            <Tag className='text-[#B9C3CE] group-hover:text-teal-400' />
                        </div>

                        <div className='flex items-center flex-wrap gap-2 border border-transparent w-full rounded-md px-2 hover:border-gray-300 customScroll'>
                            {
                                // 🟨🟨🟨 Just Tag Display
                                setTags.map((data, i) => (
                                    <span className={`px-2 py-1 ${tagColor[i]} text-white cursor-pointer rounded-full`}
                                        onClick={() => handleDeleteTags(data)}
                                    >{data}</span>
                                ))
                            }
                            {
                                tagContext.length > 0
                                    ? <input type="text" placeholder='Add a tag...' className='ml-2 py-2 outline-none bg-gray-50' onClick={() => setShowTags(true)} />
                                    : null
                            }
                        </div>


                        {
                            // 🟨🟨🟨 all tags 🟨🟨🟨
                            showTags &&
                            <div className='max-h-[255px] overflow-y-auto absolute top-[60px] left-[60px] right-0 flex flex-col text-gray-100 shadow-2xl bg-white '>
                                {
                                    tagContext.map((data, i) => (
                                        <div
                                            key={data}
                                            onClick={() => { setShowTags(false); handleAddTags(data) }}
                                            className='pl-3 py-2 hover:bg-gray-300 flex items-center cursor-pointer'
                                        >
                                            <span className={`px-2 py-1 ${tagColor[i]} w-fit rounded-full`}>{data}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>


                    <div className='mt-8 ml-4 '>
                        <div className='flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group'>
                            <Description className='text-[#B9C3CE] group-hover:text-teal-400' /> <span>Description</span>
                        </div>

                        <input type="text" className='w-[95%] px-3 h-14 ml-10 border border-gray-50 hover:border-gray-200 outline-none bg-gray-50 cursor-pointer rounded-md' />
                    </div>


                    <div className='mt-8 ml-4 '>
                        <div className='flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group'>
                            <CheckList className='text-[#B9C3CE] group-hover:text-teal-400' /> <span>Checklist</span>
                        </div>
                    </div>


                    <div className='my-8 ml-4 '>
                        <div className='flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group'>
                            <Attachment className='text-[#B9C3CE] group-hover:text-teal-400' />
                            <label htmlFor="file">Attachments</label>
                            <input type="file" id="file" className='hidden' />
                        </div>
                    </div>

                </div>




                {/* 🟨🟨🟨 Section 3 ||| Bottom Area 🟨🟨🟨 */}
                <div className=' py-4 flex items-center justify-center space-x-1 cursor-pointer text-gray-400 hover:text-gray-500 duration-150'>
                    <span>Drop files here or </span>
                    <label htmlFor="file" className='text-teal-600 cursor-pointer hover:text-teal-700 duration-150'>browse</label>
                    <input type="file" id="file" className='hidden' />
                </div>


            </div>
        </section >
    )
}

export default CardModal



// {
//     // confirm dialog open for delete operation...
//     confirmModalOpen &&
//     <ConfirmDialog
//         listID={listID}
//         cardID={cardID}
//         setConfirmModalOpen={setConfirmModalOpen}
//         setCardSettingDropDownToggle={setCardSettingDropDownToggle}
//     />
// }