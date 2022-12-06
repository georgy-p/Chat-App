/* eslint-disable no-param-reassign */

import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const fetchChatData = createAsyncThunk(
  'chatInfo/fetchData',
  async () => {
    const { data } = await axios.get(routes.dataPath(), {
      headers: getAuthHeader(),
    });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: channelsAdapter.getInitialState({
    currentChannelId: 0,
  }),
  reducers: {
    setNewId(state, { payload }) {
      state.currentChannelId = payload.id;
    },
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatData.fulfilled, (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      channelsAdapter.upsertMany(state, channels);
      state.currentChannelId = currentChannelId;
    });
  },
});

export const { actions } = channelsSlice;
export const chSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
