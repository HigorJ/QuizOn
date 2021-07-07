import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiUser } from 'react-icons/fi';

import './score.css';

export default function Score({ score }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("@application_user")));
    }, []);

    return (
        <aside>
            <h1 className="quiz-title-ranking">Ranking</h1>

            <div className="user-score-component">
                <div className="image-div-score">
                    {user.user_photo !== "" ? (
                        <img src={user.user_photo} alt="user" />
                    ) : (
                        <FiUser size={32} color="#474747" />
                    )}
                    
                </div>

                <div className="user-score-box">
                    <p>{user.name}</p>
                    <p>{score}</p>
                </div>

                <FiCheckCircle className="check-answer" size={18} color="#00FF7F" />
            </div>
        </aside>
    )
}