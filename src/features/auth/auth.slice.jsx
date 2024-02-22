import { createSlice } from '@reduxjs/toolkit'
import { loginUser, logoutUser } from './auth.actions';

const initialState = {
  currentUser: null, // for user object
  isLoggedIn: false,

  loading: true,

  loginError: null,
  loginSuccess: false, 

  logoutError: null,
  logoutSuccess: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginSuccess = true;
        state.loginError = false;
        state.isLoggedIn = true;
        // state.logoutSuccess = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })

      // for logging out:
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.logoutError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.logoutSuccess = true;
        state.logoutError = false;
        state.isLoggedIn = false;
        // state.loginSuccess = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.logoutError = action.payload;
      })
  },
});

export const { setCurrentUser, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;