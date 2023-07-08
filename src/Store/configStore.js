/* eslint-disable no-unused-vars */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import localStorage from './middleware/localStorage';
//import log from './middleware/log';
import login from './reducers/login';
import photo from "./reducers/photo";

const reducers = combineReducers({ login, photo});

const middleware = [...getDefaultMiddleware(), localStorage];

const store = configureStore({ reducer: reducers, middleware });


export default store;