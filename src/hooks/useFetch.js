/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react';
import axios from 'axios';


// Backend || Server ==> URL Address
const api = axios.create({ baseURL: 'https://space-api.makereal.click/api' });


// with every url request send user identification at server side for authentication...
// send user auth automatically every time with every request...
api.interceptors.request.use(req => {

    // 1st ==> get user token from LocalStorage, that server send to client...
    const serverSendToken = JSON.parse(localStorage.getItem('jwt'))


    if (serverSendToken) {
        // 2nd ==> send this token from LocalStorage into server for user id tracking...
        // & we can see it by at browser Network Console
        req.headers.authorization = `Bearer ${serverSendToken}`;

        // console.log(serverSendToken)

    } else {
        // alert(`You Have No Internet Connection... ⛔ \nPlease Connect Your Internet Connection... 🔗`);

        // console.log('No Token Found, Please Re-Connect Internet');
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


// const useFetchObject = async (endPoint) => {

//     const [data, setData] = useState({});
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(false);

//     console.log('useFetch call...');

//     try {
//         setLoading(true);
//         const { data: { result } } = await api.get(endPoint);
//         setData(result);
//         setLoading(false);
//     } catch (error) {
//         setError(error);
//     }

//     return { data, loading, error };
// }





// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// 🟨 REST api Section...🟨
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨

// POST + DELETE ==> Methods For User...
// 1) Registration
// 2) Account Verification Code
// 3) Login 
// 4) Logout 
export const userSignUp = userInfo => api.post('/user-auth/sign-up', userInfo);
export const userSignIn = userInfo => api.post('/user-auth/login', userInfo);
export const userLogOut = _ => api.delete('/user-auth/logout');
export const accountVerification = code => api.post('/user-auth/account-verification', code);


// GET Methods
export const getUserProfileInfo = userId => useFetch(`/users/profile/${userId}`);
export const getUserBySearch = userQuery => useFetch(`/users?search=${userQuery}`);


// POST ==> Work-Space Create 
export const workspaceCreation = newWorkSpaceObj => api.post('/workspaces', newWorkSpaceObj);


// POST ==> Space Create --- under specific Work-Space reference ID
export const spaceCreation = newSpaceObj => api.post('/spaces', newSpaceObj);