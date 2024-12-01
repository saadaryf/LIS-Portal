# backend/app/models/fee.py
from bson import ObjectId
from datetime import datetime


class Fee:
    def __init__(self, db):
        self.collection = db['fees']
        self.student_collection = db['students']

    def create_fee_for_student(self, student_id, fee_type='Tuition', original_fee=0, discount_rate=0, due_date=None):
        """
        Create a fee document for a student when they are created.
        This method is called during the student creation process.
        It also calculates the final fee based on the original fee and discount rate.
        If no values are provided, default values are used.
        """
        # Set default due date if not provided
        if due_date is None:
            due_date = datetime.utcnow().strftime('%Y-%m-%d')  # Use current date as default

        # Calculate the final fee based on the original fee and discount rate
        final_fee = original_fee - (original_fee * discount_rate / 100)

        fee_data = {
            'student_id': student_id,
            'fee_type': fee_type,
            'original_fee': original_fee,
            'discount_rate': discount_rate,
            'final_fee': final_fee,
            'due_date': due_date,
            'payment_status': 'Pending',
            'fee_history': [],
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }

        result = self.collection.insert_one(fee_data)

        return str(result.inserted_id)

    def get_fee_by_student_id(self, student_id):
        """
        Retrieve fee information for a specific student.
        """
        fee = self.collection.find_one({'student_id': student_id})
        if fee:
            fee['_id'] = str(fee['_id'])
        return fee

    def update_fee(self, student_id, update_data):
        # Remove _id from update_data if present
        update_data.pop('_id', None)
        update_data['updated_at'] = datetime.utcnow()

        new_timestamp = datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')

        # Fetch the current record first
        current_record = self.collection.find_one({'student_id': student_id})

        # Ensure fee_history exists and is a list
        existing_history = current_record.get('fee_history', [])

        # Check if payment_status is being changed to Received
        if 'payment_status' in update_data and update_data['payment_status'] == 'Received':
            # Prepare the new fee history entry
            fee_history_entry = {
                'amount': current_record.get('final_fee', 0),
                'type': current_record.get('fee_type', 'Unknown'),
                'timestamp': new_timestamp
            }

            # Update operations
            update_operations = {
                '$push': {
                    'fee_history': fee_history_entry
                },
                '$set': {key: value for key, value in update_data.items() if key != 'fee_history'}
            }

            # Perform the update
            result = self.collection.update_one(
                {'student_id': student_id},
                update_operations
            )

        else:
            # If not changing to Received, perform a regular update
            result = self.collection.update_one(
                {'student_id': student_id},
                {
                    '$set': {
                        **update_data,
                        'updated_at': datetime.utcnow()
                    }
                }
            )

        # Recalculate final fee if original fee or discount rate is updated
        if 'original_fee' in update_data or 'discount_rate' in update_data:
            fee = current_record
            original_fee = update_data.get('original_fee', fee['original_fee'])
            discount_rate = update_data.get(
                'discount_rate', fee['discount_rate'])
            final_fee = original_fee - (original_fee * discount_rate / 100)

            # Update the final fee
            self.collection.update_one(
                {'student_id': student_id},
                {'$set': {'final_fee': final_fee}}
            )

        return self.get_fee_by_student_id(student_id)

    def get_all_fees(self, skip=0, limit=100):
        """
        Retrieve all fee records with pagination, returning the desired format.
        """
        fees = list(self.collection.find().skip(skip).limit(limit))

        formatted_fees = []
        for fee in fees:
            # Extracting and formatting fee details
            formatted_fee = {
                '_id': str(fee['_id']),
                'student_name': self.get_student_name_by_id(fee['student_id']),
                'fee_type': fee['fee_type'],
                'original_fee': fee['original_fee'],
                'discount_rate': fee['discount_rate'],
                'final_fee': fee['final_fee'],
                'due_date': fee['due_date'],
                'payment_status': fee['payment_status'],
                'student_id': fee['student_id'],
                'fee_history': fee.get('fee_history', [])
            }
            formatted_fees.append(formatted_fee)

        return formatted_fees

    def get_student_name_by_id(self, student_id):
        """
        Retrieve the student's name by their ID.
        """
        student = self.student_collection.find_one(
            {'_id': ObjectId(student_id)})
        if student:
            return student.get('name', 'Unknown')
        return 'Unknown'
