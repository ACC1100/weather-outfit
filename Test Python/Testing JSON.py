import json

with open("test2.json") as json_file:
    data = json.load(json_file)
    print(json.dumps(data, indent=4))

print(data["name"])