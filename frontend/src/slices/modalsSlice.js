/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modalsInfo',
  initialState: {
    isOpen: false,
    type: null,
    channelId: null,
  },
  reducers: {
    openModal(state, { payload }) {
      state.isOpen = true;
      state.type = payload.type;
      state.channelId = payload.channelId;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
