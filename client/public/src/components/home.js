import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
    const [roomCode, setRoomCode] = useState('');
    const history = useHistory();

    const createRoom = () => {
        const code = Math.random().toString(36).substring(2, 7);
        history.push(`/room/${code}`);
    };

    const joinRoom = () => {
        if (roomCode) {
            history.push(`/room/${roomCode}`);
        }
    };

    return (
        <div className="home">
            <button onClick={createRoom}>Create Room</button>
            <input 
                type="text" 
                value={roomCode} 
                onChange={(e) => setRoomCode(e.target.value)} 
                placeholder="Enter room code" 
            />
            <button onClick={joinRoom}>Join Room</button>
        </div>
    );
}

export default Home;
