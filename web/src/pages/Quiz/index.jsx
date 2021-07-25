import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiLogOut, FiShare2 } from 'react-icons/fi';

import socket from '../../services/socket.js';
import api from '../../services/api.js';
import QuizEnd from '../../components/QuizEnd/index.jsx';
import Score from '../../components/Score/index';

import './quiz.css';

export default function Quiz() {
    const history = useHistory();
    const { id, room } = useParams();

    const [user, setUser] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [alternatives, setAlternatives] = useState([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState("");
    const [end, setEnd] = useState(false);
    const [timer, setTimer] = useState(20);
    const [wasAnswered, setWasAnswered] = useState(false);
    const [checkToNextQuestion, setCheckToNextQuestion] = useState(false);

    const toNextQuestion = useCallback(() => {
        if(currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimer(20);
            setWasAnswered(false);
            setCheckToNextQuestion(false);
        } else {
            setEnd(true);
        }
    }, [currentQuestion, questions.length]);

    useEffect(() => {
        async function getQuizInfo() {
            try {
                setUser(JSON.parse(localStorage.getItem("@application_user")));
                const response = await api.get(`/quiz/${id}/questions`);

                if(!response.data) {
                    return setError(response);
                }

                setQuestions(response.data);

                socket.onToNextQuestion(setCheckToNextQuestion);
            } catch (error) {
                setError(error)
            }
        }

        getQuizInfo();
    }, [id]);    

    useEffect(() => {
        if(checkToNextQuestion) {
            toNextQuestion();
        }
    }, [checkToNextQuestion, toNextQuestion]);

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
        if(timer > 0 && !end) {
            const interval = setInterval(() => {
                setTimer(timer - 1)
            }, 1000);
    
            return () => {
                clearInterval(interval);
            }
        } else {
            setCheckToNextQuestion(true);
        }
    }, [timer, end]);

    function handleCheckAnswer(is_correct) {
        if(!wasAnswered) {
            if(is_correct && currentQuestion < questions.length) {
                setScore(score + 1);
            }
    
            socket.answer({ 
                is_correct, 
                room_name: room, 
                user_id: user.user_id 
            });
    
            socket.checkAnswers(room);
            setWasAnswered(true);
        }
    }

    function handleExitQuiz() {
        socket.participantLeft({
            user_id: user.user_id,
            room_name: room
        });

        history.push('/lobby');
    }

    return (
        <div id="container">
            <Score score={score} room_name={room} />

            <div className="page">
                <header>
                    <Link style={{ margin: "10px" }} to="#">
                        <FiShare2 size={32} color="#2480D6" />
                    </Link>

                    <div style={{ margin: "10px", cursor: "pointer" }} onClick={handleExitQuiz}>
                        <FiLogOut size={32} color="#CC5050" />
                    </div>                    
                </header>

                <section>
                    <div className="content">
                        {end && (
                            <QuizEnd score={score} room={room} user_id={user.user_id} />
                        )}

                        {(questions.length > 0 && !end) && (
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