/* eslint-disable no-param-reassign */

import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

const initialState = {
  channelsInfo: {
    channels: [],
    currentChannelId: 0,
  },
  messagesInfo: {
    messages: [],
  },
};

const chatInfoSlice = createSlice({
  name: 'chatInfo',
  initialState,
  reducers: {
    setNewChannelId(state, { payload }) {
      const { id } = payload;
      state.channelsInfo.currentChannelId = id;
    },
    setNewMessage(state, { payload }) {
      const message = payload;
      state.messagesInfo.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatData.fulfilled, (state, { payload }) => {
      const { channels, currentChannelId, messages } = payload;
      state.channelsInfo.channels = channels;
      state.channelsInfo.currentChannelId = currentChannelId;
      state.messagesInfo.messages = messages;
    });
  },
});

export const { actions } = chatInfoSlice;
export default chatInfoSlice.reducer;
