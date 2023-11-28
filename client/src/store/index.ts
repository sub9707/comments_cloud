import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Utils/Auth";
import userReducer from "./Utils/User";
import modalReducer from "./Modal/Modal";
import noticeReducer from "./Modal/NoticeModal";
import alertReducer from "./Utils/Alert";
import myErrorReducer from "./Modal/MyErrorModal";
import ReplyDataSlice from "./DataThunk/RepliesSlice";
import MySearchSlice from "./DataThunk/MySearchSlice";
import myErrorFilterReducer from "./Toggle/MyErrorFilter";
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
  replies: ReplyDataSlice,
  mySearch: MySearchSlice,
  myErrorFilter: myErrorFilterReducer,
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
