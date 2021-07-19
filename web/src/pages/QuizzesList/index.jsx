import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatButton from '../../components/FloatButton';

import '../../styles/pages.css';
import './quizzes-list.css'

export default function QuizList() {

    let { title } = useParams();
    const history = useHistory();
    const tempID = 1;

    return (
        <div id="container">
            <Sidebar />

            <div className="page">
                <Header onProfile={false} />
                
                <section>
                    <div className="content">
                        <Link className="quizzes-list-title" to={`/quizzes/${title}`}>
                            { title }
                        </Link>

                        <div className="current-quiz-items">
                            <div className="quiz-item" onClick={() => history.push(`/quizzes/all/${tempID}`)}>
                                <img src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="Quiz do matrix" />
                                <p>Quiz do Matrix</p>
                            </div>

                            <div className="quiz-item" onClick={() => history.push(`/quizzes/all/${tempID}`)}>
                                <img src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="Quiz do matrix" />
                                <p>Quiz do Matrix</p>
                            </div>

                            <div className="quiz-item" onClick={() => history.push(`/quizzes/all/${tempID}`)}>
                                <img src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="Quiz do matrix" />
                                <p>Quiz do Matrix</p>
                            </div>

                            <div className="quiz-item" onClick={() => history.push(`/quizzes/all/${tempID}`)}>
                                <img src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="Quiz do matrix" />
                                <p>Quiz do Matrix</p>
                            </div>

                            <div className="quiz-item" onClick={() => history.push(`/quizzes/all/${tempID}`)}>
                                <img src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="Quiz do matrix" />
                                <p>Quiz do Matrix</p>
                            </div>

                            <div className="quiz-item" onClick={() => history.push(`/quizzes/all/${tempID}`)}>
                                <img src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="Quiz do matrix" />
                                <p>Quiz do Matrix</p>
                            </div>

                            <div className="quiz-item" onClick={() => history.push(`/quizzes/all/${tempID}`)}>
                                <img src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="Quiz do matrix" />
                                <p>Quiz do Matrix</p>
                            </div>

                            <div className="quiz-item" onClick={() => history.push(`/quizzes/all/${tempID}`)}>
                                <img src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="Quiz do matrix" />
                                <p>Quiz do Matrix</p>
                            </div>
                        </div>
                    </div>
                </section>

                <FloatButton />
            </div>
        </div>
    )
}