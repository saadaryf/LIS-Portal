// frontend/src/components/Layout/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/layout.module.css';

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/students">Student Management</Link>
                <Link to="/fees">Fee Management</Link>
                <Link to="/system-benefits">System Benefits</Link>
            </nav>
        </aside>
    );
};

export default Sidebar;