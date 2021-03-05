import json

with open("weathertest.json") as json_file:
    weather = json.load(json_file)
    print(weather)

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


def apply_condition(choices, condition):
    narrowed_choices = []
    for i in choices:
        if condition in i["condition"]:
            narrowed_choices.append(i)
    return narrowed_choices


def apply_formality(choices, formality):
    narrowed_choices = []
    for i in choices:
        if formality in i["formality"]:
            narrowed_choices.append(i)
    return narrowed_choices


def main(formality):
    choices = outfit["clothes"]
    condition = warmth_factor(weather)
    # Might as well combine these two
    choices = apply_condition(choices, condition)
    choices = apply_formality(choices, formality)
    print(choices)


main("casual")

# Assumption that the user will input the formality

