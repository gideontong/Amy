#!/bin/python3

"""
Usage: python3 convert_commands.py input output

input JSON file
output CSV file

Converts commands to CSV
"""

from json import load
from csv import writer
import sys

with open(sys.argv[1], encoding='utf-8') as json_file, open(sys.argv[2], 'w', encoding='utf-8') as csv_file:
    commands = load(json_file)
    out = writer(csv_file)
    for command in commands['commands']:
        arr = [command['name'], command['command'], command['description'], ','.join(command['alias'])]
        out.writerow(arr)
