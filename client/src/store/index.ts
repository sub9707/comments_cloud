import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import userReducer from "./User";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// reducer 결합
const reducers = combineReducers({
  user: userReducer,
  authToken: tokenReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
