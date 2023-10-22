import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import userReducer from "./User";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

// reducer 결합
const reducers = combineReducers({
  user: userReducer,
  authToken: tokenReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["authToken"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
