# backend/app/models/student.py
from bson import ObjectId
from datetime import datetime

class Student:
    def __init__(self, db):
        self.collection = db['students']
        self.fees_collection = db['fees'] 

    def create_student(self, student_data):
        student_data['created_at'] = datetime.utcnow()
        student_data['updated_at'] = datetime.utcnow()
        result = self.collection.insert_one(student_data)
        return str(result.inserted_id)

    def get_student_by_id(self, student_id):
        student = self.collection.find_one({'_id': ObjectId(student_id)})
        if student:
            student['_id'] = str(student['_id'])
        return student

    def update_student(self, student_id, update_data):
        update_data.pop('_id', None)
        update_data['updated_at'] = datetime.utcnow()
        result = self.collection.update_one(
            {'_id': ObjectId(student_id)},
            {'$set': update_data}
        )
        return self.collection.find_one({'_id': ObjectId(student_id)})

    def delete_student(self, student_id):
        result = self.collection.delete_one({'_id': ObjectId(student_id)})
        
        if result.deleted_count > 0:
            self.fees_collection.delete_one({'student_id': student_id})
            return True
        return False

    def get_all_students(self, skip=0, limit=100):
        students = list(self.collection.find().skip(skip).limit(limit))
        for student in students:
            student['_id'] = str(student['_id'])
        return students

    def get_student_count_by_class(self):
        return list(self.collection.aggregate([
            {'$group': {'_id': '$class', 'count': {'$sum': 1}}}
        ]))