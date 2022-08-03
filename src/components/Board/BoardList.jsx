import { useBoardCardContext } from '../../context/BoardCardContext';
import { AddBtn, Card, BoardListSettingDropDown } from '.';
import { useEffect, useRef, useState } from 'react';
import { DotsSingle } from '../../assets/icons';



// This <Component /> called by 🟨🟨🟨 Board.jsx 🟨🟨🟨
const BoardList = ({ boardList }) => {

    const dropDownRef = useRef();
    const { addCard } = useBoardCardContext();
    const [boardListSettingDropDownToggle, setBoardListSettingDropDownToggle] = useState(false);


    const handleClick = e => {
        // track out-side of click... & close setting drop down div...
        if (!dropDownRef?.current?.contains(e.target)) setBoardListSettingDropDownToggle(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);



    return (
        // ${boardList.cards.length  >= 4  ? 'h-full' : 'h-fit'}

        <div className={`h-full rounded-lg mb-2 mr-3 flex flex-col`}>

            {/* Board List Header + Its needful drop down settings */}
            <div className='bg-gray-100 relative flex items-center justify-between p-4 rounded-t-lg' ref={dropDownRef}>
                <p className='text-gray-500 text-lg'>{boardList?.name || 'New List'} - {boardList?.cards.length}</p>
                <DotsSingle
                    className='text-gray-500 cursor-grab w-8 h-8 p-2 rounded-lg hover:bg-gray-200 duration-200'
                    onClick={() => setBoardListSettingDropDownToggle(true)}
                />

                {
                    // List drop down settings...
                    boardListSettingDropDownToggle &&
                    <BoardListSettingDropDown
                        boardListID={boardList.id}
                        setBoardListSettingDropDownToggle={setBoardListSettingDropDownToggle}
                    />
                }
            </div>


            <div className='bg-gray-100 px-3 pb-4 flex flex-col items-center gap-3 overflow-y-auto customScroll'>
                {
                    // all card's inside a list, are printed at UI by this loop...
                    boardList.cards.map(card => <Card key={card.id} card={card} listID={boardList.id} />)
                }
            </div>


            <AddBtn
                placeHolder='Add card name...'
                btnText='card'
                onSubmit={cardName => addCard(cardName, boardList.id)}
            />

        </div>
    )
}

export default BoardList