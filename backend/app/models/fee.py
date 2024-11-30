# backend/app/models/fee.py
from bson import ObjectId
from datetime import datetime

class Fee:
    def __init__(self, db):
        self.collection = db['fees']

    def record_payment(self, payment_data):
        payment_data['paid_at'] = datetime.utcnow()
        result = self.collection.insert_one(payment_data)
        return str(result.inserted_id)

    def get_student_payments(self, student_id):
        payments = list(self.collection.find({'student_id': student_id}))
        for payment in payments:
            payment['_id'] = str(payment['_id'])
        return payments

    def get_payment_summary(self):
        total_collected = self.collection.aggregate([
            {'$group': {
                '_id': None, 
                'total_fees': {'$sum': '$amount'}
            }}
        ])
        total_collected = list(total_collected)
        total_collected = total_collected[0]['total_fees'] if total_collected else 0

        pending_payments = self.collection.aggregate([
            {'$match': {'status': 'pending'}},
            {'$group': {
                '_id': None, 
                'pending_fees': {'$sum': '$amount'}
            }}
        ])
        pending_payments = list(pending_payments)
        pending_fees = pending_payments[0]['pending_fees'] if pending_payments else 0

        return {
            'total_fees_collected': total_collected,
            'pending_fees': pending_fees
        }