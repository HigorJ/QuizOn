import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api.js';

import Sidebar from '../../components/Sidebar/sidebar';
import Header from '../../components/Header/header';
import FloatButton from '../../components/FloatButton/floatButton';

import './profile.css';

export default function Profile() {
    const history = useHistory();

    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        function getUserInfo() {
            setUser(JSON.parse(localStorage.getItem("@application_user")));
        }

        getUserInfo();
    }, []);

    function handleCheckButton() {
        if(!edit) {
            return setEdit(!edit);
        }

        if(!name || !password || !email) {
            return setError("All fields are required!");
        }

        handleUpdateInfo();
    }

    async function handleUpdateInfo() {
        try {
            const data = {
                name,
                email,
                password
            }
    
            const response = await api.put(`/updateUser/${user.user_id}`, data);
    
            if(!response.data) {
                return setError(response);
            }
    
            localStorage.setItem("@application_user", JSON.stringify(response.data.newData));
    
            history.push('/lobby');
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div id="container">
            <Sidebar />

            <section>
                <Header  onProfile={true} />

                <div className="content">

                    <img className="user-image" src="https://image.shutterstock.com/image-photo/hand-hospital-medical-expert-shows-600w-559764574.jpg" alt="User" />

                    <input 
                        disabled={!edit} 
                        className="profile-input-field" 
                        placeholder={`${user.name}`} 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />

                    <input 
                        type="email" 
                        disabled={!edit} 
                        className="profile-input-field" 
                        placeholder={`${user.email}`} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    <input 
                        type="password" 
                        disabled={!edit} 
                        className="profile-input-field" 
                        placeholder="password verify" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}  
                    />

                    <p className="error-message">{error}</p>

                    <div className="profile-buttons">
                        <button onClick={handleCheckButton}>{ edit ? "Update" : "Edit" }</button>
                        <button className="delete-button">Delete account :(</button>
                    </div>
                </div>

                <FloatButton />
            </section>
        </div>
    )   
}