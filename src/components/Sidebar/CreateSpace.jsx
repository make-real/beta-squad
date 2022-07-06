import { useState } from 'react';
import { RightOK } from '../../assets/icons';
import Close from '../../assets/icons/svg/Close';
import { useStyleContext } from '../../context/StyleContext';


const CreateSpace = ({ setCreateSpace }) => {

    const { setThemeColor } = useStyleContext()
    const [clickColorBox, setClickColorBox] = useState(false);
    const [colorBoxIndex, setColorBoxIndex] = useState(0);
    
    const [boxColor] = useState([
        'bg-blue-600',
        'bg-sky-400',
        'bg-yellow-400',
        'bg-red-500',
        'bg-pink-400',
        'bg-green-500',
        'bg-sky-300',
        'bg-blue-800',
        'bg-pink-600'
    ]);



    return (
        <section className='fixed top-0 right-0 left-0 bottom-0 bg-black/30 grid place-items-center'>

            <div className='relative w-[670px] h-[520px] bg-white rounded-xl shadow-2xl p-3 '>

                {/* 🟨🟨🟨 UI For Close Button */}
                <div
                    className='absolute top-2 right-2 w-8 h-8 rounded-lg hover:bg-gray-200 grid place-items-center cursor-pointer duration-200'
                    onClick={() => setCreateSpace(false)}
                >
                    <Close width="14" height="14" className='text-gray-400' />
                </div>



                <div className='p-5 py-7 text-gray-600'>

                    <p className='text-sm text-fuchsia-700 font-bold'>CREATE SPACE</p>
                    <div className='my-3 text-sm'>
                        <label htmlFor="name">Space name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder='Add space name...'
                            className='w-full border border-gray-200 rounded-xl px-2 py-1 outline-none mt-1 focus:border-blue-300 duration-200'
                        />
                    </div>


                    <div className='p-3 text-gray-400 text-sm hover:bg-gray-100 hover:text-fuchsia-600 duration-200 rounded-lg w-fit cursor-pointer'>
                        Add purpose
                    </div>


                    <div className='my-2 text-sm'>
                        <p>Space color</p>

                        <div className='relative px-3 py-2 flex gap-3 items-center justify-between h-12 mt-2 w-3/4'>
                            {
                                boxColor.map((box, i) => (
                                    colorBoxIndex === i
                                        ? (
                                            <div
                                                key={box}
                                                // onClick={() => {   }}
                                                className={`${clickColorBox ? 'w-12 h-12' : 'w-7 h-7'} rounded-full cursor-pointer ${box}`}>
                                                <div className={`${clickColorBox ? 'grid' : 'hidden'} place-items-center w-full h-full text-white`}>
                                                    <RightOK />
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div
                                                key={box}
                                                onClick={() => { setClickColorBox(true); setColorBoxIndex(i); setThemeColor(box) }}
                                                className={`w-7 h-7 rounded-full cursor-pointer ${box}`}>
                                            </div>
                                        )
                                ))
                            }

                        </div>
                    </div>


                    <div className='my-2 text-sm'>
                        <p>Space privacy</p>

                        <form className='px-3 py-3' >
                            <div className='flex items-center gap-3 mb-1'>
                                <input
                                    type="radio"
                                    id="public"
                                    value="public"
                                    name="spacePrivacy"
                                    className='cursor-pointer w-5 h-5'
                                />
                                <label htmlFor="public" className='cursor-pointer'>Public to team</label>
                            </div>
                            <p className='pl-3 text-gray-400'>Space is visible to members of your team. Only people added to the space can edit it.</p>

                            <div className='flex items-center gap-3 mb-1 mt-4'>
                                <input
                                    type="radio"
                                    id="private"
                                    value="private"
                                    name="spacePrivacy"
                                    className='cursor-pointer w-5 h-5'
                                />
                                <label htmlFor="private" className='cursor-pointer'>Private</label>
                            </div>

                            <p className='pl-3 text-gray-400'>Space is private. Only people added to the space can view it and edit.</p>
                        
                            <div className='flex gap-2 items-center justify-end mt-5'>
                                <button className='px-4 py-2 bg-gray-200 rounded-lg text-gray-400' onClick={() => setCreateSpace(false)}>Cancel</button>
                                <button className='px-4 py-2 bg-fuchsia-600 rounded-lg text-gray-200'>Create Space</button>
                            </div>
                            
                        </form>

                    </div>

                </div>
            </div>
        </section >
    )
}

export default CreateSpace



// before:absolute
// before:left-[-25px]
// before:top-[-1px]
// before:w-5
// before:h-5
// before:rounded-full
// before:border-2
// before:border-gray-400
// before:label-checked:bg-red-600