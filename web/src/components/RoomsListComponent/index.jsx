import React, { useState, useEffect } from 'react';
import socket from '../../services/socket.js';

import { Link, useHistory } from 'react-router-dom';
import { FiCameraOff } from 'react-icons/fi';

export default function RoomsListComponent({ title, data }) {
    const history = useHistory();

    const [user, setUser] = useState();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("@application_user")));
    }, []);
    
    function handleEnterInRoom(roomObj, room_name) {
        socket.joinRoom({
            user_id: user.user_id,
            room_name,
            name: user.name,
            user_photo: user.user_photo
        });

        history.push(`/quizzes/all/${roomObj.quiz_id}/${room_name}/waiting-participants`);
    }

    return (
        <div className="list-content">
            {data.length > 0 && (
                <Link className="items-list-title" to={`/quizzes/${title.replace(' ', '-').toLowerCase()}`}>
                    {title}
                </Link>
            )}

            <div className="items-list">
                {Object.keys(data).map((room_name) => {
                    let roomObj = data[room_name];

                    return (
                        <div key={roomObj.quiz_id} className="div-item" onClick={() => handleEnterInRoom(roomObj, room_name)}>
                            <div className="item-default-image">
                                <FiCameraOff size={48} color="#474747" />
                            </div>

                            <p>{room_name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}