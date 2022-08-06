import { workspaceCreation } from '../../hooks/useFetch';
import { Close } from '../../assets/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


const ModalWorkSpaceCreate = ({ setNewWorkShop }) => {

    const [workSpaceName, setWorkSpaceName] = useState('');


    // work space create...
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // its a POST method | object send into backend/server
            const { data } = await workspaceCreation({ name: workSpaceName });

            // display a success notification for user...
            toast.success(`${data?.workspace?.name} : work space create successfully`, { autoClose: 3000 });
            // {
            //     "workspace": {
            //         "_id": "62dd4e9e4cd94215aec5d19f",
            //         "name": "WorkSpace 1",
            //         "initialSpaceId": "62dd4e9e4cd94215aec5d1a2"
            //     }
            // }
        } catch (error) {
            // display error notification for developers...
            console.log(error?.response?.data?.issue);

            // display error notification for users...
            toast.error(error?.response?.data?.issue?.name, { autoClose: 3000 });
            toast.error(error?.response?.data?.issue?.message, { autoClose: 3000 });
        }

        // after submit data... auto close this Modal UI...
        setNewWorkShop(false)
    }



    
    useEffect(() => {
        // {
        //     "workspaces": [
        //         {
        //             "_id": "62ec297e4cd94215aec5d45f",
        //             "name": "We",
        //             "createdAt": "2022-08-04T20:18:06.372Z",
        //             "updatedAt": "2022-08-04T20:18:06.372Z",
        //             "__v": 0
        //         },
        //         {
        //             "_id": "62ec27664cd94215aec5d436",
        //             "name": "Demo WS",
        //             "createdAt": "2022-08-04T20:09:10.213Z",
        //             "updatedAt": "2022-08-04T20:09:10.213Z",
        //             "__v": 0
        //         }
        //     ]
        // }

    }, [workSpaceName])



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

export default ModalWorkSpaceCreate