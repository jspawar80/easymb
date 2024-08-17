import React, { useEffect, useState } from 'react';
import { getModels, createModel, deleteModel, getCategories } from '../services/api';
import Modal from '../components/Modal';

const Models = () => {
    const [models, setModels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newModelName, setNewModelName] = useState('');
    const [newModelDescription, setNewModelDescription] = useState('');
    const [newModelCategory, setNewModelCategory] = useState('');
    const [newModelImage, setNewModelImage] = useState(null);

    useEffect(() => {
        fetchModels();
        fetchCategories();
    }, []);

    const fetchModels = async () => {
        const response = await getModels();
        setModels(response.data);
    };

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response.data);
    };

    const handleAddModel = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newModelName);
        formData.append('description', newModelDescription);
        formData.append('category', newModelCategory);
        formData.append('image', newModelImage);

        await createModel(formData);
        setNewModelName('');
        setNewModelDescription('');
        setNewModelCategory('');
        setNewModelImage(null);
        setShowForm(false);
        fetchModels();  // Refresh the models list
    };

    const handleDeleteModel = async (id) => {
        await deleteModel(id);
        fetchModels();  // Refresh the models list
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowImageModal(true);
    };

    return (
        <div>
            <h1>Models</h1>
            <button onClick={() => setShowForm(true)}>
                Add New Model
            </button>

            {/* Modal for Add New Model */}
            <Modal
                isOpen={showForm}
                onRequestClose={() => setShowForm(false)}
                title="Add New Model"
            >
                <form onSubmit={handleAddModel}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={newModelName}
                            onChange={(e) => setNewModelName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            value={newModelDescription}
                            onChange={(e) => setNewModelDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <select
                            value={newModelCategory}
                            onChange={(e) => setNewModelCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input
                            type="file"
                            onChange={(e) => setNewModelImage(e.target.files[0])}
                        />
                    </div>
                    <button type="submit">Add Model</button>
                </form>
            </Modal>

            {/* Modal for Viewing Image */}
            <Modal
                isOpen={showImageModal}
                onRequestClose={() => setShowImageModal(false)}
                title="View Image"
            >
                <img src={selectedImage} alt="Model" style={{ width: '100%' }} />
            </Modal>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => (
                        <tr key={model._id}>
                            <td>{model.name}</td>
                            <td>{model.description}</td>
                            <td>{model.category?.name}</td>
                            <td>
                                {model.image && (
                                    <img
                                        src={`http://localhost:5000/${model.image}`}
                                        alt={model.name}
                                        width="50"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleImageClick(`http://localhost:5000/${model.image}`)}
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDeleteModel(model._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Models;
