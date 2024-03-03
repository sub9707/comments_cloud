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
import pagination from "./Utils/Pagination";
import RankToggle from "./Toggle/RankingToggle";
import BoardRankTab from "./Toggle/BoardRankTab";
import boardSearch from "./DataThunk/BoardSearchSlice";
import boardFetchSlice from "./Toggle/BoardFetchTab";
import adminUserModalSlice from "./Modal/AdminUserModal";
import adminBoardModalSlice from "./Modal/AdminBoardModal";
import pictureModalSlice from "./Modal/PictureModal";
import PasswordCheckedSlice from "./Utils/PasswordSet";
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
  boardSearch: boardSearch,
  myErrorFilter: myErrorFilterReducer,
  pagination: pagination,
  BoardRankTab: BoardRankTab,
  RankToggle: RankToggle,
  boardFetchTab: boardFetchSlice,
  adminUserModalSlice,
  adminBoardModalSlice,
  pictureModalSlice,
  PasswordCheckedSlice,
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
