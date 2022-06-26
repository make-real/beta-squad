import { useStyleContext } from '../context/StyleContext';


const Board = () => {

    const { margin } = useStyleContext();

    return (
        <section className={`${margin ? 'ml-[325px]' : 'ml-[50px]'} pt-[90px] duration-200 px-2`}>
            Board
        </section>
    )
}

export default Board