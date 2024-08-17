import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(response => {
            setCategories(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>
                        {category.name}
                        {category.image && <img src={`http://localhost:5000/${category.image}`} alt={category.name} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
