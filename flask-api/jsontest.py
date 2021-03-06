import json

# ZJ USE "a" to open the file (to amend) rather than "w" to write. This will stop the file overwriting it every time

# Example data to write
test = {
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
    "type": "pants",
    "category": "bottom",
    "condition": [
      "warm",
      "hot"
    ],
    "formality": [
      "casual",
      "smart-casual"
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
      "smart-casual"
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
    "formality": ["formal", "smart-casual"]
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
    "formality": ["smart-casual", "formal"]
  },
  {
    "colour": "black",
    "type": "raincoat",
    "category": "outerwear",
    "condition": [ "rain" ],
    "formality": [ "casual", "smart-casual", "formal" ]
  },

  {
    "colour": "white",
    "type": "Long Sleeve Shirt",
    "category": "top",
    "condition": [ "hot", "warm", "cold", "freezing" ],
    "formality": [ "smart-casual", "formal" ]
  },
  {
    "colour": "light blue",
    "type": "Sweater",
    "category": "middlewear",
    "condition": [ "warm", "cold", "freezing" ],
    "formality": [ "casual", "smart-casual" ]
  },
  {
    "colour": "black",
    "type": "Skirt",
    "category": "bottom",
    "condition": [ "warm", "hot" ],
    "formality": [ "casual", "smart-casual" ]
  },
  {
    "colour": "white",
    "type": "Sneakers",
    "category": "footwear",
    "condition": [ "hot", "warm", "cold", "freezing" ],
    "formality": [ "casual", "smart-casual" ]
  },

  {
    "colour": "black",
    "type": "Short Sleeve T-Shirt",
    "category": "top",
    "condition": [ "hot", "warm", "cold", "freezing" ],
    "formality": [ "smart-casual", "casual" ]
  },
  {
    "colour": "light blue",
    "type": "Jacket",
    "category": "outerwear",
    "condition": [ "cold", "freezing" ],
    "formality": [ "smart-casual", "casual" ]
  },
  {
    "colour": "grey",
    "type": "Shorts",
    "category": "top",
    "condition": [ "hot", "warm"],
    "formality": [ "smart-casual", "casual" ]
  },
  {
    "colour": "white",
    "type": "Runners",
    "category": "footwear",
    "condition": [ "hot", "warm", "cold", "freezing" ],
    "formality": [ "smart-casual", "casual" ]
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


def create_file(data):
    with open("sample.json", "w") as file:
        json.dump(data, file)

create_file(test)


# def update_file(add):
#     with open("sample.json", "a+") as file:
#         data = json.load(file)
#         data.update(add)
#         file.seek(0)
#         json.dump(data, file)
#
# update_file(test2)