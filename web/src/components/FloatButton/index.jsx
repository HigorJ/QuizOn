import React, { useState } from 'react';
import { FiPlus, FiEdit } from 'react-icons/fi';
import { FaDoorOpen } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import './floatButton.css';

export default function FloatButton() {

    const history = useHistory();
    const [floatButton, setFloatButton] = useState(false);

    return (
        <>
            <button className="float-button" style={floatButton ? { transform: "rotate(135deg)" } : {}} onClick={() => setFloatButton(!floatButton)}>
                    <FiPlus className="button-icon" size={32} color="#BECFDF"  />
            </button>

            { floatButton && (
                <>
                    <button onClick={() => history.push(`/quizzes/rooms/create-room`)} title="Rooms" className="float-button-child">
                        <FaDoorOpen size={28} color="#E1E1E1" />
                    </button>

                    <button onClick={() => history.push(`/create-quiz`)} title="Quiz" className="float-button-child">
                        <FiEdit size={28} color="#E1E1E1" /> 
                    </button>
                </>
            )}
        </>
    )
}