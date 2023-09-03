// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';

// import {
//     createStateSyncMiddleware,
//     initMessageListener,
// } from "redux-state-sync";

// import storage from 'redux-persist/lib/storage/session';
// import userSlice from 'redux/slice/userSlice';

// const persistConfig = {
//     key: 'root',
//     version: 0.1,
//     storage,
// };

// const rootReducer = combineReducers({
//     user: userSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }).concat(createStateSyncMiddleware({})),
// });

import { createStore, applyMiddleware, combineReducers } from "redux";
import userSlice from 'redux/slice/userSlice';
import containerSlice from "redux/slice/containerSlice";

import {
    createStateSyncMiddleware,
    initMessageListener,
} from "redux-state-sync";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    user: userSlice,
    container: containerSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(
        createStateSyncMiddleware({
            blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
        })
    )
);

initMessageListener(store);

export const persistor = persistStore(store);
export default store;