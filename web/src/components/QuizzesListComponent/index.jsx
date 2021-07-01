import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './quizzes-list.css';

export default function QuizzesList({ title, data }) {
    const history = useHistory();
    
    return (
        <div className="lobby-content">
            {data.length > 0 && (
                <Link className="quizzes-list-title" to={`/quizzes/${title.replace(' ', '-').toLowerCase()}`}>
                    {title}
                </Link>
            )}

            <div className="quizzes-items">
                {data.map((item) => (
                    <div key={item.quiz_id} className="quiz-item" onClick={() => history.push(`/quizzes/all/${item.quiz_id}`)}>
                        <img src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt={item.name} />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}