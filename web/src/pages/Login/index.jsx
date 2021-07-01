import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api.js';

export default function Login() {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            email,
            password
        }

        const response = await api.post('/getUser', data);

        if(!response.data) {
            return setError(response);
        }

        localStorage.setItem('@application_user', JSON.stringify(response.data));

        history.push('/lobby');
    }

    return (
        <div id="container">
            <div className="logo">
                <h1>QuizOn</h1>
                <p>Play with your friends!</p>
                <p>(or make new friends :D)</p>
            </div>

            <form onSubmit={(e) => handleLogin(e)}>
                <h1>Enter to your account</h1>

                <div className="input-field">
                    <input name="email" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">Username</label>
                </div>
                
                <div className="input-field">
                    <input name="password" id="password" type="password"  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                    <label htmlFor="password">Password</label>
                </div>

                <p className="error-message">{error}</p>

                <button type="submit">Log in</button>

                <Link to="/lobby" className="styled-link">Enter as a guest</Link>
                <Link to="/signup" className="styled-link">Sign Up</Link>
            </form>
        </div>
    )
}