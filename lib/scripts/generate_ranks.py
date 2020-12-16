from json import dump

data = {}
with open('ranks.txt') as file, open('ranks.json', 'w') as out:
    ranks = [x.strip() for x in file]
    for (i, rank) in enumerate(ranks):
        data[i] = rank
    dump(data, out)