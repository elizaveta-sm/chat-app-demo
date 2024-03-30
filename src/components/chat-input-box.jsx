import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitMessage } from "../features/messages/messages.actions";
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from "firebase/firestore";
import { getMessagesLoading, getMessageSubmitionSuccess, getMessageSubmitionError } from "../features/messages/messages.selector";

import { storage } from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import resizeFile from "../utils/file-resizer";
import LoadingSpinner from "./loading-spinner";

const ChatInputBox = () => {
    const dispatch = useDispatch();
    
    const currentUser = useSelector((state) => state.auth.currentUser);
    
    const [messageText, setMessageText] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImageLoading, setPreviewImageLoading] = useState(false);

    const [contentType, setContentType] = useState(null); // 'image' or 'text'

    const onEnterPress = (e) => {
        if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            onMessageSubmit(e);
        }
    }

    const messageTextHandler = (e) => {
        setMessageText(e.target.value)
        setImageUpload(null)

        if (contentType !== 'text') {
            setContentType('text')
        }
    }

    const imageHandler = async (e) => {
        setImageUpload(e.target.files[0])
        setMessageText('');

        setPreviewImageLoading(true)
        
        try {
            const file = e.target.files[0];
            const imageURI = await resizeFile(file);
            
            setPreviewImageLoading(false);
            setSelectedImage(imageURI);    
        } catch (err) {
            console.error('error has occurred when resizing the image: ', err)
            setPreviewImageLoading(false);
        }
        
        if (contentType !== 'image') {
            setContentType('image')
        }
    }

    const cancelSelectedImageHandler = () => {
        setSelectedImage(null);
        setImageUpload(null);
    }

    const onMessageSubmit = (e) => {
        e.preventDefault();

        setSelectedImage(null);
        
        // submitting an image message
        if (contentType === 'image') {
            if (imageUpload === null) return;

            const imageRef = ref(storage, `${imageUpload.name + uuidv4()}`);

            // to upload the image to the firebase:
            // uploadBytes is used for directly uploading the file to Firebase Storage without first saving it on the local filesystem.
            uploadBytes(imageRef, imageUpload)
                .then((snapshot) => {
                    // "snapshot" refers to an object that encapsulates the state and metadata of a file or upload operation. When you perform certain operations like uploading a file to Firebase Storage, Firebase provides you with a snapshot object as a result

                    getDownloadURL(snapshot.ref)
                        .then(url => {
                            dispatch(submitMessage({
                                type: contentType,
                                source: url,
                                email: currentUser.email,
                                photoURL: currentUser.photoURL,
                                uid: uuidv4(),
                                username: currentUser.displayName,
                                createdAt: Timestamp.now(),
                            }));

                            setContentType(null);
                            setImageUpload(null);
                        })
                        .catch(err => {
                            console.error('Error occurred when getting a download url: ', err);
                        }) 
                })
                .catch(err => {
                    console.error('Error occurred when uploading an image: ', err);
                });
            
        // submitting a text message
        } else if (contentType === 'text') {
            if (!messageText.length) return;

            dispatch(submitMessage({
                type: contentType,
                text: messageText,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                uid: uuidv4(),
                username: currentUser.displayName,
                createdAt: Timestamp.now(),
            }));

            setMessageText('');
        }
    };

    return (
        <form onSubmit={onMessageSubmit} className="grid">   
            <label htmlFor="chat" className="sr-only">Your message</label>

            <div className="absolute bottom-0 w-full bg-neutral-700 md:grid md:grid-cols-8">

                { (previewImageLoading || selectedImage) && (
                    <div className="bg-neutral-800 min-h-20 py-3 md:col-span-8 md:grid md:grid-cols-8">
                        { selectedImage ? (
                            <div className="flex justify-between text-yellow-500 md:col-start-2 md:col-span-6 mx-3 xl:col-start-3 xl:col-span-4">
                                <img className="object-cover object-center aspect-[4/3] h-20 bg-neutral-800 rounded-2xl md:h-24 xl:h-28" src={selectedImage} alt="Selected" />

                                <button className="self-start rounded-full p-1 cursor-pointer hover:bg-neutral-900 md:p-1.5 md:mr-0.5" onClick={cancelSelectedImageHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            ) : (         
                                <div className="aspect-[4/3] h-20 mt-2 md:col-start-2 md:col-span-6 xl:col-start-3 xl:col-span-4">
                                    <LoadingSpinner />
                                </div>
                        ) }
                    </div>
                ) }

                <div className="flex items-center py-2 md:col-start-2 md:col-span-6 xl:col-start-3 xl:col-span-4">

                    {/* uploading images */}
                    <label htmlFor="upload-image" className="text-yellow-500 ml-3 cursor-pointer rounded-full p-1.5 hover:bg-neutral-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                        </svg>
                    </label>
                    <input
                        className="hidden" 
                        id="upload-image"
                        name="upload-image"
                        type="file" 
                        onChange={imageHandler} 
                    />

                    <textarea 
                        id="chat" 
                        rows="1" 
                        className="block mx-2 p-2.5 w-full text-sm rounded-2xl border bg-black border-neutral-600 placeholder-neutral-400 text-white focus:ring-yellow-500 focus:border-yellow-500 md:text-base md:p-3" 
                        placeholder="Message..." 
                        onChange={messageTextHandler} 
                        value={messageText}
                        onKeyDown={onEnterPress}
                    ></textarea>
                    <button type="submit" name="upload-text" className="inline-flex justify-center p-2 mr-3 rounded-full cursor-pointer text-yellow-500 hover:bg-neutral-800">
                        <svg className="w-6 h-6 rotate-90 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ChatInputBox