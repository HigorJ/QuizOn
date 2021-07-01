import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft, FiX, FiCheck, FiPlus } from 'react-icons/fi';

import api from '../../services/api';
import Sidebar from '../../components/Sidebar/sidebar';
import Header from '../../components/Header/header';
import FloatButton from '../../components/FloatButton/floatButton';

import './create-questions.css';

export default function CreateQuestions() {
    const history = useHistory();
    const { id } = useParams();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [question, setQuestion] = useState({ title: "", alternatives: [] });
    const [allQuestions, setAllQuestions] = useState([]);
    const [error, setError] = useState([]);
    const [totalCorrect, setTotalCorrect] = useState(0);

    function handlePreviousQuestion() {
        if(currentQuestion > 0) {
            let [previousQuestion] = allQuestions.filter((v, index) => index === currentQuestion - 1);

            setQuestion(previousQuestion);

            setCurrentQuestion(currentQuestion - 1);
        }
    }

    function handleNextQuestion() {
        if(totalCorrect !== 1) {
            return setError("Only one alternative can be correct!");
        }

        let auxAllQuestions = allQuestions;

        auxAllQuestions[currentQuestion] = question;

        setAllQuestions(auxAllQuestions);

        if(allQuestions[currentQuestion + 1] === undefined) {
            setQuestion({ title: "", alternatives: [] });
        } else {
            setQuestion(allQuestions[currentQuestion + 1]);
        }
        
        setError("");
        setTotalCorrect(0);
        setCurrentQuestion(currentQuestion + 1);
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

        if(e.target.checked) {
            setTotalCorrect(totalCorrect + 1);
        } else if(totalCorrect !== 0) {
            setTotalCorrect(totalCorrect - 1);
        }

        setQuestion({ ...question, alternatives: aux });
    }

    function handleExitQuiz() {
        history.push('/lobby');
    }

    async function handleSubmitQuiz() {

        var data = {
            questions: allQuestions
        }

        if(question.alternatives.length > 0 && allQuestions[currentQuestion + 1] === undefined) {
            data.questions.push(question);
        }

        console.log(data);


        //await api.post(`/quiz/${id}/createQuestions`, data);

        //history.push('/lobby');
    }

    return (
        <div id="lobby">
            <Sidebar />

            <section>
                <Header  onProfile={false} />
            
                <div className="create-questions-form">
                    <h1>Question {currentQuestion + 1}</h1>

                    <div className="pre-configs-quiz">
                        <div className="input-field">
                            <input name="question-text" id="question-text" type="text" placeholder="question-text" onChange={(e) => setQuestion({ ...question, title: e.target.value })} value={question.title} />
                            <label htmlFor="question-text">Question Text</label>
                        </div>
                    </div>

                    {question.alternatives.map((value, index) => (
                        <div key={index} className="alternatives">
                            <FiChevronRight size={32} color="#2480D6" />
                            <div className="input-field">
                                <input name="alternative-text" type="text" placeholder="alternative-text" value={value.alternative_text} onChange={(e) => handleSaveAlternative(e, index)} />
                                <label htmlFor="alternative-text">Alternative {index + 1}</label>
                            </div>

                            <div className="input-check-box">
                                <input type="checkbox" className="check-answer" value={value.is_correct} onChange={(e) => handleSaveCorrect(e, index)} />
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

                        <button className="button-circle" style={{ backgroundColor: "#CC5050" }} onClick={handleExitQuiz}>
                            <FiX size={32} color="#FFFFFF" />
                        </button>

                        <button className="button-circle" style={{ backgroundColor: "#1CD20C" }} onClick={handleSubmitQuiz}>
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
    )
}