import useAxios from ".";

export const o_auth_login = (token) => {
  return useAxios.post(`user-auth/login`, {
    googleAuthToken: token,
  });
};

export const get_my_profile = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  return useAxios.get(`users/profile/${userId}`);
};

export const delete_my_account = () => {
  return useAxios.delete(`users/delete`);
};
