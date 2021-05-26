from flask import Flask, render_template, jsonify, request
import requests
import json

app = Flask(__name__)

# ROOT
@app.route('/')
def initpage():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def searchpage():
    search_value = request.args.get('search')
    print(search_value)

    return render_template('search.html', value=search_value)

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
