import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import styles from './FeeSummaryWidget.module.css';

const FeeSummaryWidget = () => {
    const [feeSummary, setFeeSummary] = useState({
        totalCollected: 0,
        pendingAmount: 0,
        totalFees: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeeSummary = async () => {
            try {
                const summary = await dashboardService.getFeeSummary();
                setFeeSummary(summary);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching fee summary:', error);
                setLoading(false);
            }
        };

        fetchFeeSummary();
    }, []);

    return (
        <div className={styles.widget}>
            <h3 className={styles.title}>Fee Summary</h3>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className={styles.summaryContainer}>
                    <div className={styles.summaryBox}>
                        <div className={styles.label}>Total Collected</div>
                        <div className={styles.value}>PKR {feeSummary.totalCollected.toFixed(2)}</div>
                    </div>
                    <div className={styles.summaryBox}>
                        <div className={styles.label}>Pending</div>
                        <div className={styles.value}>PKR {feeSummary.pendingAmount.toFixed(2)}</div>
                    </div>
                    <div className={styles.summaryBox}>
                        <div className={styles.label}>Received</div>
                        <div className={styles.value}>PKR {feeSummary.receivedAmount.toFixed(2)}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeeSummaryWidget;