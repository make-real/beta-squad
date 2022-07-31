import { DotsSingle, Plus, RightOK, Smile, UserPlus } from '../../assets/icons';
import { CardModal, CardSettingDropDown } from '.';
import { useEffect, useRef, useState } from 'react'
import CardChip from './CardChip';


// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const Card = ({ card, listID }) => {

    const dropDownRef = useRef();
    const [cardSettingDropDownToggle, setCardSettingDropDownToggle] = useState(false);
    const [visible, setVisible] = useState(false);
    const [boardModal, setBoardModal] = useState(false);
    const [noteDone, setNoteDone] = useState(false);



    const handleClick = e => {
        // track out-side of click... & close setting drop down div...
        if (!dropDownRef?.current?.contains(e.target)) setCardSettingDropDownToggle(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);


    return (

        <div
            ref={dropDownRef}
            onClick={() => setBoardModal(true)}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className='relative w-[275px] bg-white px-3 py-3 rounded-md border-t-4 border-teal-600 cursor-grab hover:bg-gray-200'>

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

            <p className='text-lg mr-4 text-gray-800'>{card.name}</p>


            {/* For Tag's / Card Chip's */}
            <div className='p-1 text-white flex gap-2'>
                <CardChip tag='Done' bgColor='bg-green-500'/>
                <CardChip tag='Warning' bgColor='bg-orange-500'/>
                <CardChip tag='Active' bgColor='bg-red-500'/>
            </div>

            {
                // For 3 Dots, Menu toggling...
                visible &&
                <div onClick={(e) => { e.stopPropagation(); setCardSettingDropDownToggle(pre => !pre) }}>
                    <DotsSingle className={`absolute top-4 right-1 cursor-pointer py-1.5 w-6 h-8 rounded-lg  hover:bg-gray-300 duration-200 text-gray-400 active:bg-gray-300 ${cardSettingDropDownToggle ? 'bg-gray-300' : ''}`} />
                </div>
            }

            {
                // Toggling menu display 
                cardSettingDropDownToggle &&
                <CardSettingDropDown
                    right={true}
                    cardID={card.id}
                    listID={listID}
                    noteDone={noteDone}
                    setNoteDone={setNoteDone}
                    setModalActionToggling={setCardSettingDropDownToggle}
                />
            }


            <div className='absolute bottom-4 right-6 flex items-center text-gray-400 p-1.5 rounded-md cursor-pointer hover:bg-gray-300 duration-200'>
                <Plus width="12" height="12" className='mr-[2px]' />
                <Smile />
            </div>




            {
                // When Task Click >>> then Modal Open
                boardModal &&
                <CardModal
                    setBoardModal={setBoardModal}
                    noteDone={noteDone}
                    setNoteDone={setNoteDone}
                />
            }

        </div>
    )
}

export default Card