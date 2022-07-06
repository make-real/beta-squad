import { Copy, Delete, DotsSingle, EyeOpen, Plus, RightArrow, RightOK, Smile, UserPlus } from '../../assets/icons';
import { useStyleContext } from '../../context/StyleContext';
import { useState } from 'react';
import BoardActionDropDown from './BoardActionDropDown';
import BoardModal from './BoardModal';


const Board = () => {

    const { margin } = useStyleContext();
    const [inputListToggle, setInputListToggle] = useState(false);
    const [insideCardListGet, setInsideCardListGet] = useState(0);
    const [cartOptionsToggle, setCartOptionsToggle] = useState(false);
    const [modalActionToggling, setModalActionToggling] = useState(false);
    const [visible, setVisible] = useState(false);
    const [noteDone, setNoteDone] = useState(false);
    const [boardModal, setBoardModal] = useState(false);

    const [addListName, setAddListName] = useState('');

    const [addListNames, setAddListNames] = useState({
        name: '',
        cards: [  ],
    });
    const [addTaskItem, setAddTaskItem] = useState({
        name: '',
        progress: '',
        tags: [],
    });
    const [totalTaskList, setTotalTaskList] = useState([])

    // console.log(addTaskItem);
    // console.log(totalTaskList);

    // user 1st input
    const handleAddListNameInput = (e) => {
        setAddListName(e.target.value)
    }

    const handleAddTaskItem = (e) => {
        setAddTaskItem(pre => ({ ...pre, name: e.target.value }));
    }

    const handleAddList = () => {
        setInputListToggle(pre => !pre)
        setAddListNames(pre => ({ ...pre, name: addListName }));
        setAddListNames(pre => ({ ...pre, cards: [...pre.cards, addTaskItem] }));
        setTotalTaskList(pre => [...pre, addListNames]);

        setAddListName('');
        setAddTaskItem(pre => ({ ...pre, name: '' }))

    }

    // delete form card
    const handleRemoveFromListName = (listNumber) => {
        setTotalTaskList(pre => pre.filter((item, i) => i !== listNumber))
        setCartOptionsToggle(false);
    }

    const handleInsideCardList = () => {
        setInsideCardListGet(-1);
        setInputListToggle(false)
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
        <section className={`${margin ? 'ml-[325px]' : 'ml-[50px]'} pt-[90px] duration-200 px-4 flex gap-3 items-start flex-wrap h-screen`}>

            {
                // When Task Click >>> then Modal Open
                boardModal && <BoardModal setBoardModal={setBoardModal} noteDone={noteDone}
                    setNoteDone={setNoteDone} />
            }


            {
                // addListNames.length > 0 &&
                totalTaskList.map((list, i) => (
                    <div className='bg-gray-100 w-72 h-64 rounded-lg mb-2 mr-3 flex flex-col justify-between' key={i}>

                        <div className='relative flex items-center justify-between p-4'>
                            <p className='text-gray-500 text-lg'>{list.name || 'New List'}</p>
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
                                                value={addTaskItem.name}
                                                placeholder='Add list name'
                                                onChange={handleAddTaskItem}
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
                                    onChange={handleAddListNameInput}
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
            </div>


        </section >
    )
}

export default Board