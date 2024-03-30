import { useSelector } from "react-redux";
import LazyLoad from 'react-lazyload';

const PlaceholderImage = () => {
    return (
        <div className="flex items-center justify-center object-cover object-center aspect-[4/3] w-40 h-40 bg-gray-300 rounded dark:bg-gray-700 md:w-48 md:h-48 xl:w-52 xl:h-52">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
        </div>
    )
} 

const ChatBubble = ({ message }) => {
    const { currentUser } = useSelector((state) => state.auth);

    const timestamp = message.createdAt.toDate();

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        
        if (date.toDateString() === now.toDateString()) {
            // the message was sent today
            // return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return timestamp.toString().slice(16, 21);
        } else {
            return `
                ${ date.toLocaleDateString([], { month: 'short', day: 'numeric' }) }
                ${ timestamp.toString().slice(16, 21) }
            `;
        }
    }

    const formattedTimestamp = formatTimestamp(timestamp);
    // const messageDate = timestamp.toString().slice(4, 15);

    const text = message.text?.split('\n').map((item, i) => {
        return (
            <span key={`${message.uid}-n-${i}`}>
                {item}
                <br />
            </span>
        )
    });

    return (
        <div>
            { currentUser.email === message.email ? (
                <div className="flex items-start justify-end">
                    <div className="flex flex-col w-fit max-w-[75%] leading-1.5 px-2 border-gray-200">
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse pt-2 pb-1">
                            <span className="text-xs font-normal text-white">{message.username}</span>
                            <span className="text-xs font-normal text-gray-400">{formattedTimestamp}</span>
                        </div>

                        { message.type === 'image' ? (
                                <LazyLoad height={300} placeholder={<PlaceholderImage />}>
                                    <img src={message.source} className="rounded-es-2xl rounded-s-2xl rounded-se-2xl place-self-end object-cover object-center aspect-[4/3] w-full max-h-40 md:max-h-48 xl:max-h-52" />
                                </LazyLoad>
                            ) : (
                                <p className="text-sm font-normal py-2.5 px-3 text-neutral-800 bg-[#fbd12c] rounded-es-2xl rounded-s-2xl rounded-se-2xl w-fit place-self-end xl:text-base">
                                    { text }
                                </p>
                        ) }

                    </div>

                    <img className="w-8 h-8 rounded-full place-self-end lg:w-10 lg:h-10" src={message.photoURL} alt={`${message.username}'s image`} />
                </div>
            ) : (
                <div className="flex items-start justify-start">
                    <img className="w-8 h-8 rounded-full place-self-end lg:w-10 lg:h-10" src={message.photoURL} alt={`${message.username}'s image`} />
        
                    <div className="flex flex-col w-fit max-w-[75%] leading-1.5 px-2 border-gray-200">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse pt-2 pb-1">
                            <span className="text-xs font-normal text-white">{message.username}</span>
                            <span className="text-xs font-normal text-gray-400">{formattedTimestamp}</span>
                        </div>

                        { message.type === 'image' ? (
                            <LazyLoad height={300} placeholder={<PlaceholderImage />}>
                                <img src={message.source} className="rounded-e-2xl rounded-tl-2xl place-self-start overflow-hidden object-cover object-center aspect-[4/3] w-full max-h-40 md:max-h-48 xl:max-h-52" />
                            </LazyLoad>
                            ) : (
                                <p className="text-sm font-normal py-2.5 px-3 text-white bg-neutral-700 rounded-e-2xl rounded-tl-2xl w-fit place-self-start xl:text-base">
                                    { text }
                                </p>
                        ) }

                    </div>
                </div>
            ) }
        </div>
    )
}

export default ChatBubble