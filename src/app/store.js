import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.slice';
import messagesReducer from '../features/messages/messages.slice';

const store = configureStore({
    reducer: {
      auth: authReducer,
      messages: messagesReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
