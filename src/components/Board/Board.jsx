import { useStyleContext } from '../../context/StyleContext';
import { addBoardList } from '../../hooks/useFetch';
import { AddBtn, BoardList } from '.';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useAxios from '../../api/index';


const Board = ({ selectedSpaceId }) => {

    const { margin } = useStyleContext();
    const [allLists, setAllLists] = useState([]);
    console.log(allLists);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // GET Method ==> (Board) List --- under specific Space reference ID
                const { data } = await useAxios.get(`/spaces/${selectedSpaceId}/board?getCards=true`);
                setAllLists(data.lists);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [selectedSpaceId]);



    // POST Method || add list inside board...
    const handleBoardListCreation = async (selectedSpaceId, text) => {

        const listObject = { name: text }

        try {
            // its a POST method | object send into backend/server
            const { data } = await addBoardList(selectedSpaceId, listObject);

            // update user UI...
            setAllLists(pre => [...pre, data.list]);

            // display a notification for user
            toast.success(`${data?.list?.name} - list create successfully`, { autoClose: 3000 });

        } catch (error) {
            // error for developer for deBugging...
            console.log(error.response.data);

            // error for user at notification...
            toast.error(error?.response?.data?.issue?.message, { autoClose: 3000 });
        }
    }



    return (
        <section className={`${margin ? 'ml-[325px]' : 'ml-[50px]'} duration-200 w-full overflow-x-auto customScroll`}>

            <div className='pt-[85px] px-4 flex gap-3 items-start  min-w-fit h-[98vh]'>
                {
                    // all board list print at UI by this loop...
                    allLists?.map((boardList, i) => <BoardList key={i} boardList={boardList} />)
                }


                {/*  + Add a list | Button UI */}
                <AddBtn
                    placeHolder='Add list name...'
                    btnText='list'
                    onSubmit={text => handleBoardListCreation(selectedSpaceId, text)}
                />
            </div>

        </section>
    )
}

export default Board