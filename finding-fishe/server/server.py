from flask import Flask, jsonify, request
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
@app.route('/receive_json', methods=['POST'])
def receive_json():
    # Check if the request contains JSON data
    if request.is_json:
        # Get the JSON data
        data = request.get_json()

        # You can now process the data as needed
        print(data)

        # Respond back with a success message
        return jsonify({"message": "JSON received successfully!", "yourData": data}), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400
#debug mode
if __name__ == "__main__":
    app.run(debug=True, port=8080)  # Removed spaces around equal sign to follow PEP 8
