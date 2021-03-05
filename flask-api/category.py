"""
TEST FILE USED TO CONNECT FRONT AND BACK END

"""
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
import json, random

def weather_calculator():
    """
    Determines weather from weather data as well as if it rains
    :returns: ["weather" [, bool(rain)]]. Weather is first index and bool if rain in the second index if it will rain. Otherwise no 2nd string
    """
    with open("weathertest.json") as json_file:
        weather = json.load(json_file)
    output = []
    if weather["Temperature"] < 12:
        output.append("freezing")
    elif weather["Temperature"] < 19:
        output.append("cold")
    else:
        output.append("warm")
    if weather["PrecipProbability"] > 0.50:
        output.append(True)
    return output

def outfit_selector(formality:str) -> list:
    """
    Randomly picks outfits that match the weather and formality

    :input:
        formality = string that says formality type (e.g. casual, smart-casual)
        rain = boolean to tell if going to rain or not
    :return: list of numbers that refer to specific clothes in the json file. Each index in the list refers to a
            category of clothing in order: headwear, top, middlewear, outerwear, bottom, footwear
    """

    # weather = list of strings. First string is weather, second string (or null) will say rain if it is raining
    weather = weather_calculator()
    # Loads list that contains dictionaries from stored clothing
    with open("test2.json") as json_file:
        data = json.load(json_file)
    # print(weather)

    # List that contains all the clothes that match weather and formality. List of numbers
    selected_clothes = []
    for i in range(len(data["clothes"])):
        # matches weather and formality (not rain)
        if weather[0] in data["clothes"][i]["condition"] and formality in data["clothes"][i]["formality"]:
            selected_clothes.append(i)


    # print(selected_clothes)
    separated_clothing = categorising_by_category(selected_clothes)

    # print(separated_clothing)
    # output will have 5 numbers. Each number represents an article of clothing. Each index is a category of clothing.
    # if the number is -1, then there is no viable clothing option
    output = []
    # Picks an article of clothing for each category randomly
    for i in range(len(separated_clothing)):
        if i == 3:
            # If raining, pick a rain appropriate outerwear
            if len(weather) > 1:
                # Goes through the outerwear clothes and removes any that are not appropriate for rain
                for num in separated_clothing[i]:
                    if "rain" not in data["clothes"][num]["condition"]:
                        separated_clothing[i].remove(num)
            # don't pick outerwear if not freezing and no rain
            if weather[0] != "freezing" and len(weather) == 1:
                output.append(-1)
                continue

        # If raining, pick rain appropriate footwear
        if i == 5:
            if len(weather) > 1:
                # Goes through the footwear clothes and removes any that are not appropriate for rain
                for num in separated_clothing[i]:
                    if "rain" not in data["clothes"][num]["condition"]:
                        separated_clothing[i].remove(num)

        if len(separated_clothing[i]) > 0:
            index = random.randrange(0, len(separated_clothing[i]))
            output.append(separated_clothing[i][index])
        # No viable clothing in this category for this weather
        else:
            output.append(-1)
    return output

@app.route('/hello', methods = ['POST'])
def categorising_by_category(selected_clothes = False):
    """
    Splits clothes based on their category
    :param selected_clothes: list in numbers that represents indexes of the clothes in the json
    :return: list that contains a list for each category of clothes
    """
    with open("test2.json") as json_file:
        data = json.load(json_file)
    if not selected_clothes:
        selected_clothes = [y for y in range(len(data["clothes"]))]
    # print(selected_clothes)

    headwear = []
    top = []
    middlewear = []
    outerwear = []
    bottom = []
    footwear = []
    for num in selected_clothes:
        if data["clothes"][num]["category"] == "top":
            top.append(num)
        elif data["clothes"][num]["category"] == "middlewear":
            middlewear.append(num)
        elif data["clothes"][num]["category"] == "outerwear":
            outerwear.append(num)
        elif data["clothes"][num]["category"] == "bottom":
            bottom.append(num)
        elif data["clothes"][num]["category"] == "footwear":
            footwear.append(num)
        elif data["clothes"][num]["category"] == "headwear":
            headwear.append(num)
    return {
        'result': [top, middlewear, outerwear, bottom, footwear, headwear]
    }

print(categorising_by_category())
