/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { TagId } from './../store/slice/TagId';

// Backend || Server ==> URL Address
const api = axios.create({ baseURL: config.API_URL });

// with every url request send user identification at server side for authentication...
// send user auth automatically every time with every request...
api.interceptors.request.use((req) => {
    // 1st ==> get user token from LocalStorage, that server send to client...
    const serverSendToken = JSON.parse(localStorage.getItem('jwt'));

    if (serverSendToken) {
        // 2nd ==> send this token from LocalStorage into server for user id tracking...
        // & we can see it by at browser Network Console
        req.headers.authorization = `Bearer ${serverSendToken}`;
    } else {
        // alert(`You Have No Internet Connection... ⛔ \nPlease Connect Your Internet Connection... 🔗`);
    }

    return req;
});

const useFetch = (endPoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // const { data: { result } } = await api.get(endPoint);
                const { data } = await api.get(endPoint);
                setData(data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };

        fetchData();
    }, [endPoint]);

    return { data, loading, error };
};

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// 🟨 REST api Section...🟨
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨

// POST + DELETE ==> Methods For User...
// 1) Registration
// 2) Account Verification Code
// 3) Login
// 4) Logout
export const userSignUp = (userInfo) =>
    api.post('/user-auth/sign-up', userInfo);
export const userSignIn = (userInfo) => api.post('/user-auth/login', userInfo);

export const userRecoverPassword = (email) =>
    api.post('/user-auth/recover-password', email);
export const verifyRecoverPassword = (code) =>
    api.post('/user-auth/recover-password/code', code);
export const recoverPassword = (code) =>
    api.post('/user-auth/recover-password/password-reset', code);

export const userLogOut = (_) => api.delete('/user-auth/logout');
export const accountVerification = (code) =>
    api.post('/user-auth/account-verification', code);
export const resendVerificationCode = (email) =>
    api.post('/user-auth/resend-verification-code', email);

// GET Methods
export const getUserProfileInfo = (userId) =>
    useFetch(`/users/profile/${userId}`);

export const getUserBySearch = (userQuery) =>
    useFetch(`/users?search=${userQuery}`);

// 🟨🟨🟨 Work-Space
// POST ==> Work-Space Create
export const workspaceCreation = (newWorkSpaceObj) =>
    api.post('/workspaces', newWorkSpaceObj);

// 🟨🟨🟨 Space
// POST ==> Space Create --- under specific Work-Space reference ID
export const spaceCreation = (newSpaceObj) => api.post('/spaces', newSpaceObj);

// 🟨🟨🟨 Board List
// POST ==> (Board) List Create --- under specific Space reference ID
export const addBoardListApiCall = (spaceId, newBoardList) =>
    api.post(`/spaces/${spaceId}/board`, newBoardList);

// UPDATE ==> (Board) List --- under specific Space reference ID
export const boardListUpdate = (spaceId, listId, name) =>
    api.patch(`/spaces/${spaceId}/board/${listId}`, { name });

// DELETE ==> (Board) List --- under specific Space reference ID
export const boardListDelete = (spaceId, listId) =>
    api.delete(`/spaces/${spaceId}/board/${listId}`);

// 🟨🟨🟨 Card
// POST ==> Card Create --- under specific Space reference ID + Board List ID
export const addCardIntoBoardList = (spaceId, listId, newCard) =>{
    console.log(newCard)
    api.post(`/spaces/${spaceId}/board/${listId}/card`, newCard);
}
  

export const cardDeleteApiCall = (spaceId, listId, cardId) =>
    api.delete(`/spaces/${spaceId}/board/${listId}/card/${cardId}`);

export const cardUpdateApiCall = (
    spaceId,
    listId,
    cardId,
    cardObj
) => api.patch(`/spaces/${spaceId}/board/${listId}/card/${cardId}`, cardObj);

export const cardAttachmentUpdateApiCall = (spaceId, listId, cardId, cardObj) =>
    api.patch(`/spaces/${spaceId}/board/${listId}/card/${cardId}`, cardObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const createChecklistItem = (spaceId, listId, cardId, newChecklist) =>
    api.post(
        `/spaces/${spaceId}/board/${listId}/card/${cardId}/checklist`,
        newChecklist
    );

export const updateChecklistItem = (
    spaceId,
    listId,
    cardId,
    checklistId,
    updatedChecklist
) =>
    api.patch(
        `/spaces/${spaceId}/board/${listId}/card/${cardId}/checklist/${checklistId}`,
        updatedChecklist
    );

export const deleteChecklistItem = (spaceId, listId, cardId, checklistId) =>
    api.delete(
        `/spaces/${spaceId}/board/${listId}/card/${cardId}/checklist/${checklistId}`
    );

export const getAllUser = () => api.get('/users');

export const getSpaceMembers = (spaceId) =>
    api.get(`/spaces/${spaceId}/members`);

export const getSingleCard = (spaceId, listId, cardId) =>
    api.get(`/spaces/${spaceId}/board/${listId}/card/${cardId}`);

export const updateListOrder = (spaceId, listId, order) =>
    api.put(`/spaces/${spaceId}/board/${listId}/order`, {
        order,
    });
export const moveCard = (spaceId, listId, cardId, newListId, order) =>
    api.put(`/spaces/${spaceId}/board/${listId}/card/${cardId}/move`, {
        newListId,
        order,
    });
export const updateCardOrder = (spaceId, listId, cardId, order) =>
    api.put(`/spaces/${spaceId}/board/${listId}/card/${cardId}/order`, {
        order,
    });

export const getCardAsList = (spaceId) => api.get(`/spaces/${spaceId}/row`);
