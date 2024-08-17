import React, { useEffect, useState } from 'react';
import { getBoardPartComponents, createBoardPartComponent, deleteBoardPartComponent, getBoardParts, getComponents } from '../services/api';
import Modal from '../components/Modal';

const BoardPartComponents = () => {
    const [boardPartComponents, setBoardPartComponents] = useState([]);
    const [boardParts, setBoardParts] = useState([]);
    const [components, setComponents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newCombinationTitle, setNewCombinationTitle] = useState('');
    const [newCombinationBoardPart, setNewCombinationBoardPart] = useState('');
    const [selectedComponents, setSelectedComponents] = useState([]);

    useEffect(() => {
        fetchBoardPartComponents();
        fetchBoardParts();
        fetchComponents();
    }, []);

    const fetchBoardPartComponents = async () => {
        const response = await getBoardPartComponents();
        setBoardPartComponents(response.data);
    };

    const fetchBoardParts = async () => {
        const response = await getBoardParts();
        setBoardParts(response.data);
    };

    const fetchComponents = async () => {
        const response = await getComponents();
        setComponents(response.data);
    };

    const handleAddCombination = async (e) => {
        e.preventDefault();
        const data = {
            title: newCombinationTitle,
            boardPart: newCombinationBoardPart,
            components: selectedComponents,
        };

        await createBoardPartComponent(data);
        setNewCombinationTitle('');
        setNewCombinationBoardPart('');
        setSelectedComponents([]);
        setShowForm(false);
        fetchBoardPartComponents();  // Refresh the combinations list
    };

    const handleDeleteCombination = async (id) => {
        await deleteBoardPartComponent(id);
        fetchBoardPartComponents();  // Refresh the combinations list
    };

    const handleComponentSelection = (componentId) => {
        setSelectedComponents(prevState =>
            prevState.includes(componentId)
                ? prevState.filter(id => id !== componentId)
                : [...prevState, componentId]
        );
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowImageModal(true);
    };

    return (
        <div>
            <h1>Board Part Components</h1>
            <button onClick={() => setShowForm(true)}>
                Add New Combination
            </button>

            {/* Modal for Add New Combination */}
            <Modal
                isOpen={showForm}
                onRequestClose={() => setShowForm(false)}
                title="Add New Combination"
            >
                <form onSubmit={handleAddCombination}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={newCombinationTitle}
                            onChange={(e) => setNewCombinationTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Board Part:</label>
                        <select
                            value={newCombinationBoardPart}
                            onChange={(e) => setNewCombinationBoardPart(e.target.value)}
                            required
                        >
                            <option value="">Select Board Part</option>
                            {boardParts.map(boardPart => (
                                <option key={boardPart._id} value={boardPart._id}>
                                    {boardPart.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Components:</label>
                        <ul>
                            {components.map(component => (
                                <li key={component._id}>
                                    <input
                                        type="checkbox"
                                        value={component._id}
                                        checked={selectedComponents.includes(component._id)}
                                        onChange={() => handleComponentSelection(component._id)}
                                    />
                                    {component.name} - {component.type}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit">Add Combination</button>
                </form>
            </Modal>

            {/* Modal for Viewing Image */}
            <Modal
                isOpen={showImageModal}
                onRequestClose={() => setShowImageModal(false)}
                title="View Image"
                >
                    <img src={selectedImage} alt="Board Part Component" style={{ width: '100%' }} />
                </Modal>
    
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Board Part</th>
                            <th>Components</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardPartComponents.map(combination => (
                            <tr key={combination._id}>
                                <td>{combination.title}</td>
                                <td>{combination.boardPart?.name}</td>
                                <td>
                                    {combination.components.map(component => (
                                        <span key={component._id}>{component.name} ({component.type})</span>
                                    )).reduce((prev, curr) => [prev, ', ', curr])}
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteCombination(combination._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    
    export default BoardPartComponents;
    