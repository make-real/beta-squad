import { useBoardCardContext } from '../../context/BoardCardContext';
import { useStyleContext } from '../../context/StyleContext';
import { addBoardList, getBoardLists } from '../../hooks/useFetch';
import { AddBtn, BoardList } from '.';
import { toast } from 'react-toastify';


const Board = ({ selectedSpaceId }) => {

    const { margin } = useStyleContext();
    const { boardLists } = useBoardCardContext();


    // const { data, loading, error } = getBoardLists(selectedSpaceId);
    const { data, loading, error } = getBoardLists(selectedSpaceId);

    

    // add list inside board...
    const handleBoardListCreation = async (selectedSpaceId, text) => {

        const listObject = { name: text }

        try {
            const { data } = await addBoardList(selectedSpaceId, listObject);

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
        <section className={`${margin ? 'ml-[325px]' : 'ml-[50px]'} 
        pt-[85px] duration-200 px-4 flex gap-3 items-start flex-wrap h-[98vh]`}>

            {
                // all board list print at UI by this loop...
                data?.lists?.map((boardList, i) => <BoardList key={i} boardList={boardList} />)
            }


            {/*  + Add a list | Button UI */}
            <AddBtn
                placeHolder='Add list name...'
                btnText='list'
                onSubmit={text => handleBoardListCreation(selectedSpaceId, text)}
            />

        </section>
    )
}

export default Board