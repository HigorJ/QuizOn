import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { FiUser, FiShare2, FiLogOut } from 'react-icons/fi';

import socket from '../../services/socket.js';
import Sidebar from '../../components/Sidebar';
import FloatButton from '../../components/FloatButton';

import './preparation.css';

export default function PreparationPage() {

    const history = useHistory();
    const { id, room: room_name } = useParams();

    const [user, setUser] = useState({});
    const [participants, setParticipants] = useState([]);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if(start) {
            history.push(`/quizzes/all/${id}/${room_name}`);
        }
    }, [start, history, id, room_name]);

    useEffect(() => {
        function getInfo() {
            setUser(JSON.parse(localStorage.getItem("@application_user")));

            socket.onNewParticipant(participants, setParticipants);
            socket.onRemoveParticipant(participants, setParticipants);
            socket.onQuizStart(setStart);
            socket.onUsersAnswersList(setParticipants);
        }

        getInfo();
    }, [participants]);

    useEffect(() => {
        socket.getParticipants(room_name);

        socket.onParticipantList(setParticipants);
    }, [room_name]);

    function handleReady() {
        socket.participantReady({
            room_name,
            user_id: user.user_id
        });
    }

    function handleExit() {
        socket.participantLeft({
            user_id: user.user_id,
            room_name
        });

        history.push('/lobby');
    }

    return (
        <div id="container">
            <Sidebar />

            <div className="page">
                <header>
                    <Link style={{ margin: "10px" }} to="#">
                        <FiShare2 size={32} color="#2480D6" />
                    </Link>

                    <div style={{ margin: "10px", cursor: "pointer" }} onClick={handleExit}>
                        <FiLogOut size={32} color="#CC5050" />
                    </div>                    
                </header>

                <section>
                    <h1 className="preparation-room-title">Invite your friends :)</h1>
                    <div className="content" style={{ flexDirection: 'row' }}>
                        {
                        participants.map(participant => (
                            <div 
                                key={participant.user_id} 
                                className="participants-preparation-room" 
                                style={ participant.ready 
                                    ? { border: "1px solid #00FF7F" }  
                                    : {}
                            }>
                                <div className="div-user-image">
                                    {participant.user_photo !== "" ? (
                                        <img src={participant.user_photo} alt="user" />
                                    ) : (
                                        <div className="no-image-user-icon">
                                            <FiUser size={50} color="#474747" />
                                        </div>
                                    )}
                                </div>

                                <div className="user-info">
                                    <p>{participant.name}</p>
                                </div>
                            </div>
                        ))
                        }
                    </div>

                    <div className="div-buttons">
                        <button onClick={handleReady}>Ready</button>
                        <button onClick={handleExit}>Exit</button>
                    </div>
                </section>
                <FloatButton />
            </div>
        </div>
    )
}