# backend/app/routes/fee_routes.py
from flask import Blueprint, request, jsonify
from app.services.fee_service import FeeService

fee_bp = Blueprint('fee', __name__)
fee_service = FeeService()

@fee_bp.route('/fees/record-payment', methods=['POST'])
def record_payment():
    payment_data = request.json
    payment_id = fee_service.record_fee_payment(payment_data)
    return jsonify({'payment_id': payment_id}), 201

@fee_bp.route('/fees/student/<student_id>', methods=['GET'])
def get_student_payments(student_id):
    payments = fee_service.get_student_payment_history(student_id)
    return jsonify(payments), 200

@fee_bp.route('/fees/summary', methods=['GET'])
def get_fee_summary():
    summary = fee_service.get_overall_fee_summary()
    return jsonify(summary), 200