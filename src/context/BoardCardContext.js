import { createContext, useContext, useState } from "react";

const BoardCardItem = createContext();

export const BoardCardContext = ({ children }) => {
  const [target, setTarget] = useState({ bid: "", cid: "" });

  const [boardLists, setBoardList] = useState([]);

  const addBoardList = (newListObj) =>
    setBoardList((pre) => [newListObj, ...pre]);

  const removeBoardList = (bid) =>
    setBoardList((pre) => pre.filter(({ _id }) => _id !== bid));

  const addCard = (cardObj, bid) => {
    const boardIndex = boardLists.findIndex(({ _id }) => _id === bid);

    if (boardIndex < 0) return;

    setBoardList((prev) => {
      const tempBoard = [...prev];

      if (!tempBoard[boardIndex].cards) {
        tempBoard[boardIndex].cards = [];
      }

      tempBoard[boardIndex].cards.push(cardObj);

      return tempBoard;
    });
  };

  const removeCard = (bid, cid) => {
    const boardIndex = boardLists.findIndex(({ _id }) => _id === bid);
    if (boardIndex < 0) return;

    const cardIndex = boardLists[boardIndex].cards.findIndex(
      ({ _id }) => _id === cid
    );
    if (cardIndex < 0) return;

    const tempBoard = [...boardLists];
    tempBoard[boardIndex].cards.splice(cardIndex, 1);

    setBoardList(tempBoard);
  };

  const updateCard = (bid, cid, newCard) => {
    const tempBoard = [...boardLists];
    const newBoard = tempBoard.map((board) => {
      if (board._id === bid) {
        board.cards = board.cards.map((card) => {
          if (card._id === cid) {
            card = {
              ...card,
              ...newCard,
            };
          }
          return card;
        });
      }
      return board;
    });
    setBoardList(newBoard);
  };

  const handleDragEnd = ({ target, targetIndex }, { source, sourceIndex }) => {
    const board = [...boardLists];
    const sourceBoard = board[board.findIndex(({ _id }) => _id === source)];
    const targetBoard = board[board.findIndex(({ _id }) => _id === target)];

    const card = sourceBoard.cards[sourceIndex];

    sourceBoard.cards.splice(sourceIndex, 1);
    targetBoard.cards.splice(targetIndex, 0, card);
  };

  const toggleCardModal = (bid, cid) => {
    const tempBoard = [...boardLists];
    const newBoard = tempBoard.map((board) => {
      if (board._id === bid) {
        board.cards = board.cards.map((card) => {
          if (card._id === cid) {
            card.modal = !card.modal;
          }
          return card;
        });
      }
      return board;
    });
    setBoardList(newBoard);
  };

  return (
    <BoardCardItem.Provider
      value={{
        boardLists,
        setBoardList,
        addBoardList,
        removeBoardList,
        addCard,
        updateCard,
        removeCard,
        handleDragEnd,
        toggleCardModal,
      }}
    >
      {children}
    </BoardCardItem.Provider>
  );
};

export const useBoardCardContext = () => useContext(BoardCardItem);
