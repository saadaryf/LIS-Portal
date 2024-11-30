# backend/app/routes/student_routes.py
from flask import Blueprint, request, jsonify
from app.services.student_service import StudentService

student_bp = Blueprint('student', __name__)
student_service = StudentService()

@student_bp.route('/students', methods=['POST'])
def create_student():
    student_data = request.json
    student_id = student_service.add_student(student_data)
    student = student_service.get_student(student_id)
    return jsonify(student), 201

@student_bp.route('/students', methods=['GET'])
def list_students():
    skip = request.args.get('skip', 0, type=int)
    limit = request.args.get('limit', 100, type=int)
    students = student_service.list_students(skip, limit)
    return jsonify(students), 200

@student_bp.route('/students/<student_id>', methods=['GET'])
def get_student(student_id):
    student = student_service.get_student(student_id)
    if student:
        return jsonify(student), 200
    return jsonify({'error': 'Student not found'}), 404

@student_bp.route('/students/<student_id>', methods=['PUT'])
def update_student(student_id):
    update_data = request.json
    success = student_service.update_student(student_id, update_data)
    if success:
        updated_student = student_service.get_student(student_id)
        return jsonify(updated_student), 200
    return jsonify({'error': 'Student not found'}), 404

@student_bp.route('/students/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    success = student_service.delete_student(student_id)
    if success:
        return jsonify({'message': 'Student deleted successfully'}), 200
    return jsonify({'error': 'Student not found'}), 404

@student_bp.route('/students/class-stats', methods=['GET'])
def get_student_class_stats():
    stats = student_service.get_students_by_class_stats()
    return jsonify(stats), 200