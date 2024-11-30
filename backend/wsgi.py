import logging
from app import create_app

app = create_app()

if __name__ == "__main__":
    try:
        app.run(debug=True)
    except Exception as e:
        logging.error(f"Error while running the app: {str(e)}")
