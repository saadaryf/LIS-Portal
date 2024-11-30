# backend/config/settings.py
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Configuration
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb+srv://saadaryf:FAVdYmb3nQoYdFNi@devsauratoolscluster.dgfjm.mongodb.net/?retryWrites=true&w=majority&appName=DevsauraToolsCluster')
DATABASE_NAME = 'LISManagementSystem'

# Application Settings
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key')
DEBUG = os.getenv('DEBUG', 'True') == 'True'