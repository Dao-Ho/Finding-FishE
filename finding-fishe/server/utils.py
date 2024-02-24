# libraries
import json
import requests


# global vars
HEADERS = {
    "X-RapidAPI-Key": "bc7f72c2b1mshcb60c860004a9b1p1b8e23jsncd13e4c50848",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
}


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
