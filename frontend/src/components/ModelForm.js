import React, { useState, useEffect } from 'react';
import { createModel, getCategories } from '../services/api';

const ModelForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(response => {
            setCategories(response.data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('image', image);

        createModel(formData).then(() => {
            alert('Model created successfully');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Model Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Select Category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Upload Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <button type="submit">Create Model</button>
        </form>
    );
};

export default ModelForm;
