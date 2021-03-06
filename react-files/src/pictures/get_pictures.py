import os

files = [f for f in os.listdir('.') if os.path.isfile(f)]
piclist = []
count=0

# picdict = {}
picdictstring = '{'

for f in files:
    if f != "get_pictures.py":
        print(f"import pic{count} from '../pictures/{f}';")
        typename = f.split('.')[0]
        # print(typename)
        # picdict[typename] = "pic" + str(count)

        # piclist.append()
        picdictstring += f"'{typename}': pic{count}, "

        count += 1


picdictstring += '}'

print(picdictstring)