import React, { useState } from 'react';
import { createComponent } from '../services/api';

const ComponentForm = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('type', type);
        formData.append('image', image);

        createComponent(formData).then(() => {
            alert('Component created successfully');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Component Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Type:</label>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div>
                <label>Upload Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <button type="submit">Create Component</button>
        </form>
    );
};

export default ComponentForm;
