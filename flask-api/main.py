"""
Main file that will contain all the python functions to be called by the front end

"""


def outfit_selector(weather: str, formality:str):
    """
    Randomly picks outfits that match the weather and formality

    :input:
        weather = string that gives us the summary of the weather (e.g. cold, warm)
        formality = string that says formality type (e.g. casual, smart-casual)
    :return: list of strings that is "colour type" of clothing picked in the outfit
    """