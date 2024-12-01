import React, { useState, useEffect } from 'react';
import FeeItem from '../components/Fees/FeeItem';
import { getFees } from '../services/feeService';
import styles from '../styles/fees.module.css';

const FeeManagement = () => {
    const [fees, setFees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [paymentFilter, setPaymentFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const data = await getFees();
                setFees(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching fees:', error);
                setIsLoading(false);
            }
        };

        fetchFees();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handleFilterChange = (event) => {
        setPaymentFilter(event.target.value);
    };

    const handleFeeUpdate = (updatedFee) => {
        setFees(prevFees =>
            prevFees.map(fee =>
                fee._id === updatedFee._id ? updatedFee : fee
            )
        );
    };

    const filteredFees = fees.filter(fee => {
        const matchesSearch = fee.student_name?.toLowerCase().includes(searchQuery);
        const matchesFilter = paymentFilter
            ? fee.payment_status.toLowerCase() === paymentFilter.toLowerCase()
            : true;
        return matchesSearch && matchesFilter;
    });


    return (
        <div className={styles.feeManagement}>
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search by student name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchBar}
                />
                <select
                    value={paymentFilter}
                    onChange={handleFilterChange}
                    className={styles.filterDropdown}
                >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Received">Received</option>
                </select>
            </div>
            {isLoading ? (
                <div className={styles.loadingMessage}>Loading Fees...</div>
            ) : (
                <div className={styles.feeListTableWrapper}>
                    <table className={styles.feeList}>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Fee Type</th>
                                <th>Original Fee</th>
                                <th>Discount Rate (%)</th>
                                <th>Final Fee</th>
                                <th>Due Date</th>
                                <th>Payment Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFees.map(fee => (
                                <FeeItem
                                    key={fee._id}
                                    fee={fee}
                                    onUpdate={handleFeeUpdate}
                                    onCancel={() => { }}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FeeManagement;
