import React, { useEffect, useState } from 'react';
import api from '../../services/api.js';
import socket from '../../services/socket.js';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatButton from '../../components/FloatButton';
import QuizzesListComponent from '../../components/QuizzesListComponent';
import RoomsList from '../../components/RoomsListComponent';

import '../../styles/pages.css';

export default function Lobby() {
    const [user, setUser] = useState({});
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [yourQuizzes, setYourQuizzes] = useState([]);
    const [allRooms, setAllRooms] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        async function getQuizInfo() {
            const user = JSON.parse(localStorage.getItem("@application_user"));
            setUser(user);
            
            socket.welcome(user.user_id);
            socket.getRooms();
            socket.onAllRooms(setAllRooms);

            try {
                const AllQ = await api.get('/quizzes');
                const YourQ = await api.get(`/quizzes/${user.user_id}`);

                setAllQuizzes(AllQ.data);
                setYourQuizzes(YourQ.data);
            } catch (error) {
                setError(error);
            }
        }

        getQuizInfo();
    }, []);

    return (
        <div id="container">
            <Sidebar />

            <div className="page">
                <Header onProfile={false} />

                <section>
                    <RoomsList title="All Rooms" data={allRooms} />

                    <QuizzesListComponent title="All Quizzes" data={allQuizzes} />

                    <QuizzesListComponent title="Your Quizzes" data={yourQuizzes} user_id={user.user_id} />

                    <p className="error-message">{error}</p>
                </section>

                <FloatButton />
            </div>
        </div>
    )
}