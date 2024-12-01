import React from 'react';
import styles from '../styles/SystemBenefits.module.css';

const SystemBenefits = () => {
    return (
        <div className={styles.benefitsContainer}>
            <h1 className={styles.title}>Benefits of the School Management Portal</h1>

            <div className={styles.benefitList}>
                <div className={styles.benefitItem}>
                    <h3 className={styles.benefitTitle}>Easy Student Management</h3>
                    <p className={styles.benefitDescription}>
                        The system makes it simple to track student details, attendance, and performance, reducing manual effort and saving time.
                    </p>
                </div>

                <div className={styles.benefitItem}>
                    <h3 className={styles.benefitTitle}>Simplified Fee Management</h3>
                    <p className={styles.benefitDescription}>
                        Fees can be easily managed, with real-time updates on payments, pending dues, and receipts, making financial tracking seamless.
                    </p>
                </div>

                <div className={styles.benefitItem}>
                    <h3 className={styles.benefitTitle}>Room for Future Enhancements</h3>
                    <p className={styles.benefitDescription}>
                        The system is flexible and can be expanded in the future to include new features, such as custom reports, parent-teacher communication, and more.
                    </p>
                </div>

                <div className={styles.benefitItem}>
                    <h3 className={styles.benefitTitle}>Efficient Data Management</h3>
                    <p className={styles.benefitDescription}>
                        With all data in one place, you can generate reports, track progress, and analyze trends without juggling multiple tools.
                    </p>
                </div>

                <div className={styles.benefitItem}>
                    <h3 className={styles.benefitTitle}>Custom Branding</h3>
                    <p className={styles.benefitDescription}>
                        The portal is tailored with your school’s branding, ensuring a professional and personalized experience for users.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SystemBenefits;
