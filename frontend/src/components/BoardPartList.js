import React, { useEffect, useState } from 'react';
import { getBoardParts } from '../services/api';

const BoardPartList = () => {
    const [boardParts, setBoardParts] = useState([]);

    useEffect(() => {
        getBoardParts().then(response => {
            setBoardParts(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Board Parts</h2>
            <ul>
                {boardParts.map(boardPart => (
                    <li key={boardPart._id}>
                        {boardPart.name} - {boardPart.description}
                        {boardPart.image && <img src={`http://localhost:5000/${boardPart.image}`} alt={boardPart.name} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoardPartList;
