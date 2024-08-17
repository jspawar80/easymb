import React, { useState, useEffect } from 'react';
import { createBoardPartComponent, getBoardParts, getComponents } from '../services/api';

const BoardPartComponentForm = () => {
    const [title, setTitle] = useState('');
    const [boardPart, setBoardPart] = useState('');
    const [components, setComponents] = useState([]);
    const [selectedComponents, setSelectedComponents] = useState([]);
    const [boardParts, setBoardParts] = useState([]);

    useEffect(() => {
        getBoardParts().then(response => {
            setBoardParts(response.data);
        });

        getComponents().then(response => {
            setComponents(response.data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title,
            boardPart,
            components: selectedComponents,
        };

        createBoardPartComponent(data).then(() => {
            alert('Board Part Component Combination created successfully');
        });
    };

    const handleComponentSelection = (componentId) => {
        setSelectedComponents(prevState =>
            prevState.includes(componentId)
                ? prevState.filter(id => id !== componentId)
                : [...prevState, componentId]
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Board Part:</label>
                <select value={boardPart} onChange={(e) => setBoardPart(e.target.value)}>
                    <option>Select Board Part</option>
                    {boardParts.map(part => (
                        <option key={part._id} value={part._id}>
                            {part.name}
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
            <button type="submit">Create Combination</button>
        </form>
    );
};

export default BoardPartComponentForm;
