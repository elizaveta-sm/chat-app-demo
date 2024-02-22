import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';

export const loginUser = createAsyncThunk(
    'auth/login',
    async ( thunkAPI ) => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            return userCredential.user;
        } catch (error) {
            console.log('error in the login user thunk: ', error)

            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message)
            } else {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async ( thunkAPI ) => {
        console.log('logout user thunk')

        try {
            await signOut(auth);

        } catch (error) {
            console.log('error in the logout user thunk: ', error)

            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message)
            } else {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
)