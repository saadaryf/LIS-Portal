// frontend\src\components\Students\StudentForm.js
import React, { useState, useEffect } from 'react';
import styles from '../../styles/students.module.css';

const StudentForm = ({ initialData, onSubmit, isEditing }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.studentForm}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
            />
            <input
                name="class"
                value={formData.class}
                onChange={handleChange}
                placeholder="Class"
                required
            />
            <input
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="Section"
            />
            <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
            />
            <input
                name="parentContact"
                value={formData.parentContact}
                onChange={handleChange}
                placeholder="Parent Contact"
                required
            />
            <button type="submit">
                {isEditing ? 'Update Student' : 'Add Student'}
            </button>
        </form>
    );
};

export default StudentForm;
