import { getCurrentChat } from "../services/Chat.service";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import AuthContext from "../contexts/AuthContext";
import { createMessage, updateMessages } from "../services/Message.Service";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { FaPaperPlane } from 'react-icons/fa';

const initialValues = {
    text: ''
}

const Chat = () => {
    const chatContainerRef = useRef(null);
    const inputFieldRef = useRef(null);
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState(initialValues);
    const [chatMessages, setChatMessages] = useState([]);
    const [/* messageError */, setMessageError] = useState('');
    const { id } = useParams();
    const { user: currentUser } = useContext(AuthContext);

    const markMessagesAsRead = useCallback((messages) => {
        messages.forEach((message) => {
            if (message.status === 'unread' && message.sender.id !== currentUser.id) {
                updateMessages(message.id, { status: 'read' })
                    .then(() => {})
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    }, [currentUser]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chatData = await getCurrentChat(id);
                setChat(chatData);
                if (chatData && chatData.messages) {
                    setChatMessages(chatData.messages);
                    markMessagesAsRead(chatData.messages);
                    // Scroll al final del contenedor solo cuando se carga el chat por primera vez
                    if (chatContainerRef.current && chatMessages.length === 0) {
                        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
        const intervalId = setInterval(fetchData, 2000);
    
        return () => {
            clearInterval(intervalId);
        };
    }, [id, chatMessages.length, markMessagesAsRead]);

    const handleMessageChange = (e) => {
        const { name, value } = e.target;
        setMessage(prevMessage => ({
            ...prevMessage,
            [name]: value
        }));
    }

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        if (chat && chat.id) {
            createMessage(chat.id, message)
                .then((response) => {
                    const newMessage = response.message;
                    const newMessagePopulated = {
                        ...newMessage,
                        sender: {
                            id: currentUser.id,
                            name: currentUser.name,
                            avatar: currentUser.avatar
                        }
                    }
                    const updatedMessages = [...chatMessages, newMessagePopulated];
                    setChatMessages(updatedMessages);
                    const updatedChat = {
                        ...chat,
                        messages: updatedMessages
                    };
                    setChat(updatedChat);
                    setMessage(initialValues);
                    // Scroll al final del contenedor después de enviar un mensaje
                    if (chatContainerRef.current) {
                        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                    }
                    // Enfocar el campo de entrada de mensajes después de enviar un mensaje
                    if (inputFieldRef.current) {
                        inputFieldRef.current.focus();
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    const otherUser = chat && chat.users ? chat.users.find((user) => user._id !== currentUser._id) : null;

    return (
        chat ? (
            <div className="chat-margin">
                <div className="top-div-header"></div>
                <div className="Chat container mx-auto">
                    {otherUser && otherUser.id && (
                        <NavLink style={{ textDecoration: 'none', color: ' #FF5A5F' }} to={`/users/${otherUser.id}`}>
                            <div className="chat-user-info flex items-center">
                                <img src={otherUser.avatar} alt="" className="w-16 h-16 rounded-full" />
                                <div className="chat-user-name flex flex-col items-center ml-4  text-green-400">
                                <h2 className="text-xl text-green-400">Ver perfil de {otherUser.username} <i className="bi bi-arrow-right-circle-fill"></i></h2>
                                </div>
                            </div>
                        </NavLink>
                    )}
                    <hr className="border-green-400" />
                    <div className="chat-box overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }} ref={chatContainerRef}>
                        {chatMessages.map((msg) => (
                            <div className={`message flex ${msg.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`} key={msg.id}>
                                <div className="chat-message-content flex flex-col items-start ms-3">
                                    <div className="message-text flex items-center">
                                        <p className="text-base">{msg.text}</p>
                                        {msg.sender.id === currentUser.id && (
                                            <i className={`bi bi-check-all ${msg.status === 'unread' ? 'text-red-500' : 'text-red-500'} ms-2`}></i>
                                        )}
                                    </div>
                                    <div className="message-time mt-1">
                                        <p className="text-sm text-gray-500">{format(new Date(msg.date), "HH:mm")}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
    
                    <form onSubmit={handleSubmitMessage}>
                        <div className="form-group flex items-center">
                            <input ref={inputFieldRef} onChange={handleMessageChange} type="text" name="text" className="form-control w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-400" placeholder="Escribe un mensaje..." value={message.text} />
                            <button type="submit" className="btn-circle bg-green-400 text-white px-4 py-2 rounded-full ml-2">
                                <FaPaperPlane />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : (
            <p>Loading</p>
        )
    )
}

export default Chat;
