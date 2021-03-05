import json

with open("weathertest.json") as json_file:
    weather = json.load(json_file)

with open("test2.json") as json_file:
    outfit = json.load(json_file)

# Temp 19 or below cold
# Rain chance 50% or higher, rain clothes preferable
# Temp 20-26 is warm
# Temp 27 or higher is hot


def warmth_factor(temp):
    if temp["PrecipProbability"] > 0.50:
        return "rain"
    if temp["Temperature"] < 12:
        return "freezing"
    if temp["Temperature"] < 19:
        return "cold"
    else:
        return "warm"

print(warmth_factor(weather))


def pick():
    choices = []
    return choices

print(pick())

# Assumption that the user will input the formality




