import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import styles from './FeeSummaryWidget.module.css';

const FeeSummaryWidget = () => {
    const [feeSummary, setFeeSummary] = useState({
        totalCollected: 0,
        pendingAmount: 0,
        receivedAmount: 0
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

    // Calculate percentages for pending and received
    const totalFees = feeSummary.pendingAmount + feeSummary.receivedAmount;
    const pendingPercentage = (feeSummary.pendingAmount / totalFees) * 100;
    const receivedPercentage = (feeSummary.receivedAmount / totalFees) * 100;

    const renderCircularChart = (percentage, color, label, amount) => (
        <div className={styles.chartContainer}>
            <svg viewBox="0 0 36 36" className={styles.circularChart}>
                <path 
                    className={styles.circleBg}
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path 
                    className={styles.circle}
                    style={{stroke: color}}
                    strokeDasharray={`${percentage}, 100`}
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>
            <div className={styles.chartLabel}>
                <div className={styles.chartValue}>PKR {amount.toFixed(2)}</div>
                <div className={styles.chartText}>{label}</div>
                <div className={styles.chartPercentage}>{percentage.toFixed(1)}%</div>
            </div>
        </div>
    );

    return (
        <div className={styles.widgetContainer}>
            <div className={styles.widget}>
                <h3 className={styles.title}>Fee Analytics</h3>
                {loading ? (
                    <div className={styles.loadingState}>Loading Fee Summary...</div>
                ) : (
                    <div className={styles.feeChartContainer}>
                        <div className={styles.totalCollectedBox}>
                            <div className={styles.totalLabel}>Total Collected</div>
                            <div className={styles.totalValue}>
                                PKR {feeSummary.totalCollected.toFixed(2)}
                            </div>
                        </div>
                        <div className={styles.circleCharts}>
                            {renderCircularChart(
                                pendingPercentage, 
                                '#FF9800', 
                                'Pending Amount',
                                feeSummary.pendingAmount
                            )}
                            {renderCircularChart(
                                receivedPercentage, 
                                '#4CAF50', 
                                'Received Amount',
                                feeSummary.receivedAmount
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeeSummaryWidget;