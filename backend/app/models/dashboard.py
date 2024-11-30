from datetime import datetime

class DashboardModel:
    def __init__(self, db):
        self.student_collection = db['students']
        self.fee_collection = db['fees']

    def count_total_students(self):
        """
        Count total number of students in the database
        """
        return self.student_collection.count_documents({})
    def calculate_fee_summary(self):
        """
        Calculate comprehensive fee summary statistics with improved status and history handling
        """
        pipeline = [
            {
                '$group': {
                    '_id': None,
                    'totalFees': {'$sum': '$final_fee'},
                    'totalCollected': {
                        '$sum': {
                            '$reduce': {
                                'input': '$fee_history',
                                'initialValue': 0,
                                'in': {'$add': ['$$value', '$$this.amount']}
                            }
                        }
                    },
                    'pendingFees': {
                        '$sum': {
                            '$cond': [
                                {'$eq': ['$payment_status', 'Pending']},  
                                '$final_fee',
                                0
                            ]
                        }
                    },
                    'receivedFees': {
                        '$sum': {
                            '$cond': [
                                {'$eq': ['$payment_status', 'Received']},
                                '$final_fee',
                                0
                            ]
                        }
                    }
                }
            }
        ]
        
        result = list(self.fee_collection.aggregate(pipeline))
        
        if result:
            return {
                'totalFees': result[0]['totalFees'],
                'totalCollected': result[0]['totalCollected'],
                'pendingAmount': result[0]['pendingFees'],
                'receivedAmount': result[0]['receivedFees']
            }
        
        return {
            'totalFees': 0,
            'totalCollected': 0,
            'pendingAmount': 0,
            'receivedAmount': 0
        }