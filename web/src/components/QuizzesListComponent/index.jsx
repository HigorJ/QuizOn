import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiCameraOff } from 'react-icons/fi';

import './quizzes-list.css';

export default function QuizzesList({ title, data }) {
    const history = useHistory();
    
    return (
        <div className="content">
            {data.length > 0 && (
                <Link className="quizzes-list-title" to={`/quizzes/${title.replace(' ', '-').toLowerCase()}`}>
                    {title}
                </Link>
            )}

            <div className="quizzes-items">
                {data.map((item) => (
                    <div key={item.quiz_id} className="quiz-item" onClick={() => history.push(`/quizzes/all/${item.quiz_id}`)}>
                        {item.quiz_photo === "" ? (
                            <FiCameraOff size={48} color="#474747" />
                        ) : (
                            <img src={item.quiz_photo} alt={item.name} />
                        )}
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}