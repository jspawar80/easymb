import React, { useEffect, useState } from 'react';
import { getComponents } from '../services/api';

const ComponentList = () => {
    const [components, setComponents] = useState([]);

    useEffect(() => {
        getComponents().then(response => {
            setComponents(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Components</h2>
            <ul>
                {components.map(component => (
                    <li key={component._id}>
                        {component.name} - {component.type}
                        {component.image && <img src={`http://localhost:5000/${component.image}`} alt={component.name} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComponentList;
