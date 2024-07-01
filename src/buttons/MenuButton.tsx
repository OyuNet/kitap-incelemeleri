import React from 'react';

interface MenuButtonProps {
    onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
    return (
        <button id="menu-button" aria-label="Open menu" className="focus:outline-none md:hidden" onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </button>
    );
};

export default MenuButton;