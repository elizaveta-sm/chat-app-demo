import { useDispatch, useSelector } from "react-redux"
import { getMessagesError, getMessagesList, getMessagesLoading, getMessagesSuccess } from "../features/messages/messages.selector"
import { useEffect, useRef, useState } from "react";
import ChatBubble from "../components/chat-bubble";
import LoadingSpinner from "../components/loading-spinner";
import ChatInputBox from "../components/chat-input-box";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { setMessagesList } from "../features/messages/messages.slice";

const messagesCollectionRef = collection(db, 'messages');
const q = query(messagesCollectionRef, orderBy('createdAt', 'asc'));

const Chat = () => {
    // const messagesList = useSelector(getMessagesList);
    // const messagesLoading = useSelector(getMessagesLoading);
    // const messagesSuccess = useSelector(getMessagesSuccess);
    // const messagesError = useSelector(getMessagesError);

    // const dispatch = useDispatch();
    
    // console.log('messages: ', messagesList);
    const [messages, setMessages] = useState([]);

    const messagesListRef = useRef(null);

    useEffect(() => {
        messagesListRef.current?.lastElementChild?.scrollIntoView();
    }, [messages])

    useEffect(() => {
        console.log('use effect in the chat component is run')

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            // respond to the data
            const messagesList = [];

            querySnapshot.forEach(doc => {
                messagesList.push(doc.data());
            });

            console.log('setting the messages to: ', messagesList)
            setMessages(messagesList);
        });
    
        // stop listening to the changes
        return unsubscribe;
      }, []);

    return (
        <>  
            { messages ? (
                <div className="bg-black w-full h-full overflow-y-scroll grid">
                    <div className="bg-black w-full h-full md:grid md:grid-cols-8 xl:px-8 2xl:grid-cols-10 2xl:p-0">
                        <div className="bg-white-100 flex flex-col gap-2 pt-20 pb-20 px-3 md:px-0 md:col-start-2 md:col-span-6 md:pb-24 md:pt-24 2xl:col-start-4 2xl:col-span-4" ref={messagesListRef}>
                            { messages.map(message => <ChatBubble message={message} key={message.uid} />)}
                        </div>
                    </div>
                    <ChatInputBox />

                </div>
            ) : <LoadingSpinner /> }
        </>
    )
}

export default Chat