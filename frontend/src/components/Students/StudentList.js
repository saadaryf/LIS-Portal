import React from 'react';
import styles from '../../styles/students.module.css';

const StudentList = ({ students, searchQuery, onEdit, onDelete }) => {
    // Filter students based on the search query
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery)
    );

    return (
        <div className={styles.studentList}>
            <h2>Student List</h2>
            <div className={styles.studentListTableWrapper}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Section</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => {
                            const highlight = searchQuery && student.name.toLowerCase().includes(searchQuery);
                            return (
                                <tr key={`${student._id}-${index}`}>
                                    <td className={highlight ? styles.highlighted : ''}>
                                        {student.name}
                                    </td>
                                    <td>{student.class}</td>
                                    <td>{student.section}</td>
                                    <td>
                                        <button onClick={() => onEdit(student)}>Edit</button>
                                        <button onClick={() => onDelete(student._id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
