"""
TEST FILE USED TO CONNECT FRONT AND BACK END

"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from jsontest import JSON_CALL
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
    req = request.json
    address = req['address']
    formality = req['formality']
    print('Address', address)
    print('Formality', formality)
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

    # weather = list of strings. First string is weather, second string (or null) will say rain if it is raining
    weather = weather_calculator(weather_api_data)
    # Loads list that contains dictionaries from stored clothing (the wardrobe)
    with open("test2.json") as json_file:
        data = json.load(json_file)

    # List that contains all the clothes that match weather and formality. List of numbers
    selected_clothes = []
    for i in range(len(data["clothes"])):
        # matches weather and formality (not rain)
        if weather[0] in data["clothes"][i]["condition"] and formality in data["clothes"][i]["formality"]:
            selected_clothes.append(i)


    separated_clothing = categorising_by_category(selected_clothes)

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


    all_clothes = categorising_by_category()

    # If weather is warm, the top will define the main colour. Else Middlewear will define the main colour
    # Tuple = (clothing, color, top or middlewear that defines the main colour, warning code)

    possible_main_clothing = []
    if weather[0] == "warm":
        # No top so return empty list to tell front end to return an error
        if len(viable_clothes[1]) == 0:
            return []
        # Put all viable main clothing in a list
        for i in range(len(viable_clothes[1])):
            possible_main_clothing.append((viable_clothes[1][i], data["clothes"][viable_clothes[1][i]]["colour"], "top", 0))

    # If weather is cold/freezing, main_clothing will be middlewear if it exists, otherwise top

    else:
        # If there is middlewear
        if len(viable_clothes[2]) > 0:
            for i in range(len(viable_clothes[2])):
                possible_main_clothing.append(
                    (viable_clothes[2][i], data["clothes"][viable_clothes[2][i]]["colour"], "top", 0))
        # if no middlewear, pick top
        else:
            # No top as well, return error
            if len(viable_clothes[1]) == 0:
                return []
            else:
                for i in range(len(viable_clothes[1])):
                    possible_main_clothing.append(
                        (viable_clothes[1][i], data["clothes"][viable_clothes[1][i]]["colour"], "top", 0))

    all_outfits = []
    for j in range(len(possible_main_clothing)):
        main_clothing = possible_main_clothing[j]
        main_colour = main_clothing[1]

        # Removes any clothes that don't match colours
        colour_matching_viable = viable_clothes.copy()
        matching_colours = colour_matching(main_colour)

        main_outfit_index = 'abcd'
        if main_clothing[2] == "top":
            main_outfit_index = 1
        elif main_clothing[2] == "middlewear":
            main_outfit_index = 2

        print(colour_matching_viable)
        for i in range(len(colour_matching_viable)):
            if i == main_outfit_index:
                colour_matching_viable[i] = [main_clothing[0]]
                continue
            for clothing_num in colour_matching_viable[i]:
                if data["clothes"][clothing_num]["colour"] not in matching_colours:
                    colour_matching_viable[i].remove(clothing_num)

        # If viable clothing
        if len(colour_matching_viable[0]) > 0:
            index = random.randrange(0, len(colour_matching_viable[0]))
            headwear = {
                "clothes": colour_matching_viable[0][index],
                "warning": 0
            }
        else:
            # If no colour_matching viable clothing was picked, pick one that is viable
            if len(viable_clothes[0]) > 0:
                index = random.randrange(0, len(viable_clothes[0]))
                headwear = {
                    "clothes": viable_clothes[0][index],
                    "warning": 5
                }
            # If no viable clothes, pick a random one
            elif len(all_clothes[0]) > 0:
                index = random.randrange(0, len(all_clothes[0]))
                headwear = {
                    "clothes": all_clothes[0][index],
                    "warning": 1
                }
            # If no clothing for this category
            else:
                headwear = {
                    "clothes": -1,
                    "warning": 2
                }

        # If viable clothing
        if len(colour_matching_viable[1]) > 0:
            index = random.randrange(0, len(colour_matching_viable[1]))
            top = {
                "clothes": colour_matching_viable[1][index],
                "warning": 0
            }
        else:
            # If no colour_matching viable clothing was picked, pick one that is viable
            if len(viable_clothes[1]) > 0:
                index = random.randrange(0, len(viable_clothes[1]))
                top = {
                    "clothes": viable_clothes[1][index],
                    "warning": 5
                }
            # If no viable clothes, pick a random one
            elif len(all_clothes[1]) > 0:
                index = random.randrange(0, len(all_clothes[1]))
                top = {
                    "clothes": all_clothes[1][index],
                    "warning": 1
                }
            # If no clothing for this category
            else:
                top = {
                    "clothes": -1,
                    "warning": 2
                }

        # If viable clothing
        if len(colour_matching_viable[2]) > 0:
            index = random.randrange(0, len(colour_matching_viable[2]))
            middlewear = {
                "clothes": colour_matching_viable[2][index],
                "warning": 0
            }
        else:
            # If no colour_matching viable clothing was picked, pick one that is viable
            if len(viable_clothes[2]) > 0:
                index = random.randrange(0, len(viable_clothes[2]))
                middlewear = {
                    "clothes": viable_clothes[2][index],
                    "warning": 5
                }
            # If no viable clothes, pick a random one
            elif len(all_clothes[2]) > 0:
                index = random.randrange(0, len(all_clothes[2]))
                middlewear = {
                    "clothes": all_clothes[2][index],
                    "warning": 1
                }
            # If no clothing for this category
            else:
                middlewear = {
                    "clothes": -1,
                    "warning": 2
                }

        # If viable clothing
        if len(colour_matching_viable[3]) > 0:
            index = random.randrange(0, len(colour_matching_viable[3]))
            outerwear = {
                "clothes": colour_matching_viable[3][index],
                "warning": 0
            }
        else:
            # If no colour_matching viable clothing was picked, pick one that is viable
            if len(viable_clothes[3]) > 0:
                index = random.randrange(0, len(viable_clothes[3]))
                outerwear = {
                    "clothes": viable_clothes[3][index],
                    "warning": 5
                }
            # If no viable clothes, pick a random one
            elif len(all_clothes[3]) > 0:
                index = random.randrange(0, len(all_clothes[3]))
                outerwear = {
                    "clothes": all_clothes[3][index],
                    "warning": 1
                }
            # If no clothing for this category
            else:
                outerwear = {
                    "clothes": -1,
                    "warning": 2
                }

        # If viable clothing
        if len(colour_matching_viable[4]) > 0:
            index = random.randrange(0, len(colour_matching_viable[4]))
            bottom = {
                "clothes": colour_matching_viable[4][index],
                "warning": 0
            }
        else:
            # If no colour_matching viable clothing was picked, pick one that is viable
            if len(viable_clothes[4]) > 0:
                index = random.randrange(0, len(viable_clothes[4]))
                bottom = {
                    "clothes": viable_clothes[4][index],
                    "warning": 5
                }
            # If no viable clothes, pick a random one
            elif len(all_clothes[4]) > 0:
                index = random.randrange(0, len(all_clothes[4]))
                bottom = {
                    "clothes": all_clothes[4][index],
                    "warning": 1
                }
            # If no clothing for this category
            else:
                bottom = {
                    "clothes": -1,
                    "warning": 2
                }

        # If viable clothing
        if len(colour_matching_viable[5]) > 0:
            index = random.randrange(0, len(colour_matching_viable[5]))
            footwear = {
                "clothes": colour_matching_viable[5][index],
                "warning": 0
            }
        else:
            # If no colour_matching viable clothing was picked, pick one that is viable
            if len(viable_clothes[5]) > 0:
                index = random.randrange(0, len(viable_clothes[5]))
                footwear = {
                    "clothes": viable_clothes[5][index],
                    "warning": 5
                }
            # If no viable clothes, pick a random one
            elif len(all_clothes[5]) > 0:
                index = random.randrange(0, len(all_clothes[5]))
                footwear = {
                    "clothes": all_clothes[5][index],
                    "warning": 1
                }
            # If no clothing for this category
            else:
                footwear = {
                    "clothes": -1,
                    "warning": 2
                }

        outfit = [headwear, top, middlewear, outerwear, bottom, footwear]
        all_outfits.append(outfit)

    outfit_rankings = []
    for outfit in all_outfits:
        x = 0
        for clothing in outfit:
            x += clothing["warning"]
        outfit_rankings.append((x, outfit))

    outfit_rankings = sorted(outfit_rankings, key=lambda x: x[0])

    res = []
    for i in range(len(outfit_rankings)):
        res.append(outfit_rankings[i][1])

    JSON_CALL(res, "outfit_selector_colour.json")
    print(res)
    return {
        'result': res
    }

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

# print(categorising_by_category())
@app.route('/add', methods = ['POST'])
def add_clothing():
    req = request.json
    print('req: ', req)
    d = req

    JSON_CALL(req, "wardrobe")
    return {
        'result': 'success'
    }

def derive_condition_category(d):
    """
    Calculates the condition and category of a type of clothing and adds that to the clothing dictionary
    :return: dictionary with condition and category
    """
    if d["type"] == "short sleeve t-shirt":
        d["condition"] = ["warm", "cold"]
        d["category"] = "top"
    if d["type"] == "long sleeve t-shirt":
        d["condition"] = [ "cold", "freezing"]
        d["category"] = "top"
    if d["type"] == "short sleeve shirt":
        d["condition"] = ["warm", "cold", "freezing"]
        d["category"] = "top"
    if d["type"] == "long sleeve shirt":
        d["condition"] = ["cold", "freezing"]
        d["category"] = "top"
    if d["type"] == "sweater":
        d["condition"] = ["cold", "freezing"]
        d["category"] = "middlewear"
    if d["type"] == "jacket":
        d["condition"] = ["cold", "freezing"]
        d["category"] = "middlewear"
    if d["type"] == "coat":
        d["condition"] = ["cold", "freezing", "rain"]
        d["category"] = "outerwear"

@app.route('/readfile', methods = ['POST'])
def read_clothing():
    with open("test2.json") as json_file:
        data = json.load(json_file)
    return {
        'result': data
    }

@app.route('/masterlist', methods = ['POST'])
def read_clothing():
    with open("masterlist.json") as json_file:
        data = json.load(json_file)
    return {
        'result': data
    }

if __name__ == '__main__':
    app.run(debug = True)