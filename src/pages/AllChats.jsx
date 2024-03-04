import { getChats } from "../services/Chat.service";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        getChats()
            .then((chats) => {
                console.log("Chats data:", chats); // ////////////////////////////////////
                setChats(chats);
            })
            .catch(err => {
                console.log("Error fetching chats:", err); ////////////////////////////////////
            })
    }, []);

    return (
        <div className="chats-margin">
            <div className="top-div-header"></div>
            <div className="Chats container mx-auto">
                <div className="chat-title mt-4">
                    <h1 className="text-2xl text-red-600 font-semibold">Tus conversaciones</h1>
                    <hr className="border-red-600" />
                </div>
                {chats.length > 0 ? (
                    <>
                        {chats
                            .sort((a, b) => new Date(b.messages[b.messages.length - 1].date) - new Date(a.messages[a.messages.length - 1].date))
                            .map((chat) => {
                                const otherUser = chat?.users.find((user) => user.id !== currentUser.id);
                                const unreadMessages = chat.messages.filter(message => message.sender !== currentUser.id && message.status === 'unread').length;
                                return (
                                    <NavLink style={{ textDecoration: 'none', color: '#3F423B' }} to={`/user/chat/${chat.id}`}  key={chat.id}>
                                        <div className="chat-list-container my-3 mt-4 bg-white rounded-lg shadow-md p-4">
                                            <div className="flex items-center">
                                                <img src={otherUser.avatar} alt="" className="w-16 h-16 rounded-full" />
                                                <div className="ml-4 chat-container-text">
                                                    <h6 className="font-semibold text-lg text-red-600">{otherUser.name}</h6>
                                                    {chat.messages.length > 0 ? (
                                                        <div className="conversation-text-content flex items-center">
                                                            <p className={unreadMessages ? 'font-semibold' : ''}>{chat.messages[chat.messages.length - 1].text}</p>
                                                            <p id="message-time-conversation" className="ml-4 mt-1 text-sm text-gray-600">{format(new Date(chat.messages[chat.messages.length - 1].date), "HH:mm")}</p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-600">No hay mensajes aún</p>
                                                    )}
                                                </div>
                                                {unreadMessages > 0 && (
                                                    <div className="messages-number ml-auto mt-3">
                                                        <span className="unread-circle bg-red-600 text-white rounded-full px-2 py-1">{unreadMessages}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </NavLink>
                                );
                            })}
                    </>
                ) : (
                    <div className="row">
                        <div className="no-conversations-container mt-4">
                            <h3 className="text-xl text-red-600 font-semibold">Aún no has iniciado ninguna conversación.</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default Chats;
