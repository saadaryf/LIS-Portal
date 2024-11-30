import React, { useState, useEffect } from 'react';
import { updateFee } from '../../services/feeService';
import FeeReceipt from './FeeReceipt';

const FEE_TYPES = ['Tuition', 'Activity', 'Lab', 'Other'];
const PAYMENT_STATUSES = ['Pending', 'Received'];

const FeeItem = ({ fee, onUpdate, onCancel }) => {
    const [editedFee, setEditedFee] = useState({ ...fee });
    const [hasChanges, setHasChanges] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setEditedFee({ ...fee });
    }, [fee]);

    const calculatefinal_fee = (original_fee, discount_rate) => {
        return original_fee - (original_fee * discount_rate / 100);
    };

    const handleChange = (field, value) => {
        let updatedFee = { ...editedFee, [field]: value };

        if (field === 'original_fee' || field === 'discount_rate') {
            updatedFee.final_fee = calculatefinal_fee(
                field === 'original_fee' ? value : editedFee.original_fee,
                field === 'discount_rate' ? value : editedFee.discount_rate
            );
        }

        setEditedFee(updatedFee);
        setHasChanges(true);
    };

    const handleSave = async () => {
        try {
            setIsUpdating(true);
            await updateFee(editedFee.student_id, editedFee);
            onUpdate(editedFee);
            setHasChanges(false);
        } catch (error) {
            console.error('Error updating fee:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = () => {
        setEditedFee({ ...fee });
        setHasChanges(false);
        onCancel();
    };

    const getPaymentStatusStyle = (status) => {
        return {
            color: status === 'Received' ? 'green' : 'orange',
            backgroundColor: status === 'Received' ? '#d4fdd7' : '#fff3d4',
            outline: status === 'Received' ? 'green' : 'orange',
            border: status === 'Received' ? '3px solid green' : '3px solid orange',
            fontWeight: 'bold',
        };
    };

    return (
        <tr>
            <td>{fee.student_name}</td>
            <td>
                <select
                    value={editedFee.fee_type}
                    onChange={(e) => handleChange('fee_type', e.target.value)}
                    disabled={isUpdating}
                >
                    {FEE_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    type="number"
                    value={editedFee.original_fee}
                    onChange={(e) => handleChange('original_fee', parseFloat(e.target.value))}
                    disabled={isUpdating}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={editedFee.discount_rate}
                    onChange={(e) => handleChange('discount_rate', parseFloat(e.target.value))}
                    disabled={isUpdating}
                />
            </td>
            <td>{editedFee.final_fee.toFixed(2)}</td>
            <td>
                <input
                    type="date"
                    value={editedFee.due_date}
                    onChange={(e) => handleChange('due_date', e.target.value)}
                    disabled={isUpdating}
                />
            </td>
            <td>
                <select
                    style={getPaymentStatusStyle(editedFee.payment_status)}
                    value={editedFee.payment_status}
                    onChange={(e) => handleChange('payment_status', e.target.value)}
                    disabled={isUpdating}
                >
                    {PAYMENT_STATUSES.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </td>
            <td>
                {!hasChanges && !isUpdating && (
                    <FeeReceipt fee={fee} />
                )}
                {hasChanges && !isUpdating && (
                    <div style={{ display: 'flex' }}>
                        <button onClick={handleSave} disabled={isUpdating}>Save Changes</button>
                        <button onClick={handleCancel} disabled={isUpdating}>Cancel</button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default FeeItem;