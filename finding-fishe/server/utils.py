# libraries
import json

import re
import string
from base64 import b64decode
import PyPDF2
import requests

# global vars
HEADERS = {
    "X-RapidAPI-Key": "bc7f72c2b1mshcb60c860004a9b1p1b8e23jsncd13e4c50848",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
}

stopwords = list()
with open("stopwords.txt", 'r') as file:
    for line in file:
        line = line.replace("\n", '')
        stopwords.append(line)



def Category_Terms(list_categories):
    """
    :param list_categories: list of categories
    :return: dictionary of categories where key is the term and value is the list of words from words api
    """

    categories_dict = dict()
    for category in list_categories:
        list_vocab = set()
        try:
            results = words_api_call(category)["results"]
            for item in results:
                for key, value in item.items():
                    try:
                        words = value.split()
                        for word in words:
                            list_vocab.add(word)
                    except AttributeError:
                        for word in value:
                            words = word.split()
                            for word in words:
                                list_vocab.add(word)
        except KeyError:
            continue
        categories_dict[category] = list_vocab


    return categories_dict



#CATEGORY_TERMS = Category_Terms()

def json_to_dict(json_name):
    """
    :param json_file_path is the file path to the json file
    :return: dictionary of JSON
    """
    data = open(json_name)
    dictionary = json.load(data)
    data.close()

    return dictionary

def words_api_call(word):
    """
    :param word: string that we want a json for from words api
    :return dictoinary: dictionary of json that api returns
    """
    url = f'https://wordsapiv1.p.rapidapi.com/words/{word}'
    response = requests.get(url, headers=HEADERS)
    dictionary = response.json()

    return dictionary


def score_receipt(rec_json, cat_terms, cat_bools):
    """ Scores a json obj of a single receipt based on company policy sentiments 
    Args: 
        rec_json (json/dict): a json/dct obj containing receipt information 
    Returns: 
        json containing the score & the categories in the receipt. 
    """
    # assuming we get the rec_json in term: value paring 
    recs = {term: words_api_call(term) for term in rec_json}

    scoring = {'scoring': 0, 1: [], 0: []}
    for key, value in recs.items(): 
        rec_total = []
        for text in value.values(): 
            rec_total += value

        # assuming we have category terms : term values from api call minus stop words 
        for cat, cat_vals in cat_terms.items():
            if len(set(rec_total).intersection(set(cat_vals))) > 0: 
                # raise flag for cat 
                if cat_bools[cat]:
                    scoring[1].append(cat)
                else: 
                    scoring[1].append(cat)
    scoring['score'] = len(scoring[0]) / len(list(recs)) 

    return scoring

""" 
ex return: 
** Note: we have to flag if we have a non-tax-deductible on the receipt regardless... **
# raised indicating a raised flag!
{'raised': True, 'score': 0.33, True: ['Food'], False: ['Transportation', 'Office Supplies']}
"""

def PDF_to_Text(filename):
    """
    :param filename: filename of the pdf
    :return pdf_text: string of pdf
    """
    reader = PyPDF2.PdfReader('testing.pdf')

    pdf_text = reader.pages[0].extract_text()

    pdf_text = pdf_text.split("\n")

    return " ".join(pdf_text)
def policy_bools(filename):
    pos_neg = {'pos': {'can', 'allow', 'allowed', 'permit', 'permitted'}, 'neg': {'not', 'cannot', 'no'}}
    text = PDF_to_Text(filename)
    text = text.split(".")
    sentences = []
    for sentence in text:
        print(sentence)
        sentence = sentence.translate(str.maketrans('', '', string.punctuation))
        sentence = sentence.lower()
        sentence = sentence.split()
        sentence = [word for word in sentence if word not in stopwords]
        print(sentence)
        if sentence:
            sentences.append(sentence)

    with open('policy.json', 'r') as file:
        data = json.load(file)

    category_list = list()
    for key, value in data.items():
        category_list.append(key)
    category_list = [item.lower() for item in category_list]

    cat_terms = Category_Terms(category_list)

    policy = dict()

    for row in sentences:
        for key, value in cat_terms.items():
            value = list(value)
            print(set([key] + value))
            commonwords = set(row).intersection((set([key] + value)))
            print(key)
            if len(commonwords) > 0:
                neg_words = len(set(row).intersection(pos_neg['neg']))
                if neg_words > 0:
                    policy[key] = True
                else:
                    policy[key] = False

    return policy



def receipt_reader(data):

    set_words = set()
    pattern = r'[0-9\W]'
    api_url = 'https://api.api-ninjas.com/v1/imagetotext'
    KEY = 'xJfJfcLJptR7aUmr3f6pUQ==eZeulpP2Fx8SietR'

    files = {'image': b64decode(data["imageBase64"], 'utf-8'), "X-Api-Key": KEY}

    response = requests.post(api_url, files=files)
    print(response)
    for word_list in response.json():
        print(word_list)
        word = word_list['text'].lower()
        if "tip" in word:
            word = "tip"
        if word in stopwords:
            continue
        else:
            set_words.add(word)

    set_words = {item for item in set_words if not re.search(pattern, item)}

    # Print the JSON response
    return set_words


def decode_pdf(data):

    data = data["jsonData"]
    parsed_json = json.loads(data)
    base64_data = parsed_json["imageBase64"]

    bytes = b64decode(base64_data, validate=True)
    f = open('POLICY.pdf', 'wb')
    f.write(bytes)
    f.close()
