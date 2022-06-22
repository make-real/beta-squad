import { HiOutlineUserAdd } from 'react-icons/hi';
import { RiAddCircleFill } from 'react-icons/ri';
import { useState } from 'react'
import { AddCard } from '.';

const List = () => {

    const [addCard, setAddCard] = useState(false);

    return (
        <section className='p-3 bg-gray-50 h-[90vh] overflow-y-scroll'>

            <table className='w-full text-left '>

                <thead className='sticky top-0'>
                    <tr className='bg-white p-8 text-gray-400 font-normal'>
                        <th className='px-4 py-4'>Card Name</th>
                        <th className='px-4 py-4'>Assign</th>
                        <th className='px-4 py-4'>Date</th>
                        <th className='px-4 py-4'>Progress</th>
                        <th className='px-4 py-4'>List</th>
                        <th className='px-4 py-4'>Tags</th>
                    </tr>
                </thead>

                <tbody className='max-h-96 overflow-scroll bg-gray-200/50'>
                    <tr className='bg-sky-50'>
                        <td className='m-1 px-4 py-4  cursor-pointer hover:bg-gray-300 duration-200'>chat</td>
                        <td className='px-4 py-4'><HiOutlineUserAdd /></td>
                        <td className='px-4 py-4'>Set Dates</td>
                        <td className='px-4 py-4'>25%</td>
                        <td className='px-4 py-4'>Alex</td>
                        <td className='px-4 py-4'>Add a Tag</td>
                    </tr>
                    <tr className=''>
                        <td className='px-4 py-4'>list add </td>
                        <td className='px-4 py-4'><HiOutlineUserAdd /></td>
                        <td className='px-4 py-4'>Set Dates</td>
                        <td className='px-4 py-4'>25%</td>
                        <td className='px-4 py-4'>Alex</td>
                        <td className='px-4 py-4'>Add a Tag</td>
                    </tr>
                    <tr className='bg-sky-50'>
                        <td className='px-4 py-4'>taiseen azam</td>
                        <td className='px-4 py-4'><HiOutlineUserAdd /></td>
                        <td className='px-4 py-4'>Set Dates</td>
                        <td className='px-4 py-4'>25%</td>
                        <td className='px-4 py-4'>Alex jon</td>
                        <td className='px-4 py-4'>Add a Tag</td>
                    </tr>
                </tbody>
            </table>




            {/* 🟨🟨🟨 Position Fixed at the bottom */}
            <div className='fixed bottom-0 left-0 w-full p-4 bg-gray-100'>

                <div onClick={() => setAddCard(true)}
                    className='flex gap-3 items-center border border-dashed border-black p-3 rounded bg-white text-gray-500 cursor-pointer duration-300 hover:bg-gray-200'
                >
                    <RiAddCircleFill className='text-2xl' />
                    <h1>ADD A CARD</h1>
                </div>

                {
                    addCard && <AddCard setAddCard={setAddCard} />
                }
            </div>

        </section>
    )
}

export default List