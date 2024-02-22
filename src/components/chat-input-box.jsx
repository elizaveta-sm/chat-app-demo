import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesList, submitMessage } from "../features/messages/messages.actions";
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from "firebase/firestore";
import { getMessagesLoading, getMessageSubmitionSuccess, getMessageSubmitionError } from "../features/messages/messages.selector";

const INITIAL_STATE = {
    uid: '',
    username: '', 
    text: '',
    photoURL: '', 
    email: '',
    createdAt: null,
};

const ChatInputBox = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.currentUser);
    
    const loading = useSelector(getMessagesLoading);
    const submitMessageSuccess = useSelector(getMessageSubmitionSuccess);
    const submitMessageError = useSelector(getMessageSubmitionError);
    
    const [messageText, setMessageText] = useState('');

    const onEnterPress = (e) => {
        if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            onMessageSubmit(e);
        }
    }

    const onMessageSubmit = (e) => {
        e.preventDefault();

        dispatch(submitMessage({
            text: messageText,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            uid: uuidv4(),
            username: currentUser.displayName,
            createdAt: Timestamp.now(),
        }));

        setMessageText('');
    };

    return (
        <form onSubmit={onMessageSubmit}> 
            <label htmlFor="chat" className="sr-only">Your message</label>

            <div className="fixed bottom-0 w-full bg-neutral-700 md:grid md:grid-cols-8 2xl:grid-cols-10 2xl:p-0">
                <div className="flex items-center py-2 md:col-start-2 md:col-span-6 2xl:col-start-4 2xl:col-span-4">
                    <textarea 
                        id="chat" 
                        rows="1" 
                        className="block mx-4 p-2.5 w-full text-sm rounded-2xl border bg-black border-neutral-600 placeholder-neutral-400 text-white focus:ring-yellow-500 focus:border-yellow-500 md:text-base md:p-3" 
                        placeholder="Message..." 
                        onChange={(e) => setMessageText(e.target.value)} 
                        value={messageText}
                        onKeyDown={onEnterPress}
                    ></textarea>
                    <button type="submit" className="inline-flex justify-center p-2 mr-4 rounded-full cursor-pointer text-yellow-500 hover:bg-neutral-800">
                        <svg className="w-6 h-6 rotate-90 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ChatInputBox