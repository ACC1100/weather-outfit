"""
Main file that will contain all the python functions to be called by the front end

"""
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
    print(weather)

    # List that contains all the clothes that match weather and formality. List of numbers
    selected_clothes = []
    for i in range(len(data["clothes"])):
        # matches weather and formality (not rain)
        if weather[0] in data["clothes"][i]["condition"] and formality in data["clothes"][i]["formality"]:
            selected_clothes.append(i)


    separated_clothing = categorising_by_category(selected_clothes)

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
                output.append(-2)
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

    print("output")
    print(output)
    print("\n")
    # Warning 0: No issue
    # Warning 1: No viable clothes for weather and formality. Picked a random one
    # Warning 2: No clothes in this category
    # Warning 3: Don't return any clothes for this category (e.g. Outerwear on warm day)

    all_clothes = categorising_by_category()
    print("all_clothes")
    print(all_clothes)

    # If viable clothing was selected
    if output[0] != -1:
        headwear = {
            "clothing": output[0],
            "warning": 0
        }
    else:
        # If no viable clothing was picked, pick a random one with warning
        if len(all_clothes[0]) > 0:
            index = random.randrange(0, len(all_clothes[0]))
            headwear = {
                "clothing": all_clothes[0][index],
                "warning": 1
            }
        # If no clothing for this category
        else:
            headwear = {
                "clothing": -1,
                "warning": 2
            }

    # If viable clothing was selected
    if output[1] != -1:
        top = {
            "clothing": output[1],
            "warning": 0
        }
    else:
        # If no viable clothing was picked, pick a random one with warning
        if len(all_clothes[1]) > 0:
            index = random.randrange(0, len(all_clothes[1]))
            top = {
                "clothing": all_clothes[1][index],
                "warning": 1
            }
        # If no clothing for this category
        else:
            top = {
                "clothing": -1,
                "warning": 2
            }

    # If viable clothing was selected
    if output[2] != -1:
        middlewear = {
            "clothing": output[2],
            "warning": 0
        }
    else:
        # If no viable clothing was picked, pick a random one with warning
        if len(all_clothes[2]) > 0:
            index = random.randrange(0, len(all_clothes[2]))
            middlewear = {
                "clothing": all_clothes[2][index],
                "warning": 1
            }
        # If no clothing for this category
        else:
            middlewear = {
                "clothing": -1,
                "warning": 2
            }

    # If viable clothing was selected
    if output[3] != -1 and output[3] != -2:
        outerwear = {
            "clothing": output[3],
            "warning": 0
        }
    else:
        # If not picking outerwear
        if output[3] == -2:
            outerwear = {
                "clothing": -1,
                "warning": 3
            }

        # If no viable clothing was picked, pick a random one with warning
        elif len(all_clothes[3]) > 0:
            index = random.randrange(0, len(all_clothes[3]))
            outerwear = {
                "clothing": all_clothes[3][index],
                "warning": 1
            }
        # If no clothing for this category
        else:
            outerwear = {
                "clothing": -1,
                "warning": 2
            }

    # If viable clothing was selected
    if output[4] != -1:
        bottom = {
            "clothing": output[4],
            "warning": 0
        }
    else:
        # If no viable clothing was picked, pick a random one with warning
        if len(all_clothes[4]) > 0:
            index = random.randrange(0, len(all_clothes[4]))
            bottom = {
                "clothing": all_clothes[4][index],
                "warning": 1
            }
        # If no clothing for this category
        else:
            bottom = {
                "clothing": -1,
                "warning": 2
            }

    # If viable clothing was selected
    if output[5] != -1:
        footwear = {
            "clothing": output[5],
            "warning": 0
        }
    else:
        # If no viable clothing was picked, pick a random one with warning
        if len(all_clothes[5]) > 0:
            index = random.randrange(0, len(all_clothes[5]))
            footwear = {
                "clothing": all_clothes[5][index],
                "warning": 1
            }
        # If no clothing for this category
        else:
            footwear = {
                "clothing": -1,
                "warning": 2
            }

    res = [headwear, top, middlewear, outerwear, bottom, footwear]
    return res


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
    return [top, middlewear, outerwear, bottom, footwear, headwear]


print(outfit_selector("casual"))
