import { Copy, Delete, EyeOpen, Plus, RightArrow } from '../../assets/icons';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';


// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const BoardListSettingDropDown = ({ boardListID, setBoardListSettingDropDownToggle }) => {

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);


    return (
        <div className='absolute top-[60px] left-[128px] w-[280px] p-3 rounded-lg shadow-2xl z-20 bg-white
                            before:content-[""] before:w-8 before:h-8 before:bg-white before:absolute before:top-[-8px] before:left-[50%] before:translate-x-[-50%] before:rotate-45 before:z-[-10]'>

            <p className='text-center pb-2'>More Options</p>

            <div className='border-b border-t border-gray-300 py-2 text-gray-400'>
                <div className='p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group line-through'
                    onClick={() => {}}
                >
                    <Plus /> <span className='group-hover:text-teal-500'>Add Card</span>
                </div>
                <div className='p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group line-through'>
                    <RightArrow /> <span className='group-hover:text-teal-500'>Move List</span>
                </div>
                <div className='p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group line-through'>
                    <Copy /> <span className='group-hover:text-teal-500'>Copy List</span>
                </div>
                <div className='p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group line-through'>
                    <RightArrow /> <span className='group-hover:text-teal-500'>Move all cards in this list...</span>
                </div>
                <div className='p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group'
                    onClick={(e) => { e.stopPropagation(); setConfirmModalOpen(true) }}
                >
                    <Delete /> <span className='group-hover:text-teal-500'>Archive list</span>
                </div>
            </div>

            <div className='p-1.5 mt-1 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group line-through'>
                <EyeOpen /> <span className='group-hover:text-teal-500'>Follow</span>
            </div>


            {
                // confirm dialog open for delete operation...
                confirmModalOpen &&
                <ConfirmDialog
                    listID={boardListID}
                    setConfirmModalOpen={setConfirmModalOpen}
                    setBoardListSettingDropDownToggle={setBoardListSettingDropDownToggle}
                />
            }
        </div>
    )
}

export default BoardListSettingDropDown