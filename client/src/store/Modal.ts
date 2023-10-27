import { createSlice } from "@reduxjs/toolkit";

export type ModalState = {
  modalType: string;
  isOpen: boolean;
};

const initialState = {
  modalType: "",
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const { modalType } = actions.payload;
      state.modalType = modalType;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: { modal: typeof initialState }) =>
  state.modal;

export default modalSlice.reducer;
