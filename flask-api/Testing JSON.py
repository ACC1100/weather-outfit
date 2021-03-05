import json

with open("test2.json") as json_file:
    data = json.load(json_file)
    # Example showing how to print all the type and colour from every item of clothing
    for i in data["clothes"]:
        print(i["type"]+" " + i["colour"])

