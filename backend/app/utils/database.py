# backend/app/utils/database.py
from pymongo import MongoClient
from config.settings import MONGODB_URI, DATABASE_NAME

class DatabaseConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
            cls._instance.client = MongoClient(MONGODB_URI)
            cls._instance.db = cls._instance.client[DATABASE_NAME]
        return cls._instance

    def get_database(self):
        return self.db

    def close_connection(self):
        if self._instance:
            self._instance.client.close()