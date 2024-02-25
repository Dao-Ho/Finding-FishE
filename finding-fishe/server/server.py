import json

from flask import Flask, jsonify, request
from flask_cors import CORS
from utils import decode_pdf, policy_bools, score_receipt, Category_Terms
#from utils import receipt_reader
#create flask app
app = Flask(__name__)


CORS(app)
#API get set up
@app.route("/api/home", methods=['GET'])  # Fixed: methods should be plural and equals sign should be used
def return_home():

    return jsonify({
        'message': 'Hello world!'
    })  # Added missing parenthesis here

@app.route('/receipt_json', methods=['POST'])
def receipt_json():
    # Check if the request contains JSON data
    if request.is_json:
        # Get the JSON data
        data = request.get_json()
        # You can now process the data as needed
        with open("receipt_data.json", "w") as file:
            receipt_data = json.load(file)

        policy_bools_dict = policy_bools("POLICY.pdf")

        category_terms = Category_Terms(list(policy_bools_dict.keys()))
        score = score_receipt(receipt_data, category_terms, policy_bools_dict)
        print(score)


        return jsonify({"message": "JSON received successfully!", "yourData": score}), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400


@app.route('/policy_json', methods=['POST'])
def policy_json():
    # Check if the request contains JSON data
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400


    data = request.get_json()


    # Decode the PDF data from the JSON, assuming 'decode_pdf' is a function you've defined elsewhere
    # This is a placeholder for your decode_pdf function
    # Make sure you replace it with your actual data processing logic
    decoded_data = decode_pdf(data)

    # Assuming decode_pdf returns some information you want to include in the response
    # Replace "decoded_data" with the actual data you want to return

    # You can now process the data as needed
    # For example, returning a success message with some part of processed data
    return jsonify({"message": "JSON received successfully!", "yourData": decoded_data}), 200

#debug mode
if __name__ == "__main__":
    app.run(debug=True, port=8080)  # Removed spaces around equal sign to follow PEP 8
