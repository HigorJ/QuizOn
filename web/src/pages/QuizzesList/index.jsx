import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FiCameraOff } from 'react-icons/fi';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatButton from '../../components/FloatButton';
import api from '../../services/api';

import './quizzes-list.css';

export default function QuizList() {

    let { id } = useParams();
    const history = useHistory();

    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        async function getInfo() {
            try {
                var response = [];

                console.log(id)
                if(!id) {
                    response = await api.get('/quizzes');
                } else {
                    response = await api.get(`/quizzes/${id}`);
                }
    
                setQuizzes(response.data);
            } catch (error) {
                setError(error);
            }
        }

        getInfo();
    }, [id]);

    return (
        <div id="container">
            <Sidebar />

            <div className="page">
                <Header onProfile={false} />
                
                <section>
                    <div className="content">
                        <div className="items-list" style={{ flexWrap: 'wrap', overflowY: 'auto' }}>
                            {quizzes.map(quiz => (
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

                        <p className="error-message">{error}</p>
                    </div>
                </section>

                <FloatButton />
            </div>
        </div>
    )
}