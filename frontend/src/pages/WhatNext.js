import React from 'react';
import styles from '../styles/WhatNext.module.css';

const WhatNext = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Next, What?</h1>
            <div className={styles.stepList}>
                <div className={styles.stepItem}>
                    <h3 className={styles.stepTitle}>1. Implement Account Management</h3>
                    <p className={styles.stepDescription}>
                        Set up account management features like login, signup, and user roles (admin, staff) to ensure secure access to the system.
                    </p>
                </div>
                <div className={styles.stepItem}>
                    <h3 className={styles.stepTitle}>2. Customize the System</h3>
                    <p className={styles.stepDescription}>
                        Tailor the system by adding branding, adjusting fee structures, and tweaking settings to meet your school’s unique needs. The system will also be fully responsive for smooth use on all screen sizes.
                    </p>
                </div>
                <div className={styles.stepItem}>
                    <h3 className={styles.stepTitle}>3. Onboard Your Team</h3>
                    <p className={styles.stepDescription}>
                        Train your administrative staff to use the system efficiently. Provide step-by-step guides or tutorials to ensure a smooth transition.
                    </p>
                </div>
                <div className={styles.stepItem}>
                    <h3 className={styles.stepTitle}>4. Migrate Data</h3>
                    <p className={styles.stepDescription}>
                        Import existing student and fee records into the system. Will add the bulk upload feature for quick data migration.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhatNext;
