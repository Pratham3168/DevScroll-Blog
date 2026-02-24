import {configureStore ,combineReducers} from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import themeReducer from './theme/themeSlice'
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
    // Add other reducers here
});


const persistConfig = {
    key:'root',
    storage,
    version:1,
}


const persistedReducer = persistReducer(persistConfig , rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;