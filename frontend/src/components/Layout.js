import React from 'react';
import Navigation from './Navigation';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <div className="sidebar">
                <Navigation />
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
