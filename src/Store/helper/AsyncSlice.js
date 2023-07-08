/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";

/**
 * cria um slice com uma funcao asyncrona.
 * @param {Object} config
 * @param {string} config.name - nome do slice
 * @param {Object} config.initialState - estado inicial do slice
 * @param {Function} config.fetchConfig - funcao que retorna a url e options da requisicao asyncrona
 * @param {Object} config.reducers - reducers adicionais
 */
const AsyncSlice = (config) => {
    const slice = createSlice({
        name: config.name,
        initialState: {
            loading: false,
            data: null,
            error: null,
            ...config.initialState,
        },
        reducers: {
            fetchStarted: (state) => {
                state.loading = true;
            },
            fetchSuccess: (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            },
            fetchError: (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            },
            ...config.reducers,
        },

    });

    const { fetchStarted, fetchSuccess, fetchError } = slice.actions;



    const asyncAction = (payload) => async (dispatch) => {
        try {
            dispatch(fetchStarted());
            const { url, options } = config.fetchConfig(payload);
            const response = await fetch(url, options);
            const data = await response.json();
            return dispatch(fetchSuccess(data));

        } catch (error) {
            return dispatch(fetchError(error.message));
        }
    };

    return { ...slice, asyncAction };
}

export default AsyncSlice;