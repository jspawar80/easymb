import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/categories" activeClassName="active">Categories</NavLink>
                </li>
                <li>
                    <NavLink to="/models" activeClassName="active">Models</NavLink>
                </li>
                <li>
                    <NavLink to="/board-parts" activeClassName="active">Board Parts</NavLink>
                </li>
                <li>
                    <NavLink to="/components" activeClassName="active">Components</NavLink>
                </li>
                <li>
                    <NavLink to="/board-part-components" activeClassName="active">Board Part Components</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
