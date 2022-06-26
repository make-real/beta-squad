import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import { useStyleContext } from '../context/StyleContext';
import { month, oneDayTimes } from '../constant/data';
import { useEffect, useState } from 'react';
import AddCardMini from './AddCardMini';


const Calender = () => {

    const { margin } = useStyleContext();
    const [active, setActive] = useState('');
    const [addCard, setAddCard] = useState(false);

    const timeLine = ['Day', 'Week', 'Month', 'List'];

    useEffect(() => setActive(timeLine[2]), []);


    const addCardVisibility = () => {
        setAddCard(true)
    }


    return (
        <section className={`${margin ? 'ml-[325px]' : 'ml-[50px]'} pt-[90px] duration-200`}>

            {/* 🟨🟨🟨 Header Section 🟨🟨🟨 */}
            <div className='flex items-center justify-between text-gray-400 px-2'>

                <div className='calenderSection'>Today</div>

                <div className='flex items-center ml-32'>
                    <div className='arrowSymbol'><FaLessThan /></div>
                    <p className='calenderSection'>June 2022</p>
                    <div className='arrowSymbol'><FaGreaterThan /></div>
                </div>

                <div className='flex'>
                    {
                        timeLine.map(link =>
                            <p
                                key={link}
                                onClick={() => setActive(link)}
                                className={`calenderSection mr-1 ${(link === active) && 'bg-gray-100 text-teal-500'}`}
                            >
                                {link}
                            </p>
                        )
                    }
                </div>
            </div>



            {/* 🟨🟨🟨 Body Section 🟨🟨🟨 */}
            <div className='p-8'>

                <div className={`absolute top-42 right-8`}>
                    {
                        addCard && <AddCardMini setAddCard={setAddCard} />
                    }
                </div>



                {
                    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 
                    // Day Calender View ==> UI
                    active === 'Day' &&
                    <div className='flex'>
                        <div>
                            {
                                oneDayTimes.map(time =>
                                    <p key={time} className='w-24 h-10 border-t border-t-white text-gray-400 leading-10 '>
                                        {time}
                                    </p>
                                )
                            }
                        </div>
                        <div className='border-gray-300 border-r border-l border-b'>
                            {
                                oneDayTimes.map(time =>
                                    <p
                                        key={time}
                                        onClick={addCardVisibility}
                                        className='w-[92vw] h-10 bg-sky-50 border-t border-gray-300'
                                    ></p>
                                )
                            }
                        </div>
                    </div>
                }


                {
                    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 
                    // Week Calender View ==> UI
                    active === 'Week' &&
                    <div className='flex'>
                        <div className='mt-6'>
                            {
                                oneDayTimes.map(time =>
                                    <p key={time} className='w-24 h-10 border-t border-t-white text-gray-400 leading-10 '>
                                        {time}
                                    </p>
                                )
                            }
                        </div>

                        <div>
                            <div className='flex justify-around items-center'>
                                <p>19 Sun</p>
                                <p>20 Mon</p>
                                <p>21 Tue</p>
                                <p>22 Wed</p>
                                <p>23 Thu</p>
                                <p>24 Fri</p>
                                <p>25 Sat</p>
                            </div>
                            {
                                oneDayTimes.map(time =>
                                    <div
                                        key={time}
                                        onClick={addCardVisibility}
                                        className='w-[92vw] h-10 border-t flex justify-evenly items-center'
                                    >
                                        <p className='border-l border-r border-b w-full h-full border-gray-300'></p>
                                        <p className='border-l border-r border-b w-full h-full border-gray-300'></p>
                                        <p className='border-l border-r border-b w-full h-full border-gray-300'></p>
                                        <p className='border-l border-r border-b w-full h-full border-gray-300'></p>
                                        <p className='border-l border-r border-b w-full h-full border-gray-300'></p>
                                        <p className='border-l border-r border-b w-full h-full border-gray-300'></p>
                                        <p className='border-l border-r border-b w-full h-full border-gray-300'></p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                }



                {
                    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 
                    // Month Calender View ==> UI
                    <div className={`${active !== 'Month' && 'hidden'} grid grid-cols-7 grid-rows-5 gap-px bg-gray-200 border border-gray-200 h-[800px] overflow-y-auto`}>
                        {
                            month.map(day => (
                                <div
                                    key={day}
                                    onClick={addCardVisibility}
                                    className="bg-white pt-2 pl-2 hover:bg-gray-200 duration-200"
                                >
                                    {day}
                                </div>
                            ))
                        }
                    </div>
                }



                {
                    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 
                    // List View ==> UI
                    active === 'List' &&
                    <div className='bg-gray-100 w-full h-[80vh]'>
                        <div className='p-4 text-center bg-white'>
                            <h2 className='text-2xl font-bold'>Hmm… no events in this time <br /> period.</h2>
                            <p className='w-96 mx-auto text-sm pt-3'>It seems there is nothing scheduled for this time. Change the timeframe or simply create some cards.</p>
                        </div>
                    </div>
                }

            </div>

        </section>
    )
}

export default Calender