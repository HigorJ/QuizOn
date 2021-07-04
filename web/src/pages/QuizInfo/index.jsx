import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api.js';

import Sidebar from '../../components/Sidebar/sidebar';
import Header from '../../components/Header/header';
import FloatButton from '../../components/FloatButton/floatButton';

import './quiz-info.css';

export default function QuizInfo() {

    const history = useHistory();
    const { id } = useParams();
    const ROOM_ID = 1;

    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [quizInfo, setQuizInfo] = useState("");

    useEffect(() => {
        async function getQuizInfo() {
            setUser(JSON.parse(localStorage.getItem("@application_user")));
            const response = await api.get(`/quiz/${id}`);

            if(!response.data) {
                return setError(response);
            }

            setQuizInfo(response.data);
        }

        getQuizInfo();
    }, [id]);

    function handleUpdateQuiz() {
        history.push(`/create-quiz/${quizInfo.quiz_id}/questions`);
    }

    async function handleDeleteQuiz() {
        try {
            let response = await api.delete(`/deleteQuiz/${id}`, {
                headers: { 
                    user_id: user.user_id
                }
            });

            if(!response.data) {
                return setError(response);
            }

            history.push('/lobby');
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div id="container">
            <Sidebar />

            <section>
                <Header  onProfile={false} />
            
                <div className="content">
                    <img className="quiz-image" src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="Quiz do matrix" />

                    <h1 className="quiz-title">{quizInfo.name}</h1>

                    <p className="quiz-description">{quizInfo.description}</p>
                </div>

                <div className='quiz-buttons'>
                    <button onClick={() => history.push(`/quizzes/rooms/create-room`)}>Create room</button>
                    <button onClick={() => history.push(`/quizzes/all/${id}/${ROOM_ID}`)}>Random room</button>
                </div>

                { quizInfo.author === user.user_id && (
                    <div className="edit-quiz">
                        <button className="btn-edit-quiz" onClick={handleUpdateQuiz}>Edit Quiz</button>
                        <button className="btn-delete-quiz" onClick={handleDeleteQuiz}>Delete Quiz</button>
                    </div>
                )}

                <p className="error-message">{error}</p>
            </section>

            <FloatButton />
        </div>
    )
}