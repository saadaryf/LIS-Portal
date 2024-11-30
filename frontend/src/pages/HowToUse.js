import React from 'react';
import styles from '../styles/HowToUse.module.css';

const HowToUse = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>How to Use the System</h1>

            <div className={styles.stepList}>
                <div className={styles.stepItem}>
                    <h3 className={styles.stepTitle}>1. Add a New Student</h3>
                    <p className={styles.stepDescription}>
                        Simply add a new student by filling in the necessary details like name, grade, and contact information. Once added, the system will automatically generate the required fee based on the student’s grade and other parameters.
                    </p>
                </div>

                <div className={styles.stepItem}>
                    <h3 className={styles.stepTitle}>2. Manage Fees</h3>
                    <p className={styles.stepDescription}>
                        After adding the student, you can update the fee at any time. You can change the amount, adjust for discounts, or mark the fee as "Received" once paid. The system allows you to easily switch the status from "Pending" to "Received" as payments are made.
                    </p>
                </div>

                <div className={styles.stepItem}>
                    <h3 className={styles.stepTitle}>3. View Fee Status</h3>
                    <p className={styles.stepDescription}>
                        The system lets you track the status of each student’s fee, showing whether it’s pending or received. You can quickly check which students have outstanding fees and which have completed payments.
                    </p>
                </div>

                <div className={styles.stepItem}>
                    <h3 className={styles.stepTitle}>4. Monitor Dashboard</h3>
                    <p className={styles.stepDescription}>
                        The dashboard provides a quick overview of the total number of students, along with the total collected fees, pending amounts, and more. It gives you a summary of your entire student and fee management system in one place.
                    </p>
                </div>

                <div className={styles.stepItem}>
                    <h3 className={styles.stepTitle}>5. View and Download Receipts</h3>
                    <p className={styles.stepDescription}>
                        For each student's fee payment, you can **view and print the receipt** directly from the system. Simply click the "Download" button next to the fee item to see the receipt details, and click "Print" to get a pdf.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowToUse;
