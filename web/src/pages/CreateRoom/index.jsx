import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import socket from '../../services/socket';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatButton from '../../components/FloatButton';

import './create-room.css';

export default function CreateRoom() {

    const history = useHistory();
    const { id } = useParams();

    const [user, setUser] = useState({});
    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        function getInfo() {
            setUser(JSON.parse(localStorage.getItem("@application_user")));
        }

        getInfo();
    }, []);

    function handleCreateRoom(e) {
        e.preventDefault();
        
        socket.newRoom({
            room_name: roomName,
            user_id: user.user_id,
            quiz_id: id,
            name: user.name,
            user_photo: user.user_photo
        });

        history.push(`/quizzes/all/${id}/${roomName}/waiting-participants`);
    }

    return (
        <div id="container">
            <Sidebar />
            
            <div className="page">
                <Header  onProfile={false} />
                
                <section>
                    <form className="create-room-form" onSubmit={handleCreateRoom}>
                        <img 
                            className="create-room-image" 
                            src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" 
                            alt="Room" 
                        />

                        <div className="input-field">
                            <input 
                                name="room-name" 
                                id="room-name" 
                                type="text" 
                                placeholder="Room name" 
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                            <label htmlFor="room-name">Room name</label>
                        </div>

                        <div className="input-field">
                            <input 
                                name="room-password" 
                                id="room-password" 
                                type="password" 
                                placeholder="Room password" 
                            />
                            <label htmlFor="room-password">Room password</label>
                        </div>

                        <button type="submit">Create room</button>
                    </form>
                </section>
                
                <FloatButton />
            </div> 
        </div>
    )
}