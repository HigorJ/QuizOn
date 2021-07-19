import React from 'react';
import { useHistory } from 'react-router-dom';

import socket from '../../services/socket.js';

import './quiz-end.css';

export default function QuizEnd({ score, room, user_id }) {
    const history = useHistory();

    function handleExitQuiz() {
        socket.participantLeft({
            user_id: user_id,
            room_name: room
        });

        history.push('/lobby');
    }

    return (
        <div className="quiz-end">
            <h1>Fim do quiz!</h1>

            <p className="final-score">{score}</p>

            <button onClick={handleExitQuiz}>Back to Lobby</button>
        </div>
    );
}