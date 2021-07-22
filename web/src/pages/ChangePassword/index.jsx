import React, { useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import api from '../../services/api.js';

export default function ChangePassword() {

    const history = useHistory();
    const { token } = useParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleChangePassword(e) {
        e.preventDefault();

        try {
            await api.post(`/changePassword/${token}`, {
                email,
                newPassword: password
            });
    
            history.push('/');
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div id="form-container">
            <div className="logo">
                <h1>QuizOn</h1>
                <p>Enter your new password :).</p>
            </div>

            <form onSubmit={(e) => handleChangePassword(e)}>
                <h1>Change password</h1>

                <div className="input-field">
                    <input 
                        name="email" 
                        id="email" 
                        type="email" 
                        placeholder="Confirm your Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label htmlFor="email">Confirm your Email</label>
                </div>
                {console.log(token)}

                <div className="input-field">
                    <input 
                        name="new-password" 
                        id="password" 
                        type="password" 
                        placeholder="New Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <label htmlFor="new-password">New Password</label>
                </div>

                <p className="error-message">{error}</p>

                <button type="submit">Change password</button>

                <Link to="/" className="styled-link">Back to Login</Link>
            </form>
        </div>
    )
}