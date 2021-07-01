import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

import './score.css';

export default function Score({ score }) {
    return (
        <div className="quiz-score-sidebar">
            <h1 className="quiz-title-ranking">Ranking</h1>

            <div className="user-score-component">
                <div className="image-div-score">
                    <img src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="user" />
                </div>

                <div className="user-score-box">
                    <p>Username</p>
                    <p>{score}</p>
                </div>

                <FiCheckCircle className="check-answer" size={18} color="#00FF7F" />
            </div>
        </div>
    )
}