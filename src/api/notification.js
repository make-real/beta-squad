import useAxios from ".";

export const get_notifications = (limit) => {
    return useAxios.get(`/notification?limit=${limit}`);
};
