import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PhotoInput from '../../components/PhotoInput';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatButton from '../../components/FloatButton';

import api from '../../services/api.js';
import './profile.css';

export default function Profile() {
    const history = useHistory();

    const [user, setUser] = useState({});
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');

    const [deleteAccount, setDeleteAccount] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        function getUserInfo() {
            setUser(JSON.parse(localStorage.getItem("@application_user")));
        }

        getUserInfo();
    }, []);

    async function handleUpdateInfo() {
        if(!updateData) {
            setDeleteAccount(false);
            setChangePassword(false);
            return setUpdateData(true);
        }

        try {
            if(!name || !password || !email) {
                return setError("All fields are required!");
            }

            const data = new FormData();

            data.append('name', name);
            data.append('email', email);
            data.append('password', password);
            data.append('user_photo', photo);
    
            const response = await api.put(`/updateUser/${user.user_id}`, data);
    
            localStorage.setItem("@application_user", JSON.stringify(response.data.newData));
    
            history.push('/lobby');
        } catch (error) {
            setError(error);
        }
    }

    async function handleChangePassword() {
        if(!changePassword) {
            setUpdateData(false);
            setDeleteAccount(false);
            return setChangePassword(true);
        }

        try {
            if(!password || !newPassword) {
                return setError("All fields are required!");
            }

            await api.put('/changePassword', {
                user_id: user.user_id,
                password,
                newPassword
            });
    
            history.push('/lobby');
        } catch (error) {
            setError(error);
        }
    }

    async function handleDeleteAccount() {
        if(!deleteAccount) {
            setUpdateData(false);
            setChangePassword(false);
            return setDeleteAccount(true);
        }

        try {
            if(!password) {
                return setEmail('Password is required!');
            }

            await api.delete(`/deleteUser/${user.user_id}`, {
                data: {
                    password,
                }
            });

            localStorage.clear();

            history.push('/');
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div id="container">
            <Sidebar />

            <div className="page">
                <Header onProfile={true} />
                
                <section>
                    <div className="content">
                        <PhotoInput setPhoto={setPhoto} imageUrl={user.user_photo !== "" ? user.user_photo : null} />

                        { (!deleteAccount && !changePassword) && (
                            <>
                                <input 
                                    disabled={!updateData} 
                                    className="profile-input-field" 
                                    placeholder={`${user.name}`} 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                    
                                <input 
                                    type="email" 
                                    disabled={!updateData} 
                                    className="profile-input-field" 
                                    placeholder={`${user.email}`} 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                    
                            </>
                        )}

                        { changePassword && (
                            <>
                                <input 
                                    type="password" 
                                    className="profile-input-field" 
                                    placeholder="New password" 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)}  
                                />
                            </>
                        )}

                        {(updateData || changePassword || deleteAccount) && (
                            <input 
                                type="password" 
                                className="profile-input-field" 
                                placeholder="Password verify" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}  
                            />
                        )}

                        <div className="profile-buttons">
                            <button onClick={handleUpdateInfo}>{updateData ? "Confirm" : "Update data"}</button>
                            <button onClick={handleChangePassword}>{changePassword ? "Confirm" : "Change Password"}</button>
                            <button className="delete-button" onClick={handleDeleteAccount}>{deleteAccount ? "Confirm" : "Delete account :("}</button>
                        </div>

                        
                        <p className="error-message">{error}</p>
                    </div>

                    <FloatButton />
                </section>
            </div>
        </div>
    )   
}