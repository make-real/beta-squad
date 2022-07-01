import BoardActionDropDown from './BoardActionDropDown';
import { Close, DotsSingle } from '../../assets/icons';
import { useState } from 'react';


const BoardModal = ({ setBoardModal, noteDone, setNoteDone }) => {

    const [modalActionToggling, setModalActionToggling] = useState(false);

    return (
        <section
            className='fixed top-0 right-0 left-0 bottom-0 z-40 bg-black/30 grid place-items-center'
            onClick={() => setBoardModal(false)}
        >

            <div className='bg-gray-50 w-[95%] h-[90vh] rounded-2xl' onClick={e => e.stopPropagation()}>

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

                <div></div>

                <div></div>

            </div>
        </section >
    )
}

export default BoardModal