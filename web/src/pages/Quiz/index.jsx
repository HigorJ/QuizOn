import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiLogOut, FiShare2 } from 'react-icons/fi';
import api from '../../services/api.js';

import Score from '../../components/Score/index';

import './quiz.css';

export default function Quiz() {
    const { id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [alternatives, setAlternatives] = useState([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getQuizInfo() {
            try {
                const response = await api.get(`/quiz/${id}/questions`);

                if(!response.data) {
                    return setError(response);
                }

                setQuestions(response.data);
            } catch (error) {
                setError(error)
            }
        }

        getQuizInfo();
    }, [id]);

    useEffect(() => {
        async function getAlternatives() {
            try {
                if(questions[currentQuestion]) {
                    let question = questions[currentQuestion].question_id;

                    const response = await api.get(`/quiz/${id}/questions/${question}`);

                    if(!response.data) {
                        return setError(response);
                    }

                    setAlternatives(response.data);
                }
                
            } catch (error) {
                setError(error);
            }
        }

        if(questions[0] !== undefined) {
            getAlternatives();
        }
    }, [id, questions, currentQuestion]);

    function toNextQuestion() {
        setCurrentQuestion(currentQuestion + 1);

        if(currentQuestion >= questions.length - 1) {
            setError("You finished the quiz!");
        }
    }

    function handleCheckAnswer(is_correct) {
        toNextQuestion();

        if(is_correct && currentQuestion < questions.length) {
            setScore(score + 1);
        }
    }

    return (
        <div id="container">
            <Score score={score} />

            <section>
                <header>
                    <Link style={{ margin: "10px" }} to="#">
                        <FiShare2 size={32} color="#2480D6" />
                    </Link>

                    <Link style={{ margin: "10px" }} to="/lobby">
                        <FiLogOut size={32} color="#CC5050" />
                    </Link>                    
                </header>
            
                <div className="content">
                    { (questions.length > 0 && currentQuestion < questions.length) && (
                        <>
                            <h1 className="quiz-question-title">{questions[currentQuestion].question_text}</h1>

                            <img className="quiz-question-image" src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="Quiz do matrix" />
        
                            {alternatives.map((item, index) => (
                                <div key={item.alternative_id} className="option-field" onClick={() => handleCheckAnswer(item.is_correct)}>
                                    <p>{index + 1}. </p>
                                    <p className="text-option">{item.alternative_text}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <p className="error-message">{error}</p>
                <div className="div-timer">
                    <p>Timer: 10s</p>
                </div>
            </section>
        </div>
    )
}