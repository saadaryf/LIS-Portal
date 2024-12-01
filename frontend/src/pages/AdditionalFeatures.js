import React from 'react';
import styles from '../styles/AdditionalFeatures.module.css';

const AdditionalFeatures = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Next Suggested Features to Implement</h1>
            <div className={styles.featureList}>
                <div className={styles.featureItem}>
                    <h3 className={styles.featureTitle}>1. Attendance Management</h3>
                    <p className={styles.featureDescription}>
                        Easily track student attendance, generate reports, and monitor trends to ensure better management of student presence.
                    </p>
                </div>

                <div className={styles.featureItem}>
                    <h3 className={styles.featureTitle}>2. Timetable Scheduling</h3>
                    <p className={styles.featureDescription}>
                        Schedule classes, exams, and other events efficiently with an intuitive timetable management system.
                    </p>
                </div>

                <div className={styles.featureItem}>
                    <h3 className={styles.featureTitle}>3. Notice Board</h3>
                    <p className={styles.featureDescription}>
                        Display important school announcements, event schedules, and notices to keep students and staff informed.
                    </p>
                </div>

                <div className={styles.featureItem}>
                    <h3 className={styles.featureTitle}>4. Custom Reporting</h3>
                    <p className={styles.featureDescription}>
                        Generate custom reports for fees, attendance, grades, and other areas, with a flexible reporting system.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdditionalFeatures;
