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
                {data.map((quiz) => (
                    <div key={quiz.quiz_id} className="quiz-item" onClick={() => history.push(`/quizzes/all/${quiz.quiz_id}`)}>
                        {quiz.quiz_photo === "" ? (
                            <div className="quiz-default-image">
                                <FiCameraOff size={48} color="#474747" />
                            </div>
                        ) : (
                            <img src={quiz.quiz_photo} alt={quiz.name} />
                        )}
                        <p>{quiz.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}