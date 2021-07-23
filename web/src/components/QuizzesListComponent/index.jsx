import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiCameraOff } from 'react-icons/fi';

export default function QuizzesListComponent({ title, data, user_id }) {
    const history = useHistory();
    
    return (
        <div className="list-content">
            {data.length > 0 && (
                <Link className="items-list-title" to={`/quizzes/${!user_id ? "" : user_id}`}>
                    {title}
                </Link>
            )}

            <div className="items-list">
                {data.map((quiz) => (
                    <div key={quiz.quiz_id} className="div-item" onClick={() => history.push(`/quizzes/all/${quiz.quiz_id}`)}>
                        {quiz.quiz_photo === "" ? (
                            <div className="item-default-image">
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