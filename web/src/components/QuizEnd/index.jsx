import React from 'react';
import { useHistory } from 'react-router-dom';

import './quiz-end.css';

export default function QuizEnd({ score }) {
    const history = useHistory();

    return (
        <div className="quiz-end">
            <h1>Fim do quiz!</h1>

            <p className="final-score">{score}</p>

            <button onClick={() => history.push('/lobby')}>Back to Lobby</button>
        </div>
    );
}