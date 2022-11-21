import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchChatData } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatData.fulfilled, (state, { payload }) => {
      messagesAdapter.upsertMany(state, payload.messages);
    });
  },
});

export const { actions } = messagesSlice;
export const msgSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
