import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, deleteCategory } from '../services/api';
import Modal from '../components/Modal';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response.data);
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newCategoryName);
        formData.append('image', newCategoryImage);

        await createCategory(formData);
        setNewCategoryName('');
        setNewCategoryImage(null);
        setShowForm(false);
        fetchCategories();  // Refresh the category list
    };

    const handleDeleteCategory = async (id) => {
        await deleteCategory(id);
        fetchCategories();  // Refresh the category list
    };

    return (
        <div>
            <h1>Categories</h1>
            <button onClick={() => setShowForm(true)}>
                Add New Category
            </button>

            {/* Modal for Add New Category */}
            <Modal
                isOpen={showForm}
                onRequestClose={() => setShowForm(false)}
                title="Add New Category"
            >
                <form onSubmit={handleAddCategory}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Image:</label>
                        <input
                            type="file"
                            onChange={(e) => setNewCategoryImage(e.target.files[0])}
                        />
                    </div>
                    <button type="submit">Add Category</button>
                </form>
            </Modal>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>
                                {category.image && <img src={`http://localhost:5000/${category.image}`} alt={category.name} width="50" />}
                            </td>
                            <td>
                                <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categories;
