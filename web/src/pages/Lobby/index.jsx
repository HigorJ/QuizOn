import React, { useEffect, useState } from 'react';
import api from '../../services/api.js';

import Sidebar from '../../components/Sidebar/sidebar';
import Header from '../../components/Header/header';
import FloatButton from '../../components/FloatButton/floatButton';
import QuizzesList from '../../components/QuizzesListComponent';

import '../../styles/pages.css';

export default function Lobby() {

    const [allQuizzes, setAllQuizzes] = useState([]);
    const [yourQuizzes, setYourQuizzes] = useState([]);

    useEffect(() => {
        async function getQuizInfo() {
            const user = JSON.parse(localStorage.getItem("@application_user"));

            const AllQ = await api.get('/quizzes');
            const YourQ = await api.get(`/quizzes/${user.user_id}`);

            if(!AllQ.data || !YourQ.data) {
                return;
            }

            setAllQuizzes(AllQ.data);
            setYourQuizzes(YourQ.data)
        }

        getQuizInfo();
    }, []);

    return (
        <div id="lobby">
            <Sidebar />

            <section>
                <Header onProfile={false} />

                <QuizzesList title="All Quizzes" data={allQuizzes} />

                <QuizzesList title="Your Quizzes" data={yourQuizzes} />
            </section>

            <FloatButton />
        </div>
    )
}