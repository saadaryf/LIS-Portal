import React, { useState, useEffect } from 'react';
import styles from './StudentCountWidget.module.css';
import { dashboardService } from '../../services/dashboardService';

const StudentCountWidget = () => {
    const [studentCount, setStudentCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentCount = async () => {
            try {
                const count = await dashboardService.getStudentCount();
                setStudentCount(count);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student count:', error);
                setLoading(false);
            }
        };

        fetchStudentCount();
    }, []);

    return (
        <div className={styles.widgetContainer}>
            <div className={styles.widget}>
                <h3 className={styles.title}>Total Students</h3>
                {loading ? (
                    <div className={styles.loadingText}>Loading...</div>
                ) : (
                    <div className={styles.studentCountContent}>
                        <div className={styles.studentCount}>{studentCount}</div>
                        <div className={styles.studentSubtext}>Currently Enrolled</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCountWidget;