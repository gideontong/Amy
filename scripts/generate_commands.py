#!/bin/python3

"""
Usage: python3 generate_commands.py input output

input file JSON or CSV
output file JSON or CSV but not same as input
"""

from json import load, dump
from csv import DictReader as reader, writer
import sys

if len(sys.argv) != 3:
    print('You need to provide an input and an output.')
    exit()

in_file = sys.argv[1]
out_file = sys.argv[2]

def to_JSON():
    data = {}
    with open(in_file, encoding='utf-8') as csv_file, open(out_file, 'w', encoding='utf-8') as json_file:
        csv_reader = reader(csv_file)
        for command in csv_reader:
            alias = command['Aliases'].split(',')
            if alias == ['']:
                alias = []
            data[command['Command']] = {
                'command': command['Command'],
                'name': command['Name'],
                'description': command['Description'],
                'category': command['Category'],
                'alias': alias,
                'flags': {
                    'admin': command['Admin'] == 'TRUE',
                    'premium': command['Premium'] == 'TRUE',
                    'hidden': command['Secret'] == 'TRUE',
                    'nsfw': command['NSFW'] == 'TRUE'
                },
                'cooldown': {
                    'standard': float(command['Cooldown']),
                    'premium': float(command['PaidCooldown'])
                }
            }
        dump(data, json_file, sort_keys=True, indent=4)

def to_CSV():
    pass

if in_file.endswith('json'):
    to_CSV()
elif in_file.endswith('csv'):
    to_JSON()

"""
with open(sys.argv[1], encoding='utf-8') as json_file, open(sys.argv[2], 'w', encoding='utf-8') as csv_file:
    commands = load(json_file)
    out = writer(csv_file)
    for command in commands['commands']:
        arr = [command['name'], command['command'], command['description'], ','.join(command['alias'])]
        out.writerow(arr)
"""