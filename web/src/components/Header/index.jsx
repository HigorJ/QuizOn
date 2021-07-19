import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiLogOut } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './header.css';

export default function Header({ onProfile }) {
    const history = useHistory();

    const [user, setUser] = useState({});

    useEffect(() => {
        function getUserInfo() {
            setUser(JSON.parse(localStorage.getItem("@application_user")));
        }

        getUserInfo();
    }, [onProfile]);

    function handleLogout() {
        localStorage.removeItem("@application_user");

        history.push('/');
    }

    return (
        <>
            { !onProfile ? (
                <header>
                    <Link className="header-link-button" to="/profile">
                        <FiChevronLeft size={32} color="#474747" />
                        <p>{user.name}</p>

                        {user.user_photo === "" ? null : (
                            <img 
                                src={user.user_photo} 
                                alt="User" 
                            />
                        )}
                    </Link>

                    <div className="header-link-button-logout" onClick={handleLogout} to="/profile">
                        <FiLogOut size={32} color="#CC5050" />
                    </div>
                </header>
            ) : (
                <header>
                    <div className="header-link-button" onClick={() => history.goBack()}>
                        <FiChevronLeft size={32} color="#474747" />
                        <p>Lobby</p>
                    </div>
                    
                    <div className="header-link-button-logout" onClick={handleLogout}>
                        <FiLogOut size={32} color="#CC5050" />
                    </div>
                </header>
            )}
        </>
    )
}