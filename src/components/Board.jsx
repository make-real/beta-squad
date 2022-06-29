import { Plus } from '../assets/icons';
import { useStyleContext } from '../context/StyleContext';


const Board = () => {

    const { margin } = useStyleContext();

    return (
        <section className={`${margin ? 'ml-[325px]' : 'ml-[50px]'} pt-[90px] duration-200 px-4`}>


            <div className='w-72 p-3 rounded-md bg-gray-200 cursor-pointer hover:bg-gray-300 flex items-center space-x-3'>
                <Plus className='text-gray-500'/> <p className='text-gray-500 text-lg'>Add a list</p>
            </div>

        </section>
    )
}

export default Board