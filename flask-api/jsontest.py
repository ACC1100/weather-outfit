import json

# ZJ USE "a" to open the file (to amend) rather than "w" to write. This will stop the file overwriting it every time

# Example data to write
test = {
    "colour": "blue",
    "type": "jacket",
    "category": "middlewear",
    "condition": ["cold"],
    "formality": ["casual"]
}

test2 = {
    "colour": "red",
    "type": "shirt",
    "category": "middlewear",
    "condition": ["warm"],
    "formality": ["casual"]
}

def create_file(data):
    with open("sample.json", "w") as file:
        json.dump(data, file)

create_file(test)

def update_file(add):
    with open("sample.json", "r+") as file:
        data = json.load(file)
        data.update(add)
        file.seek(0)
        json.dump(data, file)

update_file(test2)