import React, { useState } from 'react';
import './DropdownMenu.css';

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>
                Master
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <a href="#button1">Button 1</a>
                    <a href="#button2">Button 2</a>
                    <a href="#button3">Button 3</a>
                    <a href="#button4">Button 4</a>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
