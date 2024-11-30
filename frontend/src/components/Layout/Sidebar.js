import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/layout.module.css';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? styles.active : '';

    return (
        <aside className={styles.sidebar}>
            <nav>
                <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
                <Link to="/students" className={isActive('/students')}>Student Management</Link>
                <Link to="/fees" className={isActive('/fees')}>Fee Management</Link>
                <Link to="/system-benefits" className={isActive('/system-benefits')}>System Benefits</Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
