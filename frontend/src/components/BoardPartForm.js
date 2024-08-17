import React, { useState, useEffect } from 'react';
import { createBoardPart, getModels } from '../services/api';

const BoardPartForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [model, setModel] = useState('');
    const [image, setImage] = useState(null);
    const [models, setModels] = useState([]);

    useEffect(() => {
        getModels().then(response => {
            setModels(response.data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('model', model);
        formData.append('image', image);

        createBoardPart(formData).then(() => {
            alert('Board Part created successfully');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Board Part Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Model:</label>
                <select value={model} onChange={(e) => setModel(e.target.value)}>
                    <option>Select Model</option>
                    {models.map(mod => (
                        <option key={mod._id} value={mod._id}>
                            {mod.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Upload Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <button type="submit">Create Board Part</button>
        </form>
    );
};

export default BoardPartForm;
