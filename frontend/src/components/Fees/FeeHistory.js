import React, { useState } from 'react';
import styles from '../../styles/feehistory.module.css';

const FeeHistory = ({ fee }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const HistoryModal = () => (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Fee Payment History for {fee.student_name}</h2>
                    <button 
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                    >
                        &times;
                    </button>
                </div>
                
                <table className={styles.historyTable}>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Received Date:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fee.fee_history.length > 0 ? (
                            fee.fee_history.map((history, index) => (
                                <tr key={index}>
                                    <td>PKR {history.amount.toFixed(2)}</td>
                                    <td>{history.type}</td>
                                    <td>{formatDate(history.timestamp)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className={styles.noHistory}>
                                    No payment history available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className={styles.viewHistoryButton}
            >
                View History
            </button>
            {isModalOpen && <HistoryModal />}
        </>
    );
};

export default FeeHistory;