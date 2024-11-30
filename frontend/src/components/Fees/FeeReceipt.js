import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import styles from '../../styles/receipt.module.css';

const FeeReceipt = ({ fee }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const generateReceipt = () => {
        const input = document.getElementById('receipt-container');

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Fee_Receipt_${fee.student_name}_${new Date().toISOString().split('T')[0]}.pdf`);
        });
    };

    const pakistaniBanks = ['HBL', 'UBL', 'MCB'];

    const calculateFinalFee = () => {
        return (fee.original_fee - (fee.original_fee * fee.discount_rate / 100)).toFixed(2);
    };

    const ReceiptContent = () => (
        <div id="receipt-container" className={styles.receiptContainer}>
            <div className={styles.receiptWrapper}>
                {/* Header */}
                <div className={styles.header}>
                    <img src='/logo.png' alt="Lahore International School" />
                    <div className={styles.headerInfo}>
                        <h1 className={styles.title}>FEE RECEIPT</h1>
                        <p className={styles.dateInfo}>Receipt No: {Math.floor(Math.random() * 100000)}</p>
                        <p className={styles.dateInfo}>Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Student Details */}
                <div className={styles.detailsGrid}>
                    <div>
                        <h2>Student Details:</h2>
                        <p>Name: {fee.student_name}</p>
                        <p>Student ID: {fee.student_id}</p>
                    </div>
                    <div className={styles.textRight}>
                        <h2>Fee Details:</h2>
                        <p>Fee Type: {fee.fee_type}</p>
                        <p>Due Date: {fee.due_date}</p>
                        <p>Payment Status: {fee.payment_status}</p>
                    </div>
                </div>

                {/* Fee Breakdown */}
                <table className={styles.feeTable}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Original Fee</td>
                            <td className={styles.textRight}>PKR {fee.original_fee.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Discount ({fee.discount_rate}%)</td>
                            <td className={styles.textRight}>PKR {(fee.original_fee * fee.discount_rate / 100).toFixed(2)}</td>
                        </tr>
                        <tr className={styles.bold}>
                            <td>Total Fee</td>
                            <td className={styles.textRight}>PKR {calculateFinalFee()}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Payment Methods */}
                <div className={styles.paymentMethods}>
                    <h2>Pay in:</h2>
                    <div className={styles.banks}>
                        {pakistaniBanks.map(bank => (
                            <div key={bank} className={styles.textCenter}>
                                <p>{bank}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <p>Lahore International School</p>
                    <p>Address: Main Campus, Muhafiz Town, Gujranwala, Pakistan</p>
                    <p>Contact: +92 (314) 6036065 | lis.devsaura.com</p>
                </div>
            </div>
        </div>
    );

    const ReceiptModal = () => (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.mb4}>
                    <button
                        onClick={generateReceipt}
                        className={styles.downloadButton}
                    >
                        Download Receipt
                    </button>
                    <button
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                    >
                        &times;
                    </button>
                </div>
                <ReceiptContent />
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={styles.viewButton}
            >
                View Receipt
            </button>
            {isModalOpen && <ReceiptModal />}
        </>
    );
};

export default FeeReceipt;
