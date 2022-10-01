import useAxios from ".";
import { toFormData } from "../util/helpers";

export const get_card_comments = ({ spaceId, listId, cardId }) => {
  return useAxios.get(
    `spaces/${spaceId}/board/${listId}/card/${cardId}/comment`
  );
};

export const create_card_comments = ({
  spaceId,
  listId,
  cardId,
  message,
  attachments,
  audio,
  replayOf,
}) => {
  return useAxios.post(
    `spaces/${spaceId}/board/${listId}/card/${cardId}/comment`,
    toFormData({
      textMessage: message,
      attachments: attachments,
      replayOf: replayOf,
      voice: audio,
    })
  );
};
