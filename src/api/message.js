import useAxios from ".";
import { toFormData } from "../util/helpers";

export const get_messages = (spaceID) => {
  return useAxios.get(`/spaces/${spaceID}/chat/get-messages`);
};

export const send_message = (spaceID, data) => {
  const formData = toFormData(data);
  return useAxios.post(`/spaces/${spaceID}/chat/send-messages`, formData);
};
