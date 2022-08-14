import { Copy, Delete, LinkingChain, RightOK } from '../../assets/icons'
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';


// This <Component /> called by 🟨🟨🟨 Card.jsx 🟨🟨🟨
const CardSettingDropDown = ({ right, noteDone, setNoteDone, setCardSettingDropDownToggle, cardID, listID, cardModal }) => {


    const [confirmModalOpen, setConfirmModalOpen] = useState(false);


    // if cardModal Open by user click, then hide this Card-Setting-DropDown-Toggle window 
    if (cardModal === true) setCardSettingDropDownToggle(false);


    return (
        <div
            onClick={e => { e.stopPropagation(); setCardSettingDropDownToggle(false) }}
            className={`w-[210px] absolute top-[65px]
            ${right ? 'right-[-5px]' : 'right-1'} 
            bg-white p-2 rounded-lg shadow-xl z-30 
            after:content-[""] 
            after:w-8 
            after:h-8 
            after:bg-white 
            after:absolute 
            after:rotate-45 
            after:z-[-10]
            after:top-[-10px] 
            ${right ? 'after:right-[4%] after:translate-x-[8%] ' : 'after:right-[38px]'} `}
        >

            <div className='boardActionDropDown group line-through relative'>
                <Copy className='group-hover:text-teal-500' /> <span>Copy Card</span>
            </div>

            <div className='boardActionDropDown group line-through'>
                <LinkingChain className='group-hover:text-teal-500' /> <span>Copy Card link</span>
            </div>

            <div className='boardActionDropDown group' onClick={(e) => {
                e.stopPropagation();
                setNoteDone(pre => !pre);
                setCardSettingDropDownToggle(false)
            }}>
                <RightOK className='group-hover:text-teal-500' /> <span>Make as {noteDone ? 'not' : ''} done</span>
            </div>

            <div
                className='boardActionDropDown group'
                onClick={(e) => { e.stopPropagation(); setConfirmModalOpen(true) }}
            >
                <Delete className='group-hover:text-teal-500' /> <span>Archive Card</span>
            </div>

            {
                // confirm dialog open for delete operation...
                confirmModalOpen &&
                <ConfirmDialog
                    listID={listID}
                    cardID={cardID}
                    setConfirmModalOpen={setConfirmModalOpen}
                    setCardSettingDropDownToggle={setCardSettingDropDownToggle}
                />
            }
        </div>
    )
}

export default CardSettingDropDown