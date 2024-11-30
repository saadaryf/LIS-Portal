# backend/app/services/fee_service.py
from app.models.fee import Fee
from app.utils.database import DatabaseConnection

class FeeService:
    def __init__(self):
        db = DatabaseConnection().get_database()
        self.fee_model = Fee(db)

    def create_fee_for_student(self, student_id):
        return self.fee_model.create_fee_for_student(student_id)

    def get_fee_by_student_id(self, student_id):
        return self.fee_model.get_fee_by_student_id(student_id)

    def update_fee(self, student_id, update_data):
        return self.fee_model.update_fee(student_id, update_data)

    def get_all_fees(self, skip=0, limit=100):
        return self.fee_model.get_all_fees(skip, limit)
    
    def get_student_name_by_id(self, student_id):
        return self.student_model.get_student_name_by_id(student_id)