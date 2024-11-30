import React, { useState, useEffect } from 'react';
import StudentForm from '../components/Students/StudentForm';
import StudentList from '../components/Students/StudentList';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/studentService';
import styles from '../styles/students.module.css';

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [currentStudent, setCurrentStudent] = useState({
        name: '',
        class: '',
        section: '',
        dateOfBirth: '',
        parentContact: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching students:', error);
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleFormSubmit = async (studentData) => {
        try {
            let responseStudent;
            if (isEditing) {
                responseStudent = await updateStudent(studentData._id, studentData);
                setStudents((prev) =>
                    prev.map((student) =>
                        student._id === responseStudent._id ? responseStudent : student
                    )
                );
            } else {
                responseStudent = await createStudent(studentData);
                setStudents((prev) => [...prev, responseStudent]);
            }

            setCurrentStudent({
                name: '',
                class: '',
                section: '',
                dateOfBirth: '',
                parentContact: '',
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const handleEdit = (student) => {
        setCurrentStudent(student);
        setIsEditing(true);
    };

    const handleDelete = async (studentId) => {
        try {
            await deleteStudent(studentId);
            setStudents((prev) => prev.filter((student) => student._id !== studentId));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    return (
        <>
            <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchBar}
            />
            <div className={styles.studentManagement}>
                <StudentForm
                    initialData={currentStudent}
                    onSubmit={handleFormSubmit}
                    isEditing={isEditing}
                />
                {isLoading ? (
                    <div className={styles.loadingMessage}>Loading Students...</div>
                ) : (
                    <StudentList
                        students={students}
                        searchQuery={searchQuery}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </>
    );
};

export default StudentManagement;
