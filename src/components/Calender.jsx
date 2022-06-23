import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import { useState } from 'react';
import AddCardMini from './AddCardMini';



const Calender = () => {

    const [active, setActive] = useState('');
    const [addCard, setAddCard] = useState(false);


    const oneDayTimes = [
        '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM',
    ]

    const month = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    ]


    const addCardVisibility = () => {
        setAddCard(true);

        // setAddCard(false);

        // setAddCard(true);
    }

    return (
        <section className=''>

            {/* 🟨🟨🟨 Header Section 🟨🟨🟨 */}
            <div className='flex items-center justify-between text-gray-400 p-4'>

                <div className='calenderSection'>Today</div>

                <div className='flex items-center ml-32'>
                    <div className='arrowSymbol'><FaLessThan /></div>
                    <p className='calenderSection'>June 2022</p>
                    <div className='arrowSymbol'><FaGreaterThan /></div>
                </div>

                <div className='flex'>
                    {
                        ['Day', 'Week', 'Month', 'List'].map(link =>
                            <p
                                key={link}
                                onClick={() => setActive(link)}
                                className={`calenderSection mr-1 ${link === active && 'bg-gray-100 text-teal-500'}`}
                            >
                                {link}
                            </p>
                        )
                    }
                </div>
            </div>



            {/* 🟨🟨🟨 Body Section 🟨🟨🟨 */}
            <div className='p-8 '>

                <div className='fixed t-16 right-16'>
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
                                    <p key={time} className='w-[92vw] h-10 bg-sky-50 border-t border-gray-300 '></p>
                                )
                            }
                        </div>
                    </div>
                }



                {
                    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 
                    // Month Calender View ==> UI
                    active === 'Month' &&
                    <div className="grid grid-cols-7 grid-rows-5 gap-px bg-gray-200 border border-gray-200 h-[800px] overflow-y-auto">
                        {
                            month.map(day => (
                                <div
                                    key={day}
                                    className="bg-white pt-2 pl-2 hover:bg-gray-200 duration-200"
                                    onClick={addCardVisibility}
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
                    <div className='bg-gray-100 w-full h-[780vh]'>
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