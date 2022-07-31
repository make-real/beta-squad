import { createContext, useContext, useEffect, useState } from "react";

const BoardCardItem = createContext();


export const BoardCardContext = ({ children }) => {

    const [target, setTarget] = useState({ bid: '', cid: '' });

    const [boardLists, setBoardList] = useState(JSON.parse(localStorage.getItem('kanban')) || []);
    // console.log(boardList);

    const addBoardList = name => setBoardList(pre => [...pre, { id: Date.now() + Math.random(), name, cards: [] }]);


    const removeBoard = bid => setBoardList(pre => pre.filter(({ id }) => id !== bid))


    const addCard = (name, bid) => {

        // 🟩🟩🟩 1st coming data from user ==> Create a new card
        const card = {
            id: Date.now() + Math.random(),
            name,
            progress: 0,
            tags: [],
            attachments: [],
            assignee: [],
            checkList: [],
        }


        // 🟩🟩🟩 2nd Find 🔎 that specific Board index, for enter ==> the Newly Created Card. 
        const boardIndex = boardLists.findIndex(({ id }) => id === bid);
        if (boardIndex < 0) return; // IF no board found, return nothing...


        // 🟩🟩🟩 3rd update the Card inside a specific Board
        const tempBoard = [...boardLists];              // copy ==> total old board 
        tempBoard[boardIndex].cards.push(card);         // add  ==> new card into that copied board
        setBoardList(tempBoard);                        // update ==> exiting board by this new copied board
    }


    const removeCard = (bid, cid) => {

        // 🟥🟥🟥 1st ==> 🔎 Find the Board index
        const boardIndex = boardLists.findIndex(({ id }) => id === bid);
        if (boardIndex < 0) return; // IF no board found, return nothing...

        // 🟥🟥🟥 2nd ==> 🔎 Find the Card index
        const cardIndex = boardLists[boardIndex].cards.findIndex(({ id }) => id === cid);
        if (cardIndex < 0) return; // IF no card found, return nothing...

        // 🟥🟥🟥 3rd ==> remove tha specific Card from a specific Board + Update Board
        // setBoards(pre => pre[boardIndex].cards.filter(({ id }) => id !== bid));
        const tempBoard = [...boardLists];                      // copy 
        tempBoard[boardIndex].cards.splice(cardIndex, 1);   // delete
        setBoardList(tempBoard);                               // update 
    }


    const updateCard = (bid, cid, card) => {

        // 🟥🟥🟥 1st ==> 🔎 Find the Board index
        const boardIndex = boardLists.findIndex(({ id }) => id === bid);
        if (boardIndex < 0) return; // IF no card found, return nothing...

        // 🟥🟥🟥 2nd ==> 🔎 Find the Card index
        const cardIndex = boardLists[boardIndex].cards.findIndex(({ id }) => id === cid);
        if (cardIndex < 0) return; // IF no card found, return nothing...

        const tempBoard = [...boardLists];                      // copy 
        tempBoard[boardIndex].cards[cardIndex] = card;      // replace / update that specific card
        setBoardList(tempBoard);                               // update state variable
    }


    const handleDragEnter = (bid, cid) => setTarget({ bid, cid });


    const handleDragEnd = (bid, cid) => {
        let s_bIndex, s_cIndex, d_bIndex, d_cIndex;

        s_bIndex = boardLists?.findIndex(({ id }) => id === bid);
        if (s_bIndex < 0) return;

        s_cIndex = boardLists[s_bIndex]?.cards?.findIndex(({ id }) => id === cid);
        if (s_cIndex < 0) return;

        d_bIndex = boardLists?.findIndex(({ id }) => id === target.bid);
        if (d_bIndex < 0) return;

        d_cIndex = boardLists[d_bIndex]?.cards?.findIndex(({ id }) => id === target.cid);
        if (d_cIndex < 0) return;

        const tempBoard = [...boardLists];                              // copy all board's
        const tempCard = tempBoard[s_bIndex].cards[s_cIndex];       // copy of that selected card

        tempBoard[s_bIndex].cards.splice(s_cIndex, 1);              // remove that selected card from source board
        tempBoard[d_bIndex].cards.splice(d_cIndex, 0, tempCard);    // add that coped card into destination board

        setBoardList(tempBoard)                                        // update boards
    }


    // store all data in local storage
    useEffect(() => localStorage.setItem('kanban', JSON.stringify(boardLists)), [boardLists]);


    return (
        <BoardCardItem.Provider value={{
            boardLists,
            addBoardList,
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
        </BoardCardItem.Provider>
    )
}

export const useBoardCardContext = () => useContext(BoardCardItem);





// {{BASE-URL}}/api/spaces/{{spaceId}}/board

// {
//     "list": {
//         "name": "HTML",
//         "spaceRef": "62c5595c4cd94215aec5cfbb",
//         "_id": "62e595954cd94215aec5d1f1",
//         "createdAt": "2022-07-30T20:33:25.700Z",
//         "updatedAt": "2022-07-30T20:33:25.700Z",
//         "__v": 0
//     }
// }




// {
//     "lists": [
//         {
//             "_id": "62e595954cd94215aec5d1f1",
//             "name": "HTML",
//             "cards": [
//                 {
//                     "_id": "62e5964e4cd94215aec5d20d",
//                     "name": "NFT",
//                     "progress": 0,
//                     "tags": [],
//                     "spaceRef": "62c5595c4cd94215aec5cfbb",
//                     "listRef": "62e595954cd94215aec5d1f1"
//                 }
//             ]
//         },
//         {
//             "_id": "62d65e454cd94215aec5d00a",
//             "name": "Hi there",
//             "cards": []
//         },
//         {
//             "_id": "62c559ed4cd94215aec5cfc5",
//             "name": "Hello task 232",
//             "cards": [
//                 {
//                     "_id": "62c55a064cd94215aec5cfcd",
//                     "name": "Sam",
//                     "progress": 0,
//                     "tags": [],
//                     "spaceRef": "62c5595c4cd94215aec5cfbb",
//                     "listRef": "62c559ed4cd94215aec5cfc5"
//                 },
//                 {
//                     "_id": "62c55a644cd94215aec5cfd5",
//                     "name": "Facebook",
//                     "progress": 0,
//                     "tags": [],
//                     "spaceRef": "62c5595c4cd94215aec5cfbb",
//                     "listRef": "62c559ed4cd94215aec5cfc5"
//                 },
//                 {
//                     "_id": "62c55a6c4cd94215aec5cfdd",
//                     "name": "Google",
//                     "progress": 0,
//                     "tags": [],
//                     "spaceRef": "62c5595c4cd94215aec5cfbb",
//                     "listRef": "62c559ed4cd94215aec5cfc5"
//                 },
//                 {
//                     "_id": "62d65e134cd94215aec5d003",
//                     "name": "Gmail",
//                     "progress": 0,
//                     "tags": [],
//                     "spaceRef": "62c5595c4cd94215aec5cfbb",
//                     "listRef": "62c559ed4cd94215aec5cfc5"
//                 }
//             ]
//         }
//     ]
// }


// Create Card
// {{BASE-URL}}/api/spaces/{{spaceId}}/board/{{listId}}/card

// {
//     "card": {
//         "name": "NFT",
//         "checkList": [],
//         "spaceRef": "62c5595c4cd94215aec5cfbb",
//         "listRef": "62e595954cd94215aec5d1f1",
//         "_id": "62e5964e4cd94215aec5d20d",
//         "createdAt": "2022-07-30T20:36:30.392Z",
//         "updatedAt": "2022-07-30T20:36:30.392Z",
//         "__v": 0
//     }
// }



// Get Single Card
// {{BASE-URL}}/api/spaces/{{spaceId}}/board/{{listId}}/card/{{cardId}}

// {
//     "card": {
//         "_id": "62d65e134cd94215aec5d003",
//         "name": "Gmail",
//         "progress": 0,
//         "tags": [],
//         "attachments": [],
//         "assignee": [],
//         "checkList": [],
//         "spaceRef": "62c5595c4cd94215aec5cfbb",
//         "listRef": "62c559ed4cd94215aec5cfc5",
//         "__v": 0
//     }
// }