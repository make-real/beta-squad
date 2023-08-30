import { createContext, useContext, useState } from "react";

const BoardCardItem = createContext();

export const BoardCardContext = ({ children }) => {
  // const [target, setTarget] = useState({ bid: '', cid: '' });

  const [cardDetails, setCardDetails] = useState({});
  const [addBoard, setAddBoard] = useState(false);

  const [boardLists, setBoardList] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);

  const filterBoardList = (filter_tag) => {
    const list = [...boardLists];

    let new_list = [];

    if (filter_tag === "Done") {
      list.map((board) => {
        let cards = [];
        board.cards.forEach((card) => {
          if (card.progress === 4) {
            cards.push(card);
          }
        });
        if (cards.length) {
          let new_board = { ...board, cards };
          new_list.push(new_board);
        }
      });
      setFilteredLists(new_list);
      return;
    }

    if (filter_tag === "All") {
      list.map((board) => {
        let cards = [];
        board.cards.forEach((card) => {
          if (card.progress !== 4) {
            cards.push(card);
          }
        });
        if (cards.length) {
          let new_board = { ...board, cards };
          new_list.push(new_board);
        }
      });
      setFilteredLists(new_list);
      return;
    }

    list.map((board) => {
      let cards = [];
      board.cards.forEach((card) => {
        card.tags.forEach((tag) => {
          if (filter_tag === "All" && card.progress !== 4) {
            cards.push(card);
          }
          if (tag.name === filter_tag && card.progress !== 4) {
            cards.push(card);
          }
        });
      });
      if (cards.length) {
        let new_board = { ...board, cards };
        new_list.push(new_board);
      }
    });

    setFilteredLists(new_list);
  };

  const addBoardList = (newListObj) =>
    setBoardList((pre) => [...pre, newListObj]);

  const updateBoardList = (id, text) => {
    setBoardList((pre) =>
      pre.filter((el) => (el._id === id ? (el.name = text) : el))
    );
  };

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
    const copy = [...boardLists];
    const boardIndex = copy.findIndex(({ _id }) => _id === bid);
    if (boardIndex < 0) return;
    const cardIndex = copy[boardIndex].cards.findIndex(
      ({ _id }) => _id === cid
    );
    if (cardIndex < 0) return;
    copy[boardIndex].cards[cardIndex] = {
      ...copy[boardIndex].cards[cardIndex],
      ...newCard,
    };
    setBoardList(copy);
  };

  const handleDragEnd = (
    { target, targetIndex },
    { source, sourceIndex },
    type
  ) => {
    const board = [...boardLists];

    if (type === "column") {
      const list = board[sourceIndex];

      board.splice(sourceIndex, 1);
      board.splice(targetIndex, 0, list);

      setBoardList(board);
      return;
    }

    const sourceBoard = board[board.findIndex(({ _id }) => _id === source)];
    const targetBoard = board[board.findIndex(({ _id }) => _id === target)];

    const card = sourceBoard.cards[sourceIndex];

    sourceBoard.cards.splice(sourceIndex, 1);
    targetBoard.cards.splice(targetIndex, 0, card);
    setBoardList(board);
  };

  const toggleCardModal = (bid, cid) => {
    const copy = [...boardLists];
    const boardIndex = copy.findIndex(({ _id }) => _id === bid);
    const cardIndex = copy[boardIndex].cards.findIndex(
      ({ _id }) => _id === cid
    );
    copy[boardIndex].cards[cardIndex].modal =
      !copy[boardIndex].cards[cardIndex].modal;
    setBoardList(copy);
  };

  return (
    <BoardCardItem.Provider
      value={{
        boardLists,
        setBoardList,
        addBoardList,
        updateBoardList,
        removeBoardList,
        addCard,
        updateCard,
        removeCard,
        handleDragEnd,
        toggleCardModal,
        filterBoardList,
        cardDetails,
        setCardDetails,
        addBoard,
        setAddBoard,
        filteredLists,
        setFilteredLists,
      }}
    >
      {children}
    </BoardCardItem.Provider>
  );
};

export const useBoardCardContext = () => useContext(BoardCardItem);
