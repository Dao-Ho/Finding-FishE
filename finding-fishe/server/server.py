from flask import Flask, jsonify
from flask_cors import CORS


#create flask app
app = Flask(__name__)


CORS(app)
#API get set up
@app.route("/api/home", methods=['GET'])  # Fixed: methods should be plural and equals sign should be used
def return_home():

    return jsonify({
        'message': 'Hello world!'
    })  # Added missing parenthesis here

#debug mode
if __name__ == "__main__":
    app.run(debug=True, port=8080)  # Removed spaces around equal sign to follow PEP 8
