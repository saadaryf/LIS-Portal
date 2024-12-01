import React from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import StudentCountWidget from '../components/Dashboard/StudentCountWidget';
import FeeSummaryWidget from '../components/Dashboard/FeeSummaryWidget';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
    return (
        <div className={styles.dashboardLayout}>
            <Header />
            <div className={styles.mainContent}>
                <Sidebar />
                <main className={styles.mainContainer}>
                    <div className={styles.widgetGrid}>
                        <div className={styles.widgetColumn}>
                            <StudentCountWidget />
                        </div>
                        <div className={styles.widgetColumn}>
                            <FeeSummaryWidget />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;