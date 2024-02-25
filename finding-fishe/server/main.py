from utils import json_to_dict, words_api_call, PDF_to_Text, Category_Terms, receipt_reader
import json
import re

categories = ["food", "transportation", "entertainment"]


with open("TESTING.json", "r") as file:
    data = json.load(file)

hi = receipt_reader(data)

print(hi)
