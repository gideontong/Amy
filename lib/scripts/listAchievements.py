#!/bin/python3

"""
Usage: listAchievements (achievements.json) (public/secret)

Lists all achievements, if no arguments are given, for
a file in the same directory. Otherwise uses the file
provided. Lists all unless specified.
"""

import argparse, json

parser = argparse.ArgumentParser(description='List achievements.')
parser.add_argument('file', nargs='?', default='achievements.json', help='achievements file')
parser.add_argument('--public', action='store_true')
parser.add_argument('--secret', action='store_true')
args = parser.parse_args()
array = []
public = args.public
secret = args.secret
if not (secret or public):
    public = True
    secret = True
# If file doesn't exist, program will crash. Sucks.
with open(args.file, 'r') as achiDoc:
    data = json.load(achiDoc)
    if public:
        for item in data['public']:
            array.append(item['id'])
    if secret:
        for item in data['secret']:
            array.append(item['id'])
print(array)