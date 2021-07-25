import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft, FiX, FiCheck, FiPlus, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatButton from '../../components/FloatButton';

import './create-questions.css';

export default function CreateQuestions() {
    const history = useHistory();
    const { id } = useParams();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [question, setQuestion] = useState({ question_text: "", alternatives: [] });
    const [allQuestions, setAllQuestions] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                let response = await api.get(`/quiz/${id}/questions`);

                let tmpQuestions = response.data;
    
                if(tmpQuestions.length > 0) {
                    await Promise.all(tmpQuestions.map(async (tmpQuestion) => {
                        let altResult = await api.get(`/quiz/${id}/questions/${tmpQuestion.question_id}`);
        
                        tmpQuestion.alternatives = altResult.data;
                    }));
        
                    setCurrentQuestion(tmpQuestions.length - 1);
                    setQuestion(tmpQuestions[tmpQuestions.length - 1]);
                    setAllQuestions(tmpQuestions);
                }
            } catch (error) {
                setError(error);
            }
        }

        getData();
    }, [id]);

    function handlePreviousQuestion() {
        if(currentQuestion > 0) {
            let previousQuestion = allQuestions[currentQuestion - 1];

            setQuestion(previousQuestion);
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    async function handleNextQuestion() {
        if(checkCorrects() !== 1) {
            return setError("Choose one alternative to be correct.");
        }

        if(!question.question_id) {
            await handleCreateQuestion();
        } else {
            await handleUpdateQuestion();
        }

        if(!allQuestions[currentQuestion + 1]) {
            setQuestion({ question_text: "", alternatives: [] });
        } else {
            setQuestion(allQuestions[currentQuestion + 1]);
        }

        setError("");
        setCurrentQuestion(currentQuestion + 1);  
    }

    async function handleUpdateQuestion() {
        var allQuestionsAux = allQuestions;

        const response = await api.put(`/quiz/${id}/${question.question_id}`, question);

        if(!response.data) {
            return setError(response);
        }

        allQuestionsAux[currentQuestion] = question;

        setAllQuestions(allQuestionsAux);
    }

    async function handleCreateQuestion() {
        const response = await api.post(`/quiz/${id}/createQuestions`, question);
        
        if(!response.data) {
            return setError(response);
        }

        setAllQuestions([ 
            ...allQuestions,
            response.data
        ]);
    }

    async function handleRemoveQuestion() {
        if(question.question_id) {
            await api.delete(`/quiz/${id}/${question.question_id}`);
        }

        setAllQuestions(allQuestions.filter((value, index) => index !== currentQuestion));
        setQuestion(allQuestions[currentQuestion - 1]);
        setCurrentQuestion(currentQuestion - 1);
    }

    function handleAddAlternative() {
        setQuestion({ 
            ...question, 
            alternatives: [
                ...question.alternatives, 
                { alternative_text: "", is_correct: false } 
            ] 
        });
    }

    function handleSaveAlternative(e, index) {
        var aux = question.alternatives;

        aux[index].alternative_text = e.target.value;

        setQuestion({ ...question, alternatives: aux });
    }

    function handleSaveCorrect(e, index) {
        var aux = question.alternatives;

        aux[index].is_correct = e.target.checked;

        setQuestion({ ...question, alternatives: aux });
    }

    function handleExitQuiz() {
        history.push('/lobby');
    }

    async function handleSubmitQuiz() {
        if(checkCorrects() !== 1) {
            return setError("Choose one alternative to be correct.");
        }

        await handleCreateQuestion();

        history.push('/lobby');
    }

    function checkCorrects() {
        var cont = 0;

        question.alternatives.forEach(alternative => {
            if(alternative.is_correct) {
                cont++;
            }
        });

        return cont;
    }

    return (
        <div id="container">
            <Sidebar />
            
            <div className="page">
                <Header onProfile={false} />

                <section>
                    <div className="create-questions-form">
                        <h1>Question {currentQuestion + 1}</h1>

                        <div className="pre-configs-quiz">
                            <div className="input-field">
                                <input 
                                    name="question-text" 
                                    id="question-text" 
                                    type="text" 
                                    placeholder="question-text" 
                                    onChange={(e) => setQuestion({ ...question, question_text: e.target.value })} 
                                    value={question.question_text} 
                                />
                                <label htmlFor="question-text">Question Text</label>
                            </div>

                            <button className="remove-question" onClick={handleRemoveQuestion}>
                                <FiTrash2 size={32} color="#CC5050" />
                            </button>
                        </div>

                        {question.alternatives.map((value, index) => (
                            <div key={index} className="alternatives">
                                <FiChevronRight size={32} color="#2480D6" />
                                <div className="input-field">
                                    <input 
                                        name="alternative-text" 
                                        type="text" 
                                        placeholder="alternative-text" 
                                        value={value.alternative_text} 
                                        onChange={(e) => handleSaveAlternative(e, index)} 
                                    />
                                    <label htmlFor="alternative-text">Alternative {index + 1}</label>
                                </div>

                                <div className="input-check-box">
                                    <input 
                                        type="checkbox" 
                                        className="check-answer" 
                                        checked={value.is_correct}
                                        onChange={(e) => handleSaveCorrect(e, index)} 
                                    />
                                </div>
                            </div>
                        ))}

                        <button onClick={handleAddAlternative}>
                            <FiPlus size={32} color="#FFFFFF" />
                        </button>

                        <p className="error-message">{error}</p>

                        <div className="alternatives-buttons">
                            <button className="button-circle" onClick={handlePreviousQuestion}>
                                <FiChevronLeft size={32} color="#FFFFFF" />
                            </button>

                            <button 
                                className="button-circle" 
                                style={{ backgroundColor: "#CC5050" }} 
                                onClick={handleExitQuiz}
                            >
                                <FiX size={32} color="#FFFFFF" />
                            </button>

                            <button 
                                className="button-circle" 
                                style={{ backgroundColor: "#1CD20C" }} 
                                onClick={handleSubmitQuiz}
                            >
                                <FiCheck size={32} color="#FFFFFF" />
                            </button>

                            <button className="button-circle" onClick={handleNextQuestion}>
                                <FiChevronRight size={32} color="#FFFFFF" />
                            </button>
                        </div>
                    </div>
                </section>

                <FloatButton />
            </div>
        </div>
    )
}