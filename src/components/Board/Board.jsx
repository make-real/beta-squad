import { Copy, Delete, DotsSingle, EyeOpen, Plus, RightArrow } from '../../assets/icons';
import { useStyleContext } from '../../context/StyleContext';
import { useState } from 'react';
import AddBtn from './AddBtn';
import CardBox from './CardBox';


const Board = () => {

    const { margin } = useStyleContext();
    const [insideCardListGet, setInsideCardListGet] = useState(0);
    const [cartOptionsToggle, setCartOptionsToggle] = useState(false);


    const [addListName, setAddListName] = useState('');

    const [addListNames, setAddListNames] = useState({
        name: '',
        cards: [],
    });
    const [addTaskItem, setAddTaskItem] = useState({
        name: '',
        progress: '',
        tags: [],
    });
    const [totalTaskList, setTotalTaskList] = useState([])

    // console.log(addTaskItem);
    // console.log(totalTaskList);


    const handleAddTaskItem = (e) => {
        setAddTaskItem(pre => ({ ...pre, name: e.target.value }));
    }

    const handleAddList = () => {
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

            <AddBtn onSubmit={text => console.log(text)} />



            <CardBox />

        </section >
    )
}

export default Board