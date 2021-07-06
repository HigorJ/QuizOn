import React from 'react';
import { useHistory } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/sidebar';
import Header from '../../components/Header/header';
import FloatButton from '../../components/FloatButton/floatButton';

import './create-room.css';

export default function CreateRoom() {

    const history = useHistory();
    const QUIZ_ID = 1;
    const ROOM_ID = 1;

    function handleCreateRoom(e) {
        e.preventDefault();
        
        history.push(`/quizzes/all/${QUIZ_ID}/${ROOM_ID}`);
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