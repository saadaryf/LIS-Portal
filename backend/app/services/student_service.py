# backend/app/services/student_service.py
from app.models.student import Student
from app.models.fee import Fee  
from app.utils.database import DatabaseConnection


class StudentService:
    def __init__(self):
        db = DatabaseConnection().get_database()
        self.student_model = Student(db)
        self.fee_model = Fee(db)

    def add_student(self, student_data):
        student_id = self.student_model.create_student(student_data)

        # Automatically create a fee document for the new student
        self.fee_model.create_fee_for_student(student_id)

        return student_id

    def get_student(self, student_id):
        return self.student_model.get_student_by_id(student_id)

    def update_student(self, student_id, update_data):
        return self.student_model.update_student(student_id, update_data)

    def delete_student(self, student_id):
        return self.student_model.delete_student(student_id)

    def list_students(self, skip=0, limit=100):
        return self.student_model.get_all_students(skip, limit)

    def get_students_by_class_stats(self):
        return self.student_model.get_student_count_by_class()
