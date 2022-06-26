import { RiAddCircleFill } from "react-icons/ri";
import { useState } from "react";
import { AddCard } from ".";


const AddCardButton = ({ margin }) => {

    const [addCard, setAddCard] = useState(false);

    return (
        <div className={`${margin ? 'ml-[310px] w-[83.3%]' : 'ml-[35px] w-[97.7%]'} fixed bottom-0 p-4 bg-gray-200 duration-200`}>
            <div
                onClick={() => setAddCard(true)}
                className="flex gap-3 items-center border border-dashed border-black p-3 rounded bg-white text-gray-500 cursor-pointer duration-300 hover:bg-gray-200"
            >
                <RiAddCircleFill className="text-2xl" />
                <h1>ADD A CARD</h1>
            </div>

            {
                addCard &&
                <AddCard setAddCard={setAddCard} />
            }
        </div>
    )
}

export default AddCardButton