import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './header.css';

export default function Header({ onProfile }) {

    const [user, setUser] = useState({});

    useEffect(() => {
        function getUserInfo() {
            setUser(JSON.parse(localStorage.getItem("@application_user")));
        }

        getUserInfo();
    }, [onProfile]);

    const history = useHistory();

    return (
        <>
            { !onProfile ? (
                <header style={{ justifyContent: 'flex-end' }}>
                    <Link className="header-link-button" to="/profile">
                        <p>{user.name}</p>
                        <img src="https://image.shutterstock.com/image-vector/hand-drawn-modern-man-avatar-600w-1373616899.jpg" alt="User" />
                    
                        <FiChevronRight size={32} color="#474747" />
                    </Link>
                </header>
            ) : (
                <header style={{ justifyContent: 'flex-start' }}>
                    <div className="header-link-button" onClick={() => history.goBack()}>
                        <FiChevronLeft size={28} color="#474747" />
                        <p>Lobby</p>
                    </div>
                </header>
            )}
        </>
    )
}