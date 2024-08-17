import React, { useState } from 'react';
import { createCategory } from '../services/api';

const CategoryForm = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        createCategory(formData).then(() => {
            alert('Category created successfully');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Category Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Upload Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <button type="submit">Create Category</button>
        </form>
    );
};

export default CategoryForm;
