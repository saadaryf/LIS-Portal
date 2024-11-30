// frontend/src/pages/Dashboard.js
import React from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import StudentCountWidget from '../components/Dashboard/StudentCountWidget';
import FeeSummaryWidget from '../components/Dashboard/FeeSummaryWidget';

const Dashboard = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <main className="container">
                <h1>Analytics</h1>
                <div className="dashboard-grid" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <StudentCountWidget />
                    <FeeSummaryWidget />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;