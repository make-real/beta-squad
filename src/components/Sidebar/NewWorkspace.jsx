import { useState } from 'react'
import { Close } from '../../assets/icons'
import { workspaceCreation } from '../../hooks/useFetch';


const NewWorkspace = ({ setNewWorkShop }) => {

    const [workSpaceName, setWorkSpaceName] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await workspaceCreation(workSpaceName);
            console.log(data);
            console.log(workSpaceName);

            // {
            //     "workspace": {
            //         "_id": "62dd4e9e4cd94215aec5d19f",
            //         "name": "WorkSpace 1",
            //         "initialSpaceId": "62dd4e9e4cd94215aec5d1a2"
            //     }
            // }
        } catch (error) {
            console.log(error);
        }

        setNewWorkShop(false)
    }

    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 z-30 bg-black/50 grid place-items-center'>

            <div className='relative bg-white w-[620px] h-[300px] rounded-2xl p-3 '>

                <div
                    onClick={() => setNewWorkShop(false)}
                    className='absolute top-2 right-2 w-8 h-8 rounded-lg hover:bg-gray-200 grid place-items-center cursor-pointer duration-200'
                >
                    <Close width="14" height="14" className='text-gray-400' />
                </div>


                <h1 className='text-center mt-6 text-2xl font-bold text-sky-700'>Set up your new workspace</h1>

                <p className='px-3 text-sm text-gray-500 py-4'>Add your workspace name. For most people this is the name of their company. You can always change it later.</p>

                <form className='text-sm px-3 space-y-2' onSubmit={handleSubmit}>
                    <label htmlFor="name">Workspace name:</label>
                    <input
                        required
                        type="text"
                        placeholder='Company name'
                        onChange={e => setWorkSpaceName(e.target.value)}
                        className='w-full border border-gray-200 focus:border-blue-300 duration-200 rounded-lg px-2 py-1 outline-none'
                    />

                    <div className='text-right pt-2'>
                        <button type='submit' className='px-4 py-2 rounded-lg bg-fuchsia-500 text-gray-200 hover:bg-fuchsia-600 duration-200'>Continue to invitations</button>
                    </div>
                </form>

            </div>
        </section>
    )
}

export default NewWorkspace