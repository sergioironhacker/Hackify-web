import { getChats } from "../services/Chat.service";
import { useContext, useState, useEffect } from "react";
import  AuthContext  from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";


const Chats = () => {
    const [chats, setChats] = useState([]);
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        getChats()
            .then((chats) => {
                setChats(chats);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="chats-margin">
            <div className="top-div-header"></div>
            <div className="Chats container">
                <div className="chat-title mt-4">
                    <h1>Tus conversaciones</h1>
                    <hr />
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
                                        <div className="chat-list-container my-3 mt-4">
                                            <div className="d-flex align-items-center">
                                                <img src={otherUser.avatar} alt="" width={100} />
                                                <div className="ms-4 chat-container-text">
                                                    <h6 className="fw-bold">{otherUser.name}</h6>
                                                    {chat.messages.length > 0 ? (
                                                        <div className="conversation-text-content d-flex align-items-center">
                                                            <p className={unreadMessages ? 'fw-bold' : ''}>{chat.messages[chat.messages.length - 1].text}</p>
                                                            <p id="message-time-conversation" className="ms-4 mt-1">{format(new Date(chat.messages[chat.messages.length - 1].date), "HH:mm")}</p>
                                                        </div>
                                                    ) : (
                                                        <p>No hay mensajes aún</p>
                                                    )}
                                                </div>
                                                {unreadMessages > 0 && (
                                                    <div className="messages-number ms-4 mt-3">
                                                        <span className="unread-circle">{unreadMessages}</span>
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
                            <h3>Aún no has iniciado ninguna conversación.</h3>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );

}

export default Chats;