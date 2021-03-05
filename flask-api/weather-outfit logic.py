import json

with open("weathertest.json") as json_file:
    weather = json.load(json_file)

with open("test2.json") as json_file:
    outfit = json.load(json_file)

# Temp 19 or below cold
# Rain chance 50% or higher, rain clothes preferable
# Temp 20-26 is warm
# Temp 27 or higher is hot


def outfit_warmth_factor(temp):
    if temp["PrecipProbability"] > 0.50:
        return "cold"
    if temp["Temperature"] < 19:
        return "cold"
    if 20 < temp["Temperature"] < 26:
        return "warm"
    else:
        return "hot"

# Assumption that the user will input the formality

for i in outfit["clothes"]:
    print(i["condition"])

for i in outfit["clothes"]:
    if "cold" in i["condition"]:
        print(i["type"])
# def outfit_picking():
    # if outfit_warmth_factor(weather) == "cold" and



