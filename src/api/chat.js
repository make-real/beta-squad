import useAxios from ".";
import { toFormData } from "../util/helpers";

export const get_single_messages = (workspaceId, userId) => {
    return useAxios.get(`/workspaces/${workspaceId}/chat/${userId}`);
};

export const send_single_message = (workspaceId, userId, data) => {
    // const formData = toFormData(data);
    return useAxios.post(`/workspaces/${workspaceId}/chat/${userId}`, data);
};

/**
 * Add reaction to a message
 *
 * @param {String} spaceID Target Space ID
 * @param {String} messageID Target Message ID
 * @param {String} emoji Reaction Emoji
 * @returns Promise
 */
export const add_reaction = (spaceID, messageID, emoji) => {
    return useAxios.put(`/spaces/${spaceID}/chat/${messageID}`, {
        reaction: emoji,
    });
};

/**
 * delete message
 *
 * @param {String} spaceID Target Space ID
 * @param {String} messageID Target Message ID
 * @returns Promise
 */
export const delete_message = (spaceID, messageID) => {
    return useAxios.delete(`/spaces/${spaceID}/chat/${messageID}`);
};
