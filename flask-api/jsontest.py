import json

# Example data to write
test = {
    "colour": "blue",
    "type": "jacket",
    "category": "middlewear",
    "condition": ["cold"],
    "formality": ["casual"]
}


data = json.dumps(test, indent=4)

with open("sample.json", "w") as file:
        file.write(data)


test2 = {
    "colour": "red",
    "type": "shirt",
    "category": "middlewear",
    "condition": ["warm"],
    "formality": ["casual"]
}

with open("sample.json", 'w') as file:
    data = json.load(file)
    data.update(test2)
    file.seek(0)
    json.dump(data, file)