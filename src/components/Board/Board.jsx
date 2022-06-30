import { useStyleContext } from '../../context/StyleContext';
import { Copy, Delete, DotsSingle, EyeOpen, Plus, RightArrow } from '../../assets/icons';
import { useState } from 'react';
import BoardModal from './BoardModal';


const Board = () => {

    const { margin } = useStyleContext();
    const [inputListToggle, setInputListToggle] = useState(false);
    const [insideCardListGet, setInsideCardListGet] = useState(0);
    const [cartOptionsToggle, setCartOptionsToggle] = useState(false);
    const [boardModal, setBoardModal] = useState(false)
    const [addListName, setAddListName] = useState('');
    const [addListNames, setAddListNames] = useState([]);



    const handleAddList = () => {
        setInputListToggle(pre => !pre)
        setAddListNames(pre => [...pre, addListName]);
        setAddListName('');
    }

    const handleRemoveFromListName = (listNumber) => {
        setAddListNames(pre => pre.filter((item, i) => i !== listNumber))
        setCartOptionsToggle(false);
    }

    const handleInsideCardList = () => {
        setInsideCardListGet(-1);
        setInputListToggle(false)
    }

    const handleAddListName = (e) => {
        setAddListName(e.target.value)
    }



    const CartSettingOptions = ({ listNumber }) => (
        <div className='absolute top-[60px] left-[115px] w-[280px] p-3 rounded-lg shadow-2xl z-20 bg-white
                            before:content-[""] before:w-8 before:h-8 before:bg-white before:absolute before:top-[-8px] before:left-[50%] before:translate-x-[-50%] before:rotate-45 before:z-[-10]'>

            <p className='text-center pb-2'>More Options</p>

            <div className='border-b border-t border-gray-300 py-2 text-gray-400'>
                <p className='p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group'>
                    <Plus /> <span className='group-hover:text-teal-500'>Add Card</span>
                </p>
                <p className='p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group'>
                    <RightArrow /> <span className='group-hover:text-teal-500'>Move List</span>
                </p>
                <p className='p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group'>
                    <Copy /> <span className='group-hover:text-teal-500'>Copy List</span>
                </p>
                <p className='p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group'>
                    <RightArrow /> <span className='group-hover:text-teal-500'>Move all cards in this list...</span>
                </p>
                <p className='p-1.5 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group'
                    onClick={() => handleRemoveFromListName(listNumber)}
                >
                    <Delete /> <span className='group-hover:text-teal-500'>Archive list</span>
                </p>
            </div>
            <p className='p-1.5 mt-1 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg duration-200 group'>
                <EyeOpen /> <span className='group-hover:text-teal-500'>Follow</span>
            </p>
        </div>
    )



    return (
        <section className={`${margin ? 'ml-[325px]' : 'ml-[50px]'} pt-[90px] duration-200 px-4 flex gap-3 items-start flex-wrap`}>

            {
                // When Task Click >>> then Modal Open
                boardModal && <BoardModal setBoardModal={setBoardModal} />
            }



            {
                addListNames.length > 0 &&
                addListNames.map((list, i) => (
                    <div className='bg-gray-100 w-72 h-64 rounded-lg mb-2 mr-3 flex flex-col justify-between' key={i}>

                        <div className='flex items-center justify-between p-4 relative'>
                            <p className='text-gray-500 text-lg'>{list || 'New List'}</p>
                            <DotsSingle
                                className='text-gray-500 cursor-grab w-8 h-8 p-2 rounded-lg hover:bg-gray-200 duration-200'
                                onClick={() => { setInsideCardListGet(i); setCartOptionsToggle(pre => !pre) }}
                            />

                            {/* 🟨🟨🟨 Task Important Action List 🟨🟨🟨 */}
                            {(insideCardListGet === i && cartOptionsToggle) && <CartSettingOptions listNumber={i} />}

                        </div>

                        {
                            insideCardListGet === i
                                ? (
                                    <div className='px-2 pb-3'>
                                        <form className='w-full p-1 '>

                                            <textarea
                                                value={addListName}
                                                placeholder='Add list name'
                                                onChange={handleAddListName}
                                                rows='3' className='p-3 w-full rounded-lg outline-none border border-t-4 border-teal-400 focus:'
                                            />

                                            <div className='flex justify-end gap-2 mt-3'>
                                                <button type="button" onClick={handleInsideCardList} className='px-2 py-2 duration-200 hover:bg-gray-200 hover:text-red-500 rounded-xl'>
                                                    Cancel
                                                </button>
                                                <button type="button" onClick={() => handleAddList()} className='px-3 py-1 duration-200 text-white bg-teal-500 hover:text-white rounded-xl'>
                                                    Add Card
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )
                                : (
                                    <div className='flex items-center space-x-3 px-3 py-2 hover:bg-gray-200 duration-200 rounded-lg cursor-pointer'
                                        onClick={() => setInsideCardListGet(i)}>
                                        <Plus className='text-gray-200 bg-gray-400 p-1 rounded-full' />
                                        <p className='text-gray-500 text-lg'>Add a card...</p>
                                    </div>
                                )
                        }
                    </div>
                ))
            }




            {/*  + Add a list  |  UI */}
            <div className='w-72 px-3 py-2 rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300'>
                {
                    inputListToggle
                        ? (
                            // <InputAddIntoList setInputListToggle={setInputListToggle} />
                            <form className='w-full p-1'>
                                <textarea
                                    value={addListName}
                                    placeholder='Add list name'
                                    onChange={handleAddListName}
                                    rows='3' className='p-3 w-full rounded-lg outline-none focus:'
                                />
                                <div className='flex justify-end gap-2 mt-3'>
                                    <button type="button" onClick={handleInsideCardList}
                                        className='px-2 py-2 duration-200 hover:bg-gray-200 hover:text-red-500 rounded-xl'>
                                        Cancel
                                    </button>
                                    <button type="button" onClick={() => handleAddList()}
                                        className='px-3 py-1 duration-200 text-white bg-teal-500 hover:text-white rounded-xl'>
                                        Add Card
                                    </button>
                                </div>
                            </form>
                        )
                        : (
                            <div className='flex items-center space-x-3' onClick={() => setInputListToggle(true)}>
                                <Plus className='text-gray-500' /> <p className='text-gray-500 text-lg'>Add a list</p>
                            </div>
                        )
                }
            </div>
            <div className='p-4 bg-gray-500 rounded-md text-white capitalize cursor-pointer' onClick={() => setBoardModal(true)}>
                temporary button
            </div>
        </section >
    )
}

export default Board