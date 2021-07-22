import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api.js';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    async function handleSendEmail(e) {
        e.preventDefault();

        try {
            await api.post('/forgotPassword', {
                email
            });
    
            setError("");
            setMessage("We have sent an e-mail to recover your password");
        } catch (error) {
            setError(error);   
        }
    }

    return (
        <div id="form-container">
            <div className="logo">
                <h1>QuizOn</h1>
                <p>Don't worry, we will send you an email.</p>
            </div>

            <form onSubmit={(e) => handleSendEmail(e)}>
                <h1>Forgot password</h1>

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

                <p>{message}</p>
                <p className="error-message">{error}</p>

                <button type="submit">Send me an email</button>

                <Link to="/" className="styled-link">Back to Login</Link>
            </form>
        </div>
    )
}