import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiLogOut, FiShare2 } from 'react-icons/fi';
import api from '../../services/api.js';

import QuizEnd from '../../components/QuizEnd/index.jsx';
import Score from '../../components/Score/index';

import './quiz.css';

export default function Quiz() {
    const { id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [alternatives, setAlternatives] = useState([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState("");
    const [end, setEnd] = useState(false);
    const [timer, setTimer] = useState(20);

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

    useEffect(() => {
        if(timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1)
            }, 1000);
    
            return () => {
                clearInterval(interval);
            }
        }
    }, [timer]);

    function toNextQuestion() {
        setCurrentQuestion(currentQuestion + 1);

        if(currentQuestion >= questions.length - 1) {
            setEnd(true);
        }

        setTimer(20);
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

            <div className="page">
                <header>
                    <Link style={{ margin: "10px" }} to="#">
                        <FiShare2 size={32} color="#2480D6" />
                    </Link>

                    <Link style={{ margin: "10px" }} to="/lobby">
                        <FiLogOut size={32} color="#CC5050" />
                    </Link>                    
                </header>

                <section>
                    <div className="content">
                        {end && (
                            <QuizEnd score={score} />
                        )}

                        {(questions.length > 0 && currentQuestion < questions.length) && (
                            <>
                                <h1 className="quiz-question-title">{questions[currentQuestion].question_text}</h1>
            
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
                        <p>Timer: {timer}s</p>
                    </div>
                </section>
            </div>
        </div>
    )
}