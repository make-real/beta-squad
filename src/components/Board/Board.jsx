import { useBoardCardContext } from '../../context/BoardCardContext';
import { useStyleContext } from '../../context/StyleContext';
import { AddBtn, BoardList } from '.';


const Board = () => {

    const { margin } = useStyleContext();
    const { boardLists, addBoardList } = useBoardCardContext();


    return (
        <section className={`${margin ? 'ml-[325px]' : 'ml-[50px]'} pt-[90px] duration-200 px-4 flex gap-3 items-start flex-wrap h-screen`}>

            {
                // all board list print at UI by this loop...
                boardLists.map((boardList, i) => <BoardList key={i} boardList={boardList} />)
            }


            {/*  + Add a list | Button UI */}
            <AddBtn
                placeHolder='Add list name...'
                btnText='list'
                onSubmit={text => addBoardList(text)}
            />

        </section>
    )
}

export default Board