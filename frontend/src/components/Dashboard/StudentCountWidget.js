import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import styles from './StudentCountWidget.module.css';

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
        <div className={styles.widget}>
            <h3 className={styles.title}>Total Students</h3>
            {loading ? (
                <div className={styles.count}>Loading...</div>
            ) : (
                <div className={styles.count}>{studentCount}</div>
            )}
        </div>
    );
};

export default StudentCountWidget;