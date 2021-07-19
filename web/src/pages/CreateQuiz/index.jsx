import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api.js';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatButton from '../../components/FloatButton';
import PhotoInput from '../../components/PhotoInput';

import './create-quiz.css';

export default function CreateRoom() {

    const history = useHistory();
    const { id } = useParams();

    const [photo, setPhoto] = useState("");
    const [quizImage, setQuizImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("@application_user")));
    }, []);

    useEffect(() => {
        async function getInfo() {
            const result = await api.get(`/quiz/${id}`);

            let quiz = result.data;

            setName(quiz.name);
            setDescription(quiz.description);
            setQuizImage(quiz.quiz_photo);
        }

        if(id) {
            getInfo();
        }
    }, [id]);

    async function handleCreateQuiz(e) {
        e.preventDefault();

        const data = new FormData();

        data.append('name', name);
        data.append('description', description);
        data.append('quiz_photo', photo);

        var response;

        if(id !== undefined) {
            response = await api.put(`/updateQuiz/${id}`, data, {
                headers: {
                    user_id: user.user_id
                }
            });
        } else {
            response = await api.post('/createQuiz', data, {
                headers: {
                    user_id: user.user_id
                }
            });
        }

        if(!response.data) {
            return setError(response);
        }

        let idQuiz = id === undefined ? response.data : id;

        history.push(`/create-quiz/${idQuiz}/questions`);
    }

    return (
        <div id="container">
            <Sidebar />

            <div className="page">
                <Header onProfile={false} />

                <section>
                    <form className="create-quiz-form" onSubmit={handleCreateQuiz}>
                        <PhotoInput setPhoto={setPhoto} imageUrl={quizImage} />
                        
                        <div className="input-field">
                            <input 
                                name="quiz-name" 
                                id="quiz-name" 
                                type="text" 
                                placeholder="Quiz name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <label htmlFor="quiz-name">Quiz name</label>
                        </div>

                        <div className="input-field">
                            <textarea 
                                name="quiz-description" 
                                id="quiz-description" 
                                type="text" 
                                placeholder="quiz description" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                            <label htmlFor="quiz-description">Description</label>
                        </div>

                        <button className="button-circle" type="submit">
                            <FiChevronRight size={32} color="#FFFFFF" />
                        </button>

                        <p className="error-message">{error}</p>                    
                    </form>
                </section>

                <FloatButton />
            </div>
        </div>
    )
}