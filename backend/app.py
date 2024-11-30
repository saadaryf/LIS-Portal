from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/hello', methods=["GET"])
def hello():
    return {"message": "Hello from Flask!"}

