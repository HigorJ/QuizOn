import React, { useState, useEffect } from 'react';
import { FiCamera } from 'react-icons/fi';

export default function PhotoInput({ setPhoto, imageUrl = null }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(imageUrl);
    }, [imageUrl]);

    const createPhotoUrl = (imageUploaded) => {
        return imageUploaded !== undefined ? URL.createObjectURL(imageUploaded) : null;
    }

    function handleChangePhoto(e) {
        setPhoto(e.target.files[0]);

        setImage(createPhotoUrl(e.target.files[0]));
    }

    return (
        <div className="photo-upload">
            <label htmlFor="input-file" className="label-input-file" style={{ backgroundImage: `url(${image})` }}>
                { image === null && (
                    <FiCamera size={48} color="#474747" /> 
                )}
            </label>
            <input 
                type="file" 
                className="input-file" 
                id="input-file" 
                accept="image/png, image/jpeg" 
                onChange={(e) => handleChangePhoto(e)}
            />
        </div>
    )
}