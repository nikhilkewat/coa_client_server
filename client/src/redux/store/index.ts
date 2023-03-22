import rootReducer from "../reducers";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
// import storage from "redux-persist/lib/storage";
import storage from "redux-persist/lib/storage/session";
// import { configureStore } from "@reduxjs/toolkit";
import {composeWithDevTools }from "redux-devtools-extension"

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user"],
    whitelist: ["auth", "filterList"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );


const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// const store = configureStore({
//     reducer: {
//         ...persistedReducer
//     }
// });


let persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export default store;
