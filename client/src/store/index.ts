import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import userReducer from "./User";

export default configureStore({
  reducer: {
    authToken: tokenReducer,
    user: userReducer,
  },
});
