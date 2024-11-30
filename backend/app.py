from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://lis.devsaura.com/",
            "http://localhost:3000"
        ]
    }
})


@app.route('/api/hello', methods=["GET"])
def hello():
    return {"message": "Hello from Flask!"}

