from app.models.dashboard import DashboardModel
from app.utils.database import DatabaseConnection

class DashboardService:
    def __init__(self):
        db = DatabaseConnection().get_database()
        self.dashboard_model = DashboardModel(db)

    def get_total_student_count(self):
        return self.dashboard_model.count_total_students()

    def get_fee_summary(self):
        return self.dashboard_model.calculate_fee_summary()

    def get_comprehensive_dashboard_stats(self):
        return {
            'studentCount': self.get_total_student_count(),
            'feeSummary': self.get_fee_summary(),
            # Add other dashboard-related calculations here
        }