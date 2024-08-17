import React, { useEffect, useState } from 'react';
import { getBoardParts, createBoardPart, deleteBoardPart, getModels } from '../services/api';
import Modal from '../components/Modal';

const BoardParts = () => {
    const [boardParts, setBoardParts] = useState([]);
    const [models, setModels] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newBoardPartName, setNewBoardPartName] = useState('');
    const [newBoardPartDescription, setNewBoardPartDescription] = useState('');
    const [newBoardPartModel, setNewBoardPartModel] = useState('');
    const [newBoardPartImage, setNewBoardPartImage] = useState(null);

    useEffect(() => {
        fetchBoardParts();
        fetchModels();
    }, []);

    const fetchBoardParts = async () => {
        const response = await getBoardParts();
        setBoardParts(response.data);
    };

    const fetchModels = async () => {
        const response = await getModels();
        setModels(response.data);
    };

    const handleAddBoardPart = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newBoardPartName);
        formData.append('description', newBoardPartDescription);
        formData.append('model', newBoardPartModel);
        formData.append('image', newBoardPartImage);

        await createBoardPart(formData);
        setNewBoardPartName('');
        setNewBoardPartDescription('');
        setNewBoardPartModel('');
        setNewBoardPartImage(null);
        setShowForm(false);
        fetchBoardParts();  // Refresh the board parts list
    };

    const handleDeleteBoardPart = async (id) => {
        await deleteBoardPart(id);
        fetchBoardParts();  // Refresh the board parts list
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowImageModal(true);
    };

    return (
        <div>
            <h1>Board Parts</h1>
            <button onClick={() => setShowForm(true)}>
                Add New Board Part
            </button>

            {/* Modal for Add New Board Part */}
            <Modal
                isOpen={showForm}
                onRequestClose={() => setShowForm(false)}
                title="Add New Board Part"
            >
                <form onSubmit={handleAddBoardPart}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={newBoardPartName}
                            onChange={(e) => setNewBoardPartName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            value={newBoardPartDescription}
                            onChange={(e) => setNewBoardPartDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Model:</label>
                        <select
                            value={newBoardPartModel}
                            onChange={(e) => setNewBoardPartModel(e.target.value)}
                            required
                        >
                            <option value="">Select Model</option>
                            {models.map(model => (
                                <option key={model._id} value={model._id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input
                            type="file"
                            onChange={(e) => setNewBoardPartImage(e.target.files[0])}
                        />
                    </div>
                    <button type="submit">Add Board Part</button>
                </form>
            </Modal>

            {/* Modal for Viewing Image */}
            <Modal
                isOpen={showImageModal}
                onRequestClose={() => setShowImageModal(false)}
                title="View Image"
            >
                <img src={selectedImage} alt="Board Part" style={{ width: '100%' }} />
            </Modal>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Model</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {boardParts.map(boardPart => (
                        <tr key={boardPart._id}>
                            <td>{boardPart.name}</td>
                            <td>{boardPart.description}</td>
                            <td>{boardPart.model?.name}</td>
                            <td>
                                {boardPart.image && (
                                    <img
                                        src={`http://localhost:5000/${boardPart.image}`}
                                        alt={boardPart.name}
                                        width="50"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleImageClick(`http://localhost:5000/${boardPart.image}`)}
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDeleteBoardPart(boardPart._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BoardParts;
