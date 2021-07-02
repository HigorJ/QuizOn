import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api.js';

import Sidebar from '../../components/Sidebar/sidebar';
import Header from '../../components/Header/header';
import FloatButton from '../../components/FloatButton/floatButton';
import { useHistory } from 'react-router-dom';

import './create-quiz.css';

export default function CreateRoom() {

    const history = useHistory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("@application_user")));
    }, []);

    async function handleCreateQuiz(e) {
        e.preventDefault();

        const data = {
            name,
            description,
            user_id: user.user_id
        }

        const response = await api.post('/createQuiz', data);

        if(!response.data) {
            return setError(response);
        }

        history.push(`/create-quiz/${response.data[0]}/questions`);
    }

    return (
        <div id="container">
            <Sidebar />

            <section>
                <Header onProfile={false} />
            
                <form className="create-quiz-form" onSubmit={handleCreateQuiz}>
                    <img 
                        className="create-quiz-image" 
                        src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" 
                        alt="Room" 
                    />

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
    )
}