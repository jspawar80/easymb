import React, { useEffect, useState } from 'react';
import { getModels } from '../services/api';

const ModelList = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        getModels().then(response => {
            setModels(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Models</h2>
            <ul>
                {models.map(model => (
                    <li key={model._id}>
                        {model.name} - {model.description}
                        {model.image && <img src={`http://localhost:5000/${model.image}`} alt={model.name} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ModelList;
