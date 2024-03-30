import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

const messagesCollectionRef = collection(db, 'messages');

const q = query(messagesCollectionRef, orderBy('createdAt', 'asc'));

export const getMessagesList = createAsyncThunk(
    'messages/getMessagesList',
    async ( thunkAPI ) => {
        try {
            const data = await getDocs(q);
        
            const filteredData = data.docs.map(doc => ({
                ...doc.data(), 
                id: doc.id
            }));

            return filteredData; 

        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message)
            } else {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
);

export const submitMessage = createAsyncThunk(
    'messages/submitMessage',
    async ( messageInfo ) => {
        try {
            await addDoc(messagesCollectionRef, messageInfo);

        } catch (error) {
            console.log('error in the submit message thunk: ', error)

            if (error.response && error.response.data.message) {
                return messageInfo.rejectWithValue(error.response.data.message)
            } else {
                return messageInfo.rejectWithValue(error.message)
            }
        }
    }
)