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

    const [error, setError] = useState("");
    const [quizInfo, setQuizInfo] = useState("");

    useEffect(() => {
        async function getQuizInfo() {
            const response = await api.get(`/quiz/${id}`);

            if(!response.data) {
                return setError(response);
            }

            setQuizInfo(response.data);
        }

        getQuizInfo();
    }, [id]);

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

                <p className="error-message">{error}</p>
            </section>

            <FloatButton />
        </div>
    )
}