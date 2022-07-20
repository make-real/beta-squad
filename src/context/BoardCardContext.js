import { createContext, useContext, useEffect, useState } from "react";

const BoardCardContext = createContext();


export const BoardCardItem = ({ children }) => {

    const [target, setTarget] = useState({ bid: '', cid: '' });

    const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('kanban')) ||
        [
            {
                id: Date.now() + Math.random(),
                name: 'To Do',
                cards: [
                    {
                        id: Date.now() + Math.random(),
                        title: 'HTML + CSS',
                        tasks: [],
                        labels: [
                            { text: 'Frontend', color: 'bg-blue-500' },
                        ],
                        desc: 'This is testing',
                        date: new Date().toISOString().split('T')[0],
                    },
                    {
                        id: Date.now() + Math.random(),
                        title: 'Figma Design',
                        tasks: [],
                        labels: [
                            { text: 'UI/UX', color: 'bg-orange-500' },
                        ],
                        desc: 'This is UI testing',
                        date: new Date().toISOString().split('T')[0],
                    }
                ]
            }
            ,
            {
                id: Date.now() + Math.random() * 2,
                title: 'WebDev',
                cards: [
                    {
                        id: Date.now() + Math.random(),
                        title: 'Backend',
                        tasks: [],
                        labels: [
                            { text: 'NodeJs', color: 'bg-lime-600' },
                        ],
                        desc: 'This is testing',
                        date: new Date().toISOString().split('T')[0],
                    },

                ]
            }
        ]);


    const addBoard = title => setBoards(pre => [...pre, { id: Date.now() + Math.random(), title, cards: [] }]);


    const removeBoard = bid => setBoards(pre => pre.filter(({ id }) => id !== bid))


    const addCard = (title, bid) => {

        // 🟩🟩🟩 1st coming data from user ==> Create a new card
        const card = {
            id: Date.now() + Math.random(),
            title,
            labels: [], // [{ text: 'git', color: 'bg-black' }]
            tasks: [],
            date: new Date().toISOString().split('T')[0],
            desc: ''
        }


        // 🟩🟩🟩 2nd Find 🔎 that specific Board index, for enter ==> the Newly Created Card. 
        const boardIndex = boards.findIndex(({ id }) => id === bid);
        if (boardIndex < 0) return; // IF no board found, return nothing...


        // 🟩🟩🟩 3rd update the Card inside a specific Board
        const tempBoard = [...boards];              // copy ==> total old board 
        tempBoard[boardIndex].cards.push(card);     // add  ==> new card into that copied board
        setBoards(tempBoard);                       // update ==> exiting board by this new copied board
    }


    const removeCard = (bid, cid) => {

        // 🟥🟥🟥 1st ==> 🔎 Find the Board index
        const boardIndex = boards.findIndex(({ id }) => id === bid);
        if (boardIndex < 0) return; // IF no board found, return nothing...

        // 🟥🟥🟥 2nd ==> 🔎 Find the Card index
        const cardIndex = boards[boardIndex].cards.findIndex(({ id }) => id === cid);
        if (cardIndex < 0) return; // IF no card found, return nothing...

        // 🟥🟥🟥 3rd ==> remove tha specific Card from a specific Board + Update Board
        // setBoards(pre => pre[boardIndex].cards.filter(({ id }) => id !== bid));
        const tempBoard = [...boards];                      // copy 
        tempBoard[boardIndex].cards.splice(cardIndex, 1);   // delete
        setBoards(tempBoard);                               // update 
    }


    const updateCard = (bid, cid, card) => {

        // 🟥🟥🟥 1st ==> 🔎 Find the Board index
        const boardIndex = boards.findIndex(({ id }) => id === bid);
        if (boardIndex < 0) return; // IF no card found, return nothing...

        // 🟥🟥🟥 2nd ==> 🔎 Find the Card index
        const cardIndex = boards[boardIndex].cards.findIndex(({ id }) => id === cid);
        if (cardIndex < 0) return; // IF no card found, return nothing...

        const tempBoard = [...boards];                      // copy 
        tempBoard[boardIndex].cards[cardIndex] = card;      // replace / update that specific card
        setBoards(tempBoard);                               // update state variable
    }


    const handleDragEnter = (bid, cid) => setTarget({ bid, cid });

    
    const handleDragEnd = (bid, cid) => {
        let s_bIndex, s_cIndex, d_bIndex, d_cIndex;

        s_bIndex = boards?.findIndex(({ id }) => id === bid);
        if (s_bIndex < 0) return;

        s_cIndex = boards[s_bIndex]?.cards?.findIndex(({ id }) => id === cid);
        if (s_cIndex < 0) return;

        d_bIndex = boards?.findIndex(({ id }) => id === target.bid);
        if (d_bIndex < 0) return;

        d_cIndex = boards[d_bIndex]?.cards?.findIndex(({ id }) => id === target.cid);
        if (d_cIndex < 0) return;

        const tempBoard = [...boards];                              // copy all board's
        const tempCard = tempBoard[s_bIndex].cards[s_cIndex];       // copy of that selected card

        tempBoard[s_bIndex].cards.splice(s_cIndex, 1);              // remove that selected card from source board
        tempBoard[d_bIndex].cards.splice(d_cIndex, 0, tempCard);    // add that coped card into destination board

        setBoards(tempBoard)                                        // update boards
    }


    // store all data in local storage
    useEffect(() => localStorage.setItem('kanban', JSON.stringify(boards)), [boards]);


    return (
        <BoardCardContext.Provider value={{
            boards,
            addBoard,
            removeBoard,
            addCard,
            updateCard,
            removeCard,
            handleDragEnd,
            handleDragEnter,
        }}>
            {
                children
            }
        </BoardCardContext.Provider>
    )
}

export const useBoardCardContext = () => useContext(BoardCardContext);