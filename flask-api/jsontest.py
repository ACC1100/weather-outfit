import json

test2 = {
"clothes": [
  {
    "colour": "light blue",
    "type": "jacket",
    "category": "middlewear",
    "condition": ["cold"],
    "formality": ["casual"]
  },
  {
    "colour": "grey",
    "type": "shorts",
    "category": "bottom",
    "condition": [
      "warm",
      "cold"
    ],
    "formality": [
      "casual",
      "smart"
    ]
  },
  {
    "colour": "white",
    "type": "shirt",
    "condition": [
      "warm",
      "hot"
    ],
    "category": "top",
    "formality": ["casual"]
  },
  {
    "colour": "white",
    "type": "hoodie",
    "condition": [
      "cold",
      "warm"
    ],
    "category": "middlewear",
    "formality": ["casual"]
  },
  {
    "colour": "black",
    "type": "shirt",
    "condition": [
      "cold",
      "warm"
    ],
    "category": "top",
    "formality": [
      "casual",
      "smart"
    ]
  },
  {
    "colour": "red",
    "type": "shirt",
    "condition": ["hot"],
    "category": "top",
    "formality": ["casual"]
  },
  {
    "colour": "white",
    "type": "suit jacket",
    "category": "middlewear",
    "condition": [
      "cold",
      "warm"
    ],
    "formality": ["formal"]
  },
  {
    "colour": "grey",
    "type": "shorts",
    "category": "bottom",
    "condition": [
      "warm",
      "hot"
    ],
    "formality": ["casual"]
  },
  {
    "colour": "black",
    "type": "coat",
    "category": "outerwear",
    "condition": [ "cold" ],
    "formality": ["formal", "smart"]
  },
  {
    "colour": "black",
    "type": "cap",
    "category": "headwear",
    "condition": [
      "rain",
      "cold",
      "warm"
    ],
    "formality": ["casual"]
  },
  {
    "colour": "dark blue",
    "type": "beanie",
    "category": "headwear",
    "condition": [
      "cold"
    ],
    "formality": ["casual"]
  },
  {
    "colour": "red",
    "type": "runners",
    "category": "footwear",
    "condition": [ "cold", "warm" ],
    "formality": ["casual"]
  },
  {
    "colour": "black",
    "type": "boots",
    "category": "footwear",
    "condition": [ "rain", "cold" ],
    "formality": ["smart", "formal"]
  },
  {
    "colour": "black",
    "type": "raincoat",
    "category": "outerwear",
    "condition": [ "rain" ],
    "formality": [ "casual", "smart", "formal" ]
  },

  {
    "colour": "white",
    "type": "Long Sleeve Shirt",
    "category": "top",
    "condition": [ "hot", "warm", "cold", "freezing" ],
    "formality": [ "smart", "formal" ]
  },
  {
    "colour": "light blue",
    "type": "Sweater",
    "category": "middlewear",
    "condition": [ "warm", "cold", "freezing" ],
    "formality": [ "casual", "smart" ]
  },
  {
    "colour": "black",
    "type": "Skirt",
    "category": "bottom",
    "condition": [ "warm", "hot" ],
    "formality": [ "casual", "smart" ]
  },
  {
    "colour": "white",
    "type": "Sneakers",
    "category": "footwear",
    "condition": [ "hot", "warm", "cold", "freezing" ],
    "formality": [ "casual", "smart" ]
  },

  {
    "colour": "black",
    "type": "Short Sleeve T-Shirt",
    "category": "top",
    "condition": [ "hot", "warm", "cold", "freezing" ],
    "formality": [ "smart", "casual" ]
  },
  {
    "colour": "light blue",
    "type": "Jacket",
    "category": "outerwear",
    "condition": [ "cold", "freezing" ],
    "formality": [ "smart", "casual" ]
  },
  {
    "colour": "grey",
    "type": "Shorts",
    "category": "top",
    "condition": [ "hot", "warm"],
    "formality": [ "smart", "casual" ]
  },
  {
    "colour": "white",
    "type": "Runners",
    "category": "footwear",
    "condition": [ "hot", "warm", "cold", "freezing" ],
    "formality": [ "smart", "casual" ]
  },
  {
    "colour": "orange",
    "type": "Beanie",
    "category": "headwear",
    "condition": [ "freezing", "cold"],
    "formality": [ "casual" ]
  }
]
}
test3 = {"colour": "light bluessss", "type": "jacket", "category": "middlewear", "condition": ["cold"], "formality": ["casual"]}

# ZJ USE "a" to open the file (to amend) rather than "w" to write. This will stop the file overwriting it every time

# Example data to write

def create_file(data, filename='sample.json'):
    with open(filename, "w") as file:
        json.dump(data, file)


create_file(test2)


def JSON_CALL(input, filename='badname.json'):
    try:
        open(filename)
    except FileNotFoundError:
        create_file(input, filename)
        return

    def write_json(data):
        with open(filename, 'w') as f:
            json.dump(data, f, indent=4)

    if filename != "outfit_selector_colour.json":
      with open(filename) as json_file:
          data = json.load(json_file)
          temp = data['clothes']
          temp.append(input)
          write_json(data)
    else:
      write_json(input)
