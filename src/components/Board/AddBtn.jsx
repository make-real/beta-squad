import { useState } from 'react';
import { Plus } from '../../assets/icons';


const AddBtn = ({ onSubmit }) => {

    const [userInput, setUserInput] = useState('');
    const [inputToggle, setInputToggle] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        // value send into caller/Parent component...
        if (onSubmit) onSubmit(userInput);

        // Reset input field + Close User Input Window
        setUserInput('')
        setInputToggle(false)

    }

    return (
        <div className='w-72  rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300'>
            {
                inputToggle
                    ? (
                        <form className='w-full px-3 py-2' onSubmit={handleSubmit}>
                            <input
                                required
                                value={userInput}
                                placeholder='Add list name'
                                onChange={(e) => setUserInput(e.target.value)}
                                className='mt-1.5 px-3 py-2 w-full rounded-lg outline-none border border-transparent focus:border-blue-400'
                            />
                            <div className='flex justify-end gap-2 mt-3 mb-2'>
                                <button
                                    onClick={() => setInputToggle(false)}
                                    className='px-2 py-2 duration-200 hover:bg-gray-200 hover:text-red-500 rounded-xl select-none cursor-pointer'
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className='px-3 py-1 duration-200 text-white bg-teal-500 hover:text-white rounded-xl'
                                >
                                    Add Card
                                </button>
                            </div>
                        </form>
                    )
                    : (
                        <div
                            className='flex items-center space-x-3 px-3 py-2'
                            onClick={() => setInputToggle(true)}
                        >
                            <Plus className='text-gray-500' />
                            <p className='text-gray-500 text-lg'>Add a list</p>
                        </div>
                    )
            }
        </div >

    )
}

export default AddBtn