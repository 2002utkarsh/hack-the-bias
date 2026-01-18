"""
backend/main.py

Main entry point for the Python backend.
Routes are defined in api/routes.py to keep this clean.
"""

from flask import Flask
from flask_cors import CORS
import os

# Create Flask app
app = Flask(__name__)
# Enable CORS for frontend integration
CORS(app)

@app.route('/')
def health_check():
    return {"status": "ok", "service": "Hack-The-Bias Backend"}

# Import and register blueprints/routes here
from api.routes import api_bp
app.register_blueprint(api_bp)

if __name__ == "__main__":
    print("Starting Backend Service...")
    # Run locally on 5000
    app.run(debug=True, port=5000)
