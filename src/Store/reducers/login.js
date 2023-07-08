/* eslint-disable no-unused-vars */
import { combineReducers } from '@reduxjs/toolkit';
import AsyncSlice from '../helper/AsyncSlice';
import getLocalStorage from '../helper/getLocalStorage';
import { removePhoto } from './photo';


const token = AsyncSlice({
    name: "token",
    initialState: { //estado inicial do reducer
        data: {
            token: getLocalStorage("token", null),
        }
    },
    reducers: {
        removeToken: (state) => {
            state.data = null;
        },
        fetchSuccess: {
            reducer(state, action) {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            },
            prepare(payload) {
                return {
                    payload,
                    meta: { localStorage: { key: "token", value: payload.token } },
                }
            },
        },
    },
    fetchConfig: (user) => ({
        url: "https:dogsapi.origamid.dev/json/jwt-auth/v1/token",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
    }),
});

const FetchToken = token.asyncAction;


const user = AsyncSlice({
    name: "user",
    reducers: {
        removeUser: (state) => {
            state.data = null;
        },
    },
    fetchConfig: (token) => ({
        url: "https:dogsapi.origamid.dev/json/api/user",
        options: {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        },
    }),
});

const FetchUser = user.asyncAction;

const reducer = combineReducers({ token: token.reducer, user: user.reducer });

export default reducer;

export const loginUser = (user) => async (dispatch) => {
    try {
        const { payload } = await dispatch(FetchToken(user));
        if (payload.token !== undefined) {
            dispatch(FetchUser(payload.token));
        }
    } catch (error) {
        console.log(error);
    }
};

export const autoLogin = () => async (dispatch, getState) => {
    const state = getState();
    const { token } = state.login.token.data;
    if (token) {
        console.log("auto login");
        await dispatch(FetchUser(token));
    }
}

const { removeToken } = token.actions;
const { removeUser } = user.actions;

export const userLogout = () => async (dispatch) => {
    dispatch(removeUser());
    dispatch(removeToken());
    dispatch(removePhoto());
    window.localStorage.removeItem("token");
}