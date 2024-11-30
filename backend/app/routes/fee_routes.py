# backend/app/routes/fee_routes.py
from flask import Blueprint, request, jsonify
from app.services.fee_service import FeeService

fee_bp = Blueprint('fee', __name__)
fee_service = FeeService()

@fee_bp.route('/fees', methods=['GET'])
def list_fees():
    skip = request.args.get('skip', 0, type=int)
    limit = request.args.get('limit', 100, type=int)
    fees = fee_service.get_all_fees(skip, limit)
    return jsonify(fees), 200

@fee_bp.route('/fees/<student_id>', methods=['GET'])
def get_fee_by_student_id(student_id):
    fee = fee_service.get_fee_by_student_id(student_id)
    if fee:
        return jsonify(fee), 200
    return jsonify({'error': 'Fee record not found'}), 404

@fee_bp.route('/fees/<student_id>', methods=['PUT'])
def update_fee(student_id):
    update_data = request.json
    updated_fee = fee_service.update_fee(student_id, update_data)
    if updated_fee:
        return jsonify(updated_fee), 200
    return jsonify({'error': 'Fee record not found or update failed'}), 404