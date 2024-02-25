# libraries
import json
import requests
import PyPDF2

# global vars
HEADERS = {
    "X-RapidAPI-Key": "bc7f72c2b1mshcb60c860004a9b1p1b8e23jsncd13e4c50848",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
}



def Category_Terms(list_categories):
    """
    :param list_categories: list of categories
    :return: dictionary of categories where key is the term and value is the list of words from words api
    """

    categories_dict = dict()
    for category in list_categories:
        list_vocab = set()
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
        categories_dict[category] = list_vocab


    return categories_dict



CATEGORY_TERMS = Category_Terms()

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


def score_receipt(rec_json): 
    """ Scores a json obj of a single receipt based on company policy sentiments 
    Args: 
        rec_json (json/dict): a json/dct obj containing receipt information 
    Returns: 
        json containing the score & the categories in the receipt. 
    """
    # assuming we get the rec_json in term: value paring 
    recs = {term: words_api_call(term) for term in rec_json}

    scoring = {'scoring': 0, True: [], False: []}
    for key, value in recs.items(): 
        rec_total = []
        for text in value.values(): 
            rec_total += value

        # assuming we have category terms : term values from api call minus stop words 
        for cat, cat_vals in CATEGORY_TERMS.items(): 
            if len(set(rec_total).intersection(set(cat_vals))) > 0: 
                # raise flag for cat 
                if CAT_BOOLS[cat]: 
                    scoring[True].append(cat)
                else: 
                    scoring[True].append(cat)
    scoring['score'] = len(scoring[False]) / len(list(recs)) 

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

    return pdf_text



