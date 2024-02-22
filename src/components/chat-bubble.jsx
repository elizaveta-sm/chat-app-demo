import { useSelector } from "react-redux";

const ChatBubble = ({ message }) => {
    const { loading, currentUser, error, loginSuccess, isLoggedIn } = useSelector((state) => state.auth);

    const timestamp = message.createdAt.toDate();

    const messageTime = timestamp.toString().slice(16, 21);
    const messageDate = timestamp.toString().slice(3, 15);

    const text = message.text.split('\n').map((item, i) => {
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
                            <span className="text-xs font-normal text-white pl-3 md:text-sm">{message.username}</span>
                            <span className="text-xs font-normal text-gray-400 md:text-sm">{messageTime}</span>
                        </div>

                        <p className="text-sm font-normal py-2.5 px-3 text-neutral-800 bg-[#fbd12c] rounded-es-2xl rounded-s-2xl rounded-se-2xl w-fit place-self-end md:text-base">
                            { text }
                        </p>
                    </div>

                    <img className="w-8 h-8 rounded-full place-self-end" src={message.photoURL} alt={`${message.username}'s image`} />
                </div>
            ) : (
                <div className="flex items-start justify-start">
                    <img className="w-8 h-8 rounded-full place-self-end" src={message.photoURL} alt={`${message.username}'s image`} />
        
                    <div className="flex flex-col w-fit max-w-[75%] leading-1.5 px-2 border-gray-200">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse pt-2 pb-1">
                            <span className="text-xs md:text-sm font-normal text-white pl-3">{message.username}</span>
                            <span className="text-xs md:text-sm font-normal text-gray-400">{messageTime}</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 px-3 text-white bg-neutral-700 rounded-e-2xl rounded-tl-2xl w-fit place-self-start md:text-base">
                            { text }
                        </p>
                    </div>
                </div>
            ) }
        </div>
    )
}

export default ChatBubble