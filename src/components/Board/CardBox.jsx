import { DotsSingle, Plus, RightOK, Smile, UserPlus } from '../../assets/icons';
import { useState } from 'react'
import BoardActionDropDown from './BoardActionDropDown';
import BoardModal from './BoardModal';


const CardBox = () => {

    const [modalActionToggling, setModalActionToggling] = useState(false);
    const [visible, setVisible] = useState(false);
    const [boardModal, setBoardModal] = useState(false);
    const [noteDone, setNoteDone] = useState(false);


    return (

        <div onClick={() => setBoardModal(true)}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className='relative w-[275px]  bg-gray-100 px-3 py-3 rounded-md border-t-4 border-teal-600 cursor-grab hover:bg-gray-200'>

            {
                noteDone &&
                <div className='px-1 pb-2'>
                    <div className={`w-8 h-8 grid place-items-center rounded-md cursor-pointer hover:bg-gray-300 hover:text-teal-400 text-[#B9C3CE]  ${visible ? 'visible' : 'invisible'}`}>
                        <UserPlus />
                    </div>

                    <div className='absolute top-4 right-8 flex items-center justify-center w-8 h-8 bg-teal-400 rounded-full text-white'>
                        <RightOK />
                    </div>
                </div>
            }

            <p className='text-lg mr-4 text-gray-800'>UI testing... Working on this section these time...</p>


            {/* For Tags */}
            <div className='py-1 space-x-1 text-white'>
                <span className='text-xs bg-green-500 py-1 px-2 rounded-full relative duration-150 before:content-["X"] before:absolute before:top-1 before:right-1 before:px-[3px] before:font-bold before:bg-green-600 before:rounded-full before:hover:cursor-pointer before:invisible hover:before:visible'>
                    Important</span>

                <span className='text-xs bg-orange-500 py-1 px-2 rounded-full relative duration-150 before:content-["X"] before:absolute before:top-1 before:right-1 before:px-[3px] before:font-bold before:bg-orange-600 before:rounded-full before:hover:cursor-pointer before:invisible hover:before:visible'> Working ON</span>
            </div>

            {
                // For 3 Dots, Menu toggling...
                visible &&
                <div onClick={(e) => { e.stopPropagation(); setModalActionToggling(pre => !pre) }}>
                    <DotsSingle className={`absolute top-4 right-1 cursor-pointer py-1.5 w-6 h-8 rounded-lg  hover:bg-gray-300 duration-200 text-gray-400 active:bg-gray-300 ${modalActionToggling ? 'bg-gray-300' : ''}`} />
                </div>
            }

            {
                // Toggling menu display 
                modalActionToggling &&
                <BoardActionDropDown
                    right={true}
                    noteDone={noteDone}
                    setNoteDone={setNoteDone}
                    setModalActionToggling={setModalActionToggling}
                />
            }


            <div className='absolute bottom-4 right-6 flex items-center text-gray-400 p-1.5 rounded-md cursor-pointer hover:bg-gray-300 duration-200'>
                <Plus width="12" height="12" className='mr-[2px]' />
                <Smile />
            </div>




            {
                // When Task Click >>> then Modal Open
                boardModal && <BoardModal setBoardModal={setBoardModal} noteDone={noteDone}
                    setNoteDone={setNoteDone} />
            }
        </div>
    )
}

export default CardBox