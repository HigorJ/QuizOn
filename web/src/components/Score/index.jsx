import React, { useEffect, useState } from 'react';

import socket from '../../services/socket.js';
import { FiCheckCircle, FiUser } from 'react-icons/fi';

import './score.css';

export default function Score({ room_name }) {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        function getInfo() {
            socket.onRemoveParticipant(participants, setParticipants);
            socket.onScoreUpdate(setParticipants);
            socket.onAllAnswered(setParticipants);
        }

        getInfo();
    }, [participants]);

    useEffect(() => {
        socket.getParticipants(room_name);

        socket.onParticipantList(setParticipants);
    }, [room_name]);

    return (
        <aside>
            <h1 className="quiz-title-ranking">Ranking</h1>

            <div className="user-score-component">
                {
                participants.map(participant => (
                    <div key={participant.user_id} className="participant-component">
                        <div className="image-div-score">
                            {participant.user_photo !== "" ? (
                                <img src={participant.user_photo} alt="user" />
                            ) : (
                                <FiUser size={32} color="#474747" />
                            )}
                        </div>

                        <div className="user-score-box">
                            <p>{participant.name}</p>
                            <p>{participant.score}</p>
                        </div>

                        {participant.answered && (
                            <FiCheckCircle className="check-answer" size={18} color="#00FF7F" />
                        )}
                    </div>
                ))
                }
            </div>
        </aside>
    )
}