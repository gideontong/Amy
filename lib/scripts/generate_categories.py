#!/bin/python3

from json import load, dump
from csv import DictReader as reader, writer
from sys import argv

assert len(argv) == 3, 'Provide input and output.'

in_file = argv[1]
out_file = argv[2]

def to_JSON():
    data = []
    with open(in_file, encoding='utf-8') as csv_file, open(out_file, 'w', encoding='utf-8') as json_file:
        csv_reader = reader(csv_file)
        for command in csv_reader:
            data.append({
                'id': command['ID'],
                'name': command['Name'],
                'description': command['Description'],
                'emote': command['Emote']
            })
        dump(data, json_file)

def to_CSV():
    pass

if in_file.endswith('json'):
    to_CSV()
elif in_file.endswith('csv'):
    to_JSON()
