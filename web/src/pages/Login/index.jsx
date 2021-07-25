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

        try {
            const data = {
                email,
                password
            }
    
            const response = await api.post('/login', data);
    
            localStorage.setItem('@application_user', JSON.stringify(response.data.user));
            localStorage.setItem('@application_token', response.data.token);
            
            history.push('/lobby');
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div id="form-container">
            <div className="logo">
                <h1>QuizOn</h1>
                <p>Play with your friends!</p>
                <p>(or make new friends :D)</p>
            </div>

            <form onSubmit={(e) => handleLogin(e)}>
                <h1>Enter to your account</h1>

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

                <button type="submit">Log in</button>

                <Link to="/signup" className="styled-link">Sign Up</Link>
                <Link to="/forgotPassword" className="styled-link">Forgot Password?</Link>
            </form>
        </div>
    )
}