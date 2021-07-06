import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api.js';
import PhotoInput from '../../components/PhotoInput/index.jsx';

export default function Register() {
    const history = useHistory();

    const [photo, setPhoto] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(e) {
        e.preventDefault();

        const data = new FormData();

        data.append('name', username);
        data.append('email', email);
        data.append('password', password);
        data.append('user_photo', photo);

        const response = await api.post('/createUser', data);
    
        if(!response.data) {
            return setError(response);
        }

        history.push('/');
    }

    return (
        <div id="form-container">
            <div className="logo">
                <h1>QuizOn</h1>
                <p>Keep calm and give me your data</p>
                <p>:)</p>
            </div>

            <form onSubmit={(e) => handleRegister(e)}>
                <h1>Sign Up</h1>

                <PhotoInput setPhoto={setPhoto} />

                <div className="input-field">
                    <input 
                        name="username" 
                        id="username" 
                        type="text"  
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="input-field">
                    <input 
                        name="email" 
                        id="email" 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label htmlFor="email">Email</label>
                </div>
                
                <div className="input-field">
                    <input 
                        name="password" 
                        id="password" 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <p className="error-message">{error}</p>

                <button type="submit">Sing Up</button>

                <Link to="/" className="styled-link">Return to Log in</Link>
            </form>
        </div>
    )
}