# backend/app/services/fee_service.py
from app.models.fee import Fee
from app.utils.database import DatabaseConnection

class FeeService:
    def __init__(self):
        db = DatabaseConnection().get_database()
        self.fee_model = Fee(db)

    def record_fee_payment(self, payment_data):
        # Add validation logic if needed
        return self.fee_model.record_payment(payment_data)

    def get_student_payment_history(self, student_id):
        return self.fee_model.get_student_payments(student_id)

    def get_overall_fee_summary(self):
        return self.fee_model.get_payment_summary()