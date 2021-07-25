import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import socket from '../../services/socket';

import './sidebar.css';

export default function Sidebar() {
    const history = useHistory();
    const { room } = useParams();

    const [user, setUser] = useState('');
    const [quizId, setQuizId] = useState('');
    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        function getInfo() {
            setUser(JSON.parse(localStorage.getItem("@application_user")));
        }

        getInfo();

        socket.onRoomId(setQuizId);
    }, []);

    useEffect(() => {
        if(quizId !== '') {
            history.push(`/quizzes/all/${quizId}/${roomName}/waiting-participants`);
        }
    }, [history, quizId, roomName]);

    function handleEnterInRoom() {
        socket.joinRoom({
            user_id: user.user_id,
            room_name: roomName,
            name: user.name,
            user_photo: user.user_photo
        });

        socket.getRoomId({
            room_name: roomName
        });
    }

    function handleExit() {
        if(room) {
            socket.participantLeft({
                user_id: user.user_id,
                room_name: room
            });
        }

        history.push('/lobby')
    }

    return (
        <aside>
            <div onClick={() => handleExit()} className="link">
                <h1>QuizOn</h1>
            </div>

            <div className="room-name">
                <p>Do you have any code?</p>
                <p>Paste it here!</p>
                <div className="input-field">
                    <input 
                        name="name" 
                        id="name" 
                        type="text" 
                        placeholder="Room name" 
                        value={roomName} 
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                    <label htmlFor="name">Room Name</label>
                </div>

                <button onClick={handleEnterInRoom}>Join</button>
            </div>
        </aside>
    )
}