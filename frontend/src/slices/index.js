import { configureStore } from '@reduxjs/toolkit';
import chatInfoReducer from './chatInfoSlice.js';

export default configureStore({
  reducer: {
    chatReducer: chatInfoReducer,
  },
});
