"""
Main file that will contain all the python functions to be called by the front end

"""
import json

def outfit_selector(weather: list, formality:str) -> list:
    """
    Randomly picks outfits that match the weather and formality

    :input:
        weather = list of strings. First string is weather, second string (or null) will say rain if it is raining
        formality = string that says formality type (e.g. casual, smart-casual)
        rain = boolean to tell if going to rain or not
    :return: list of strings that is "colour type" of clothing picked in the outfit
    """

    # Loads list that contains dictionaries from stored clothing
    with open("test2.json") as json_file:
        data = json.load(json_file)

    # List that contains all the cloth
    selected_clothes = []
    for i in range(len(data["clothes"])):
        # matches weather and formality
        if weather[0] in data["clothes"][i]["condition"] and formality in data["clothes"][i]["formality"]:
            # checks if clothes viable for rain
            if len(weather) == 2:
                if "rain" in data["clothes"][i]["condition"]:
                    selected_clothes.append(i)
            else:
                selected_clothes.append(i)

    top = []
    middlewear = []
    outerwear = []
    bottom = []
    footwear = []
    headwear = []
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
        print(data["clothes"][num])

#output strings
outfit_selector(["warm"], "casual")