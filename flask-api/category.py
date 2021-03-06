"""
TEST FILE USED TO CONNECT FRONT AND BACK END

"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from jsontest import JSON_CALL
from copy import deepcopy

app = Flask(__name__)
CORS(app)
import json, random, time
from get_weather import GetWeather

def weather_calculator(data):
    """
    Determines data from data data as well as if it rains
    :returns: ["data" [, bool(rain)]]. Weather is first index and bool if rain in the second index if it will rain. Otherwise no 2nd string
    """
    output = []
    if data["Temperature"] < 12:
        output.append("freezing")
    elif data["Temperature"] < 19:
        output.append("cold")
    else:
        output.append("warm")
    if data["PrecipProbability"] > 0.50:
        output.append(True)
    return output


@app.route('/getoutfit', methods = ['POST'])
def outfit_selector_colour():
    address_formality = request.json
    address = address_formality["address"]
    formality = address_formality["formality"]
    """
    Randomly picks outfits that match the weather and formality. THIS ONE PICKS CLOTHES BASED ON COLOURS

    :input:
        formality = string that says formality type (e.g. casual, smart)
        rain = boolean to tell if going to rain or not
    :return: list of numbers that refer to specific clothes in the json file. Each index in the list refers to a
            category of clothing in order: headwear, top, middlewear, outerwear, bottom, footwear.
            THIS IS OUTPUT AS A JSON FILE
    """
    time_tomorrow = round(time.time()) + 24 * 60 * 60 # Current time in seconds + seconds in a day
    weather_api_data = {
         "Summary":           None,
         "Temperature":       None,
         "UVIndex":           None,
         "PrecipIntensity":   None,
         "PrecipProbability": None,
         "PrecipType":        None,
         "WindSpeed":         None
    }
    GetWeather(address, time_tomorrow, weather_api_data)
    # @Incomplete(isuru): Check that the dict was actually poopulated!!
    if weather_api_data['Summary'] is None:
        print('invalid location')
        return {
            'result': 'invalid location'
        }
    # weather = list of strings. First string is weather, second string (or null) will say rain if it is raining
    weather = weather_calculator(weather_api_data)

    # Loads list that contains dictionaries from stored clothing (the wardrobe)
    with open("test2.json") as json_file:
        data = json.load(json_file)

    with open("masterlist.json") as json_file:
        masterlist = json.load(json_file)

    for i in range(len(data)):
        check_matching_data = False
        for j in range(len(masterlist)):
            if data["clothes"][i]["type"] == masterlist["types"][j]["name"]:
                check_matching_data = True
                data["clothes"][i]["condition"] = masterlist["types"][j]["condition"]
                data["clothes"][i]["category"] = masterlist["types"][j]["category"]

    all_clothes_separated = categorising_by_category()

    # List that contains all the clothes that match weather and formality. List of numbers
    selected_clothes = []
    for i in range(len(data["clothes"])):
        # matches weather and formality (not rain)
        if weather[0] in data["clothes"][i]["condition"] and formality in data["clothes"][i]["formality"]:
            selected_clothes.append(i)

    print(weather)

    separated_clothing = categorising_by_category(selected_clothes)

    print("clothing 6")
    print(data["clothes"][6])
    # viable clothes is a list of lists. Each internal list refers to one category of clothes and contains all viable clothes
    # if the number is -1, then there is no viable clothing option
    viable_clothes = []
    # Picks an article of clothing for each category randomly
    # If appends -1, then it means no viable clothes
    # IF appends -2, then it means don't need outerwear (only used in outerwear column)
    for i in range(len(separated_clothing)):
        if i == 2:
            if weather[0] != "freezing" and weather[0] != "cold":
                viable_clothes.append([-2])
                continue
        if i == 3:
            # If raining, pick a rain appropriate outerwear
            if len(weather) > 1:
                # Goes through the outerwear clothes and removes any that are not appropriate for rain
                for num in separated_clothing[i]:
                    if "rain" not in data["clothes"][num]["condition"]:
                        separated_clothing[i].remove(num)
            # don't pick outerwear if not freezing and no rain
            if weather[0] != "freezing" and len(weather) == 1:
                viable_clothes.append([-2])
                continue

        # If raining, pick rain appropriate footwear
        if i == 5:
            if len(weather) > 1:
                # Goes through the footwear clothes and removes any that are not appropriate for rain
                for num in separated_clothing[i]:
                    if "rain" not in data["clothes"][num]["condition"]:
                        separated_clothing[i].remove(num)

        # Appends to list of viable clothes based on weather and formality
        if len(separated_clothing[i]) > 0:
            viable_clothes.append(separated_clothing[i])

        # No viable clothing in this category for this weather
        else:
            viable_clothes.append([-1])

    # Warning 0: No issue
    # Warning 1: No viable clothes for weather and formality. Picked a random one
    # Warning 2: No clothes in this category at all. Can't even pick randomly
    # Warning 3: Don't return any clothes for this category (e.g. Outerwear on warm day)
    # Warning 4: Wearing only top on cold/freezing day due to no middlewear
    # Warning 5: Viable clothes but don't match colours

    # Warning 0: No issue
    # Warning 2: No viable clothes for weather and formality. Picked a random one
    # Warning 4: No clothes in this category at all. Can't even pick randomly
    # Warning 0: Don't return any clothes for this category (e.g. Outerwear on warm day)
    # Warning 3: Wearing only top on cold/freezing day due to no middlewear
    # Warning 1: Viable clothes but don't match colours


    all_outfits = []

    print("viables clothes")
    print(viable_clothes)
    viable_clothes_plus_extras = deepcopy(viable_clothes)
    for i in range(len(viable_clothes_plus_extras)):
        if len(viable_clothes_plus_extras[i]) == 0 or viable_clothes_plus_extras[i][0] == -1:
            j = 0
            viable_clothes_plus_extras[i] = []
            while j < 5:
                try:
                    viable_clothes_plus_extras[i].append(all_clothes_separated[i][j])
                    j += 1
                except IndexError:
                    break


    # Gets every outfit
    for headwear in viable_clothes_plus_extras[0]:
        for top in viable_clothes_plus_extras[1]:
            for middlewear in viable_clothes_plus_extras[2]:
                for outerwear in viable_clothes_plus_extras[3]:
                    for bottom in viable_clothes_plus_extras[4]:
                        for footwear in viable_clothes_plus_extras[5]:
                            outfit = [headwear, top, middlewear, outerwear, bottom, footwear]
                            all_outfits.append(outfit)

    if weather[0] == "warm":
        main_clothing_index = 1
    else:
        main_clothing_index = 2

    all_outfit_dict = []
    main_clothing = []
    for outfit in all_outfits:
        main_colour = data["clothes"][outfit[main_clothing_index]]["colour"]
        matching_colours = colour_matching(main_colour)
        if outfit[main_clothing_index] not in main_clothing:
            main_clothing.append(outfit[main_clothing_index])

        #headgear
        if data["clothes"][outfit[0]]["colour"] in matching_colours:
            headwear = {
                "clothes": outfit[0],
                "warning": 0
            }
        elif outfit[0] in viable_clothes[0]:
            headwear = {
                "clothes": outfit[0],
                "warning": 1
            }
        else:
            headwear = {
                "clothes": outfit[0],
                "warning": 2
            }

        # top
        if data["clothes"][outfit[1]]["colour"] in matching_colours:
            top = {
                "clothes": outfit[1],
                "warning": 0
            }
        elif outfit[1] in viable_clothes[1]:
            top = {
                "clothes": outfit[1],
                "warning": 1
            }
        else:
            top = {
                "clothes": outfit[1],
                "warning": 2
            }

        # middlewear
        if data["clothes"][outfit[2]]["colour"] in matching_colours:
            middlewear = {
                "clothes": outfit[2],
                "warning": 0
            }
        elif outfit[2] in viable_clothes[2]:
            middlewear = {
                "clothes": outfit[2],
                "warning": 1
            }
        else:
            middlewear = {
                "clothes": outfit[2],
                "warning": 2
            }

        # outerwear
        if data["clothes"][outfit[3]]["colour"] in matching_colours:
            outerwear = {
                "clothes": outfit[3],
                "warning": 0
            }
        elif outfit[3] in viable_clothes[3]:
            outerwear = {
                "clothes": outfit[3],
                "warning": 1
            }
        else:
            outerwear = {
                "clothes": outfit[3],
                "warning": 2
            }

        # bottom
        if data["clothes"][outfit[4]]["colour"] in matching_colours:
            bottom = {
                "clothes": outfit[4],
                "warning": 0
            }
        elif outfit[4] in viable_clothes[4]:
            bottom = {
                "clothes": outfit[4],
                "warning": 1
            }
        else:
            bottom = {
                "clothes": outfit[4],
                "warning": 2
            }

        # footwear
        if data["clothes"][outfit[5]]["colour"] in matching_colours:
            footwear = {
                "clothes": outfit[5],
                "warning": 0
            }
        elif outfit[5] in viable_clothes[5]:
            footwear = {
                "clothes": outfit[5],
                "warning": 1
            }
        else:
            footwear = {
                "clothes": outfit[5],
                "warning": 2
            }



        x = [headwear, top, middlewear, outerwear, bottom, footwear]
        all_outfit_dict.append(x)


    outfit_rankings = []
    for outfit in all_outfit_dict:
        x = 0
        for clothing in outfit:
            x += clothing["warning"]
        outfit_rankings.append((x, outfit))

    outfit_rankings = sorted(outfit_rankings, key=lambda x: x[0])

    # creates counters for each main clothing
    max_clothing_no = max(main_clothing)
    counters = [[0]*(max_clothing_no+1)]

    print("main clothing", main_clothing)
    res = []
    max_output = 0
    for i in range(len(outfit_rankings)):
        if max_output >= 50:
            break
        counters[0][outfit_rankings[i][1][main_clothing_index]["clothes"]] += 1
        if counters[0][outfit_rankings[i][1][main_clothing_index]["clothes"]] < 20:
            res.append(outfit_rankings[i][1])
            max_output += 1

    print('res: ', res)

    outfits_for_union = []
    outfits_for_union_index = []
    counter_union = 0
    for outfit in res:
        outfit_index = set()
        for clothing in outfit:
            if clothing['clothes'] > -1:
                outfit_index.add(clothing['clothes'])
        # print('outfit index: ', outfit_index)
        if len(outfits_for_union) == 0:
            outfits_for_union.append(outfit_index)
            outfits_for_union_index.append(0)
        else:
            varies_enough = True
            for outfit_compare in outfits_for_union:
                # print('Diff: ', outfit_index, ' and ', outfit_compare, ' is ', str(len(outfit_index.difference(outfit_compare))))
                if len(outfit_index.difference(outfit_compare)) < 3:
                    varies_enough = False
                    break
            if varies_enough:
                outfits_for_union.append(outfit_index)
                outfits_for_union_index.append(counter_union)
        counter_union += 1
    print('OFU', outfits_for_union)
    print('OFU_i', outfits_for_union_index)

    updated_res = []
    for index in outfits_for_union_index:
        updated_res.append(res[index])
        # print('appended: ', res[index])

    for item in updated_res:
        for clothing in item:
            clothing['type'] = data['clothes'][clothing['clothes']]['type']
            clothing['colour'] = data['clothes'][clothing['clothes']]['colour']

    for i in range(len(updated_res)):
        if (i+1) % 2 == 0:
            updated_res[i][0]["clothes"] = -1

    # Making demo sink with results
    if "Glenroy" in address and formality == "smart":
        updated_res.insert(0, [{'clothes': -1, 'type': 'cap', 'colour': 'black'}, {'clothes': 35, 'warning': 0, 'type': 'short sleeve shirt', 'colour': 'white'}, {'clothes': -1, 'warning': 0, 'type': 'middlewear', 'colour': 'darkblue'}, {'clothes': -1, 'warning': 0, 'type': 'middlewear', 'colour': 'darkblue'}, {'clothes': 1, 'warning': 0, 'type': 'chino', 'colour': 'black'}, {'clothes': 11, 'warning': 0, 'type': 'sneaker', 'colour': 'black'}])

    # JSON_CALL(updated_res, "outfit_selector_colour.json")
    print(updated_res)
    return {
        'result': updated_res
    }

@app.route('/hello', methods = ['POST'])
def cat_by_cat(selected_clothes = False):
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
        'result': [headwear, top, middlewear, outerwear, bottom, footwear]
    }

def categorising_by_category(selected_clothes = False):
    """
    Splits clothes based on their category
    :param selected_clothes: list in numbers that represents indexes of the clothes in the json
    :return: list that contains a list for each outfit. Order of each outfit is based on which outfit is the best.
    Each outfit has multiple dictionaries which has a dictionary for each category of clothing and their warning number.
    """
    with open("test2.json") as json_file:
        data = json.load(json_file)
    if not selected_clothes:
        selected_clothes = [y for y in range(len(data["clothes"]))]

    print("6 clothing")
    print(data["clothes"][6])

    print("0 clothing")
    print(data["clothes"][0])
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
    return [headwear, top, middlewear, outerwear, bottom, footwear]

def colour_matching(colour: str):
    """
    For a given colour, it returns a list of colours that complement that input colour
    """
    if colour == "pink":
        return ["lightblue", "darkblue", "grey", "white", "black"]
    if colour == "red":
        return ["lightblue", "darkblue", "grey", "white", "black"]
    if colour == "orange":
        return ["green", "lightblue", "darkblue", "white", "black"]
    if colour == "beige":
        return ["brown", "purple", "darkblue", "white", "black"]
    if colour == "yellow":
        return ["green", "darkblue", "white", "black"]
    if colour == "green":
        return ["orange", "purple", "white", "black"]
    if colour == "lightblue":
        return ["pink", "red", "orange", "white", "black"]
    if colour == "darkblue":
        return ["pink", "red", "yellow", "grey", "white", "black"]
    if colour == "purple":
        return ["green", "grey", "orange", "white", "black"]
    if colour == "brown":
        return ["beige", "white", "black"]
    if colour == "grey":
        return ["pink", "red", "dark blue", "purple"]
    if colour == "black":
        return ["black", "grey", "white", "pink", "red", "orange", "beige", "yellow", "green", "lightblue", "darkblue", "purple", "brown"]
    if colour == "white":
        return ["black", "grey", "white", "pink", "red", "orange", "beige", "yellow", "green", "lightblue", "darkblue", "purple", "brown"]

# print(categorising_by_category())
@app.route('/add', methods = ['POST'])
def add_clothing():
    req = request.json
    print('req: ', req)
    with open("masterlist.json") as json_file:
        masterList = json.load(json_file)
    d = req
    for i in range(len(masterList["types"])):
        if masterList["types"][i]["name"] == d["type"]:
            d["category"] = masterList["types"][i]["category"]
            d["condition"] = masterList["types"][i]["condition"]
            break

    JSON_CALL(d, "test2.json")
    return {
        'result': 'success'
    }

@app.route('/readfile', methods = ['POST'])
def read_clothing():
    with open("test2.json") as json_file:
        data = json.load(json_file)
    return {
        'result': data
    }

@app.route('/masterlist', methods = ['POST'])
def read_master_list():
    with open("masterlist.json") as json_file:
        data = json.load(json_file)
    return {
        'result': data
    }

if __name__ == '__main__':
    app.run(debug = True)