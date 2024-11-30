// frontend/src/components/Layout/Header.js
import React from 'react';
import styles from '../../styles/layout.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <img src='/logo.png' alt="LIS Logo" className={styles.logo} />
            <div>
                <h1>Lahore International School Management System</h1>
            </div>
            <nav>
                <button>Logout</button>
            </nav>
        </header>
    );
};

export default Header;