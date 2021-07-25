import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCameraOff } from 'react-icons/fi';

import socket from '../../services/socket.js';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatButton from '../../components/FloatButton';

export default function QuizzesRooms() {
    const history = useHistory();

    const [user, setUser] = useState({});
    const [allRooms, setAllRooms] = useState({});

    useEffect(() => {
        function getInfo() {
            let user = JSON.parse(localStorage.getItem("@application_user"));
            setUser(user);
    
            socket.getRooms();
            socket.onAllRooms(setAllRooms);
        }

        getInfo();
    }, []);

    function handleEnterInRoom(roomObj, room_name) {
        socket.joinRoom({
            user_id: user.user_id,
            room_name,
            name: user.name,
            user_photo: user.user_photo
        });

        console.log(room_name, roomObj)
        history.push(`/quizzes/all/${roomObj.quiz_id}/${room_name}/waiting-participants`);
    }

    return (
        <div id="container">
            <Sidebar />

            <div className="page">
                <Header onProfile={false} />
                
                <section>
                    <div className="content">
                        <div className="items-list" style={{ flexWrap: 'wrap', overflowY: 'auto' }}>
                            {Object.keys(allRooms).map(room_name => {
                                let roomObj = allRooms[room_name];

                                return (
                                    <div key={room_name} className="div-item" onClick={() => handleEnterInRoom(roomObj, room_name)}>
                                        <div className="item-default-image">
                                            <FiCameraOff size={48} color="#474747" />
                                        </div>
                                        
                                        <p>{room_name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <FloatButton />
            </div>
        </div>
    )
}