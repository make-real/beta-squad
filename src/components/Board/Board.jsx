import { addNewList, getAllList } from '../../store/slice/boardListsCards';
import { useStyleContext } from '../../context/StyleContext';
import { useDispatch, useSelector } from "react-redux";
import { addBoardList } from '../../hooks/useFetch';
import { AddBtn, BoardList } from '.';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import useAxios from '../../api/index';



const Board = ({ selectedSpaceId }) => {


    // Redux Store | Read + Write Operation For Board Section
    const allList = useSelector(state => state.boardListsCards.allList);
    const dispatch = useDispatch();


    // Globally Left side margin maintain
    const { margin } = useStyleContext();


    useEffect(() => {
        const fetchData = async () => {
            try {

                // GET Method ==> for all Board List --- under specific Space reference ID
                const { data } = await useAxios.get(`/spaces/${selectedSpaceId}/board?getCards=true`);

                // update Redux Store for UI 
                dispatch(getAllList(data.lists));

            } catch (error) {
                console.log(error?.response?.data?.issue);
            }
        }
        fetchData();
    }, [selectedSpaceId]);



    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
    // POST Method ➕ add list inside board...
    const handleBoardListCreation = async (selectedSpaceId, text) => {

        const listObject = { name: text }

        try {
            // its a POST method | object send into backend/server
            const { data } = await addBoardList(selectedSpaceId, listObject);

            // update user UI... by Redux Store
            dispatch(addNewList(data.list))

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
                    allList?.map((boardList, i) => <BoardList key={i} boardList={boardList} />)
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