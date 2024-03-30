import { useEffect, useRef, useState } from "react";
import ChatBubble from "../components/chat-bubble";
import LoadingSpinner from "../components/loading-spinner";
import ChatInputBox from "../components/chat-input-box";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";

const messagesCollectionRef = collection(db, 'messages');
const q = query(messagesCollectionRef, orderBy('createdAt', 'asc'));

const Chat = () => {
    const [messages, setMessages] = useState([]);

    const messagesListRef = useRef(null);

    useEffect(() => {
        messagesListRef.current?.lastElementChild?.scrollIntoView();
    }, [messages])

    useEffect(() => {
        // onSnapshot function listens for the changes in the database.
        // whenever there are changes in the specified query 'q', the callback functiion provided to onSnapshot will be run.
        // querySnapshot contains the updated data
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            // respond to the data
            const messagesList = [];

            querySnapshot.forEach(doc => {
                messagesList.push(doc.data());
            });
            
            setMessages(messagesList);
        });
    
        // a cleanup function:
        // It ensures that the Firestore listener is unsubscribed from when the component unmounts or re-renders. This prevents memory leaks and unnecessary data fetching when the component is no longer in use.
        return unsubscribe;
      }, []);

    return (
        <>  
            { messages ? (
                <div className="bg-black w-full h-full overflow-y-scroll grid">
                    <div className="bg-black w-full h-full md:grid md:grid-cols-8 xl:px-8">
                        <div className="bg-white-100 flex flex-col gap-2 pt-20 pb-20 px-3 md:px-0 md:col-start-2 md:col-span-6 md:pb-24 md:pt-24 xl:col-start-3 xl:col-span-4" ref={messagesListRef}>
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