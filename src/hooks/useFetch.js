/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react';
import axios from 'axios';


// Backend || Server ==> URL Address
const api = axios.create({ baseURL: 'https://space-api.makereal.click' });



// with every url request send user identification at server side for authentication...
api.interceptors.request.use(req => {

    // 1st ==> get user token from LocalStorage, that server send to client...
    const serverSendToken = JSON.parse(localStorage.getItem('jwt'))

    if (serverSendToken) {
        // 2nd ==> send this token from LocalStorage into server for user id tracking...
        // & we can see it by at browser Network Console
        req.headers.authorization = `Bearer ${serverSendToken}`;
    }

    return req;
});




const useFetch = (endPoint) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);


    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);
            try {
                const { data: { result } } = await api.get(endPoint);
                setData(result);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }

        fetchData();

    }, [endPoint]);

    return { data, loading, error };
}

// export default useFetch;


// POST + DELETE ==> Methods For User Registration + Login + Logout 
export const userSignUp = (userData) => api.post('/api/user-auth/sign-up', userData);
export const userSignIn = (userData) => api.post('/api/user-auth/login', userData);
export const userLogOut = () => api.delete('/api/user-auth/logout');
export const accountVerification = (userData) => api.post('/api/user-auth/account-verification', userData);


// GET Methods
export const getUserProfileInfo = (userId) => useFetch(`/api/users/profile/${userId}`);
export const getUserBySearch = (userQuery) => useFetch(`/api/users?search=${userQuery}`);
