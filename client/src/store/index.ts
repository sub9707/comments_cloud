import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import userReducer from "./User";
import modalReducer from "./Modal";
import noticeReducer from "./NoticeModal";
import alertReducer from "./Alert";
import myErrorReducer from "./MyErrorModal";
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
  modal: modalReducer,
  notice: noticeReducer,
  alert: alertReducer,
  myError: myErrorReducer,
});

export type RootState = ReturnType<typeof reducers>;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
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
