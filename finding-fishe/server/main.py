from utils import json_to_dict, words_api_call, PDF_to_Text, Category_Terms, receipt_reader, sentiment
import json
import re



hi = sentiment("testing.pdf")

print(hi)