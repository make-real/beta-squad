import { RiAddCircleFill } from "react-icons/ri";
import { useState } from "react";
import { AddCard } from ".";


const AddCardButton = () => {

    const [addCard, setAddCard] = useState(false);

    return (
        <div className="fixed bottom-0  w-[96%] p-4 bg-gray-100">
            
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