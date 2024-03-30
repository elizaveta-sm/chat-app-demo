import { createSlice } from '@reduxjs/toolkit';
import { getMessagesList, submitMessage } from './messages.actions';

const initialState = {
  messagesList: null,
  loading: false,

  getMessagesSuccess: false,
  getMessagesError: null,

  submitMessageSuccess: false,
  submitMessageError: null,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessagesList: (state, action) => {
      state.messagesList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessagesList.pending, (state) => {
        state.loading = true;
        state.getMessagesError = null;
      })
      .addCase(getMessagesList.fulfilled, (state, action) => {
        state.loading = false;
        state.getMessagesSuccess = true;
        state.getMessagesError = false;
        state.messagesList = action.payload;
      })
      .addCase(getMessagesList.rejected, (state, action) => {
        state.loading = false;
        state.getMessagesError = action.payload;
      })
      
      .addCase(submitMessage.pending, (state) => {
        state.loading = true;
        state.submitMessageError = null;
      })
      .addCase(submitMessage.fulfilled, (state) => {
        state.loading = false;
        state.submitMessageSuccess = true;
        state.submitMessageError = false;
      })
      .addCase(submitMessage.rejected, (state, action) => {
        state.loading = false;
        state.submitMessageError = action.payload;
      })
  },
});

export const { setMessagesList } = messagesSlice.actions;

export default messagesSlice.reducer;