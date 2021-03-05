from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/hello', methods = ['POST'])
def result():
    req = request.json
    print('req: ', req)
    return {
        'result': int(req['arg1']) + 1
    }

@app.route('/add', methods = ['POST'])
def add_clothing():
    req = request.json
    print('req: ', req)
    return {
        'result': 'hi'
    }