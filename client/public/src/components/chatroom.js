import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function ChatRoom({ roomCode }) {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.emit('join_room', roomCode);

        socket.on('receive_message', (msg) => {
            setChat((prevChat) => [...prevChat, msg]);
        });

        return () => {
            socket.disconnect();
        };
    }, [roomCode]);

    const sendMessage = () => {
        socket.emit('send_message', { message, roomCode });
        setChat((prevChat) => [...prevChat, message]);
        setMessage('');
    };

    return (
        <div className="chat-room">
            <div className="chat-window">
                {chat.map((msg, index) => (
                    <div key={index} className="chat-message">{msg}</div>
                ))}
            </div>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message..." 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatRoom;
