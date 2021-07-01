import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css';

export default function Sidebar() {
    return (
        <aside>
            <Link to="/lobby" className="link">
                <h1>QuizOn</h1>
            </Link>

            <div className="room-code">
                <p>Do you have any code?</p>
                <p>Paste it here!</p>
                <div className="input-field">
                    <input name="code" id="code" type="text"  placeholder="Room code" />
                    <label htmlFor="code">Room Code</label>
                </div>

                <button type="submit">Join</button>
            </div>
        </aside>
    )
}