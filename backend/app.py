# backend/app.py
import os
from flask import Flask, jsonify
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()

# Get IEX_TOKEN from environment variables
IEX_TOKEN = os.getenv('IEX_TOKEN')

# IEX Cloud base URL
IEX_URL = 'https://cloud.iexapis.com/stable/'

# Create a Flask app
app = Flask(__name__)

# Home route
@app.route('/')
def home():
    return jsonify(message='Welcome to the Stock Screener API!')

# Function to make requests to IEX Cloud
def fetch_from_iex(endpoint):
    url = f"{IEX_URL}{endpoint}?token={IEX_TOKEN}"
    response = requests.get(url)
    return response.json()

# Route to get company overview
@app.route('/company/<symbol>')
def company(symbol):
    endpoint = f'stock/{symbol}/company'
    data = fetch_from_iex(endpoint)
    return jsonify(data)

# Route to get historical prices
@app.route('/historical/<symbol>')
def historical(symbol):
    endpoint = f'stock/{symbol}/chart/1m' # 1 month of data
    data = fetch_from_iex(endpoint)
    return jsonify(data)

# Route to search for stock symbols
@app.route('/search/<query>')
def search_stocks(query):
    endpoint = 'ref-data/symbols'
    data = fetch_from_iex(endpoint)
    suggestions = [stock for stock in data if stock['symbol'].startswith(query.upper())][:10]
    return jsonify(suggestions)

# Run the Flask app if this file is executed directly
if __name__ == '__main__':
    app.run(debug=True)
