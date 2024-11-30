from flask import Blueprint, jsonify
from app.services.dashboard_service import DashboardService

dashboard_bp = Blueprint('dashboard', __name__)
dashboard_service = DashboardService()

@dashboard_bp.route('/dashboard/student-count', methods=['GET'])
def get_student_count():
    count = dashboard_service.get_total_student_count()
    return jsonify({'count': count}), 200

@dashboard_bp.route('/dashboard/fee-summary', methods=['GET'])
def get_fee_summary():
    summary = dashboard_service.get_fee_summary()
    return jsonify(summary), 200

@dashboard_bp.route('/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    stats = dashboard_service.get_comprehensive_dashboard_stats()
    return jsonify(stats), 200