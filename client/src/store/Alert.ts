import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertMessage {
  id: string;
  text: string;
  type: string;
}
interface AlertState {
  messages: AlertMessage[];
}

const initialState: AlertState = {
  messages: [],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<AlertMessage>) => {
      state.messages.push(action.payload);
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      );
    },
  },
});

export const { addMessage, removeMessage } = alertSlice.actions;
export const selectAlertMessages = (state: { alert: AlertState }) =>
  state.alert.messages;
export default alertSlice.reducer;
