import json

with open("test2.json") as json_file:
    data = json.load(json_file)
    print(json.dumps(data, indent=4))
#    for i in range(5):
#        print(data[i])

with open("test.json") as json_file:
    data = json.load(json_file)
#    print(json.dumps(data, indent=4))
#    print(data["firstName"])
    for key in data:
        print(key)
        print(data[key])