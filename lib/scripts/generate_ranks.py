from csv import DictReader as reader
from json import dump

data = {}
with open('ranks.csv', encoding='utf-8') as file, open('ranks.json', 'w') as out:
    i_reader = reader(file)
    for row in i_reader:
        data[row['Rank']] = {
            'name': row['Name'],
            'image': row['ImageURL']
        }
    dump(data, out)