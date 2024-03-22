import { useRef } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  create_card_comments,
  get_card_comments,
} from "../../api/cardComments";
import MessageBox from "../Chat/MessageBox";
import TextMessage from "../Chat/TextMessage";

const CardMessage = ({ listId, cardId }) => {
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const [comments, setComments] = useState([]);
  const [responseTo, setResponseTo] = useState(null);
  const page = useRef(1);

  useEffect(() => {
    const getCard = async () => {
      try {
        const { data } = await get_card_comments({
          spaceId: selectedSpaceId,
          cardId: cardId,
          listId: listId,
        });

        setComments((prev) => {
          if (data.comments[0]?._id !== prev[prev.length - 1]?._id) {
           
            return data.comments.reverse();
          } else {
            return prev;
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    // const interval = setInterval(() => {
    //   getCard();
    // }, 2000);

    // return () => clearInterval(interval);
  }, [cardId, listId, selectedSpaceId]);

  const createComment = async (data) => {
    try {
      const { data: res } = await create_card_comments({
        spaceId: selectedSpaceId,
        cardId: cardId,
        listId: listId,
        attachments: data.audio || data.image?.[0],
        message: data.text,
        replayOf: responseTo?._id,
      });
      setComments((prev) => [...prev, res.comment]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div  className="flex flex-col w-5/12  transition duration-700 ease-in-out bg-[#ECECEC]/[0.5] rounded-2xl my-2">
      <div className="overflow-y-auto h-full">
        <div className="my-5">
          <TextMessage
            messageToRespond={responseTo}
            setMessageToRespond={setResponseTo}
            forComment
            comments={comments}
          />
        </div>
      </div>
      <div className="flex justify-center pb-4 pt-2 border-t border-gray-300">
        <MessageBox
          custom
          onComment={createComment}
          messageToRespond={responseTo}
          setMessageToRespond={setResponseTo}
        />
      </div>
    </div>
  );
};

export default CardMessage;
