import axios from "axios";


const useAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});


useAxios.interceptors.request.use(

  function (config) {
    const token = JSON.parse(localStorage.getItem('jwt'))

    if (token) {
      config = {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }

);


useAxios.interceptors.response.use(

  (response) => {
    return response;
  },

  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // DO anything if token is not valid
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);


export default useAxios;