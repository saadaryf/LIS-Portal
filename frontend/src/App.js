import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import StudentManagement from './pages/StudentManagement';
import FeeManagement from './pages/FeeManagement';
import SystemBenefits from './pages/SystemBenefits';
import HowToUse from './pages/HowToUse';
import styles from './styles/layout.module.css';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        <Header />
        <div className={styles.mainContent}>
          <Sidebar />
          <main className={styles.pageContent}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<StudentManagement />} />
              <Route path="/fees" element={<FeeManagement />} />
              <Route path="/system-benefits" element={<SystemBenefits />} />
              <Route path="/how-to-use" element={<HowToUse />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
