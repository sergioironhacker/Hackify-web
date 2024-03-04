import { getCurrentChat } from "../services/Chat.service";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { createMessage, updateMessages } from "../services/Message.Service";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { useRef } from "react";

const initialValues = {
    text: ''
}

const Chat = () => {
    const chatContainerRef = useRef(null);
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState(initialValues);
    const [chatMessages, setChatMessages] = useState([]);
    const [/* messageError */, setMessageError] = useState('');
    const { id } = useParams();
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
         console.log("ID del chat:", id); /* /////////// Log para verificar el valor de id */
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        const fetchData = async () => {
            try {
                const chatData = await getCurrentChat(id);
                console.log("Chat data:", chatData); //////////////////////////////////////////////   
                setChat(chatData);
                setChatMessages(chatData.messages);
                markMessagesAsRead(chatData.messages);
            } catch (error) {
                console.error(error);
            }
        };

        // Llama a fetchData inmediatamente y luego cada 2 segundos
        fetchData();
        const intervalId = setInterval(fetchData, 2000);

        // Limpia el intervalo al desmontar el componente
        return () => {
            clearInterval(intervalId);
        };
    }, [id, chatMessages.length]);

    const markMessagesAsRead = (messages) => {
        messages.forEach((message) => {
             console.log("Message:", message); /* ///// Log para verificar cada mensaje */
            if (message.status === 'unread' && message.sender.id !== currentUser.id) {
                updateMessages(message.id, { status: 'read' })
                    .then((response) => {
                        console.log('Mensaje actualizado:', response.message); //////////////////////
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    };

    const handleFocus = () => {
        setMessageError(""); 
    };

    const handleBlur = () => {
        if (!message.text) {
            setMessageError("Debes escribir un mensaje"); 
        }
    };

    const handleMessageChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setMessage(prevMessage => ({
            ...prevMessage,
            [key]: value
        }))
    }

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        createMessage(chat.id, message)
            .then((response) => {
                const newMessage = response.message;

                console.log('Mensaje creado:', newMessage); ///////////////////////////

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
            })
            .catch(err => {
                console.log(err)
            })
        setMessage(initialValues);
    }

    const otherUser = chat?.users.find((user) => user.id !== currentUser.id);

return (
    chat ? (
        <div className="chat-margin">
            <div className="top-div-header"></div>
            <div className="Chat container mx-auto">
                <NavLink style={{ textDecoration: 'none', color: ' #FF5A5F' }} to={`/user/users/detail/${otherUser.id}`}>
                    <div className="chat-user-info flex items-center">
                        <img src={otherUser.avatar} alt="" className="w-16 h-16 rounded-full" />
                        <div className="chat-user-name flex flex-col items-center ml-4">
                            <h2 className="text-xl text-red-600">{otherUser.name}</h2>
                            <button className="btn bg-red-600 text-white px-4 py-2 rounded-md mt-2">Ver perfil</button>
                        </div>
                    </div>
                </NavLink>
                <hr className="border-red-600" />
                <div className="chat-box overflow-y-auto" ref={chatContainerRef}>
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
                        <input onChange={handleMessageChange} type="text" name="text" className="form-control w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-600" placeholder="Escribe un mensaje..." value={message.text} onFocus={handleFocus} onBlur={handleBlur} />
                        <button type="submit" className="btn-circle bg-red-600 text-white px-4 py-2 rounded-full ml-2"><i className="bi bi-send"></i></button>
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
