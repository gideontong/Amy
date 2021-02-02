#!/bin/python3

'''
Usage: convert_languages.py <languages.json>

Converts the standard ISO table to a decoder dictionary
'''

import json
import sys

out_data = {
    'pairs': {},
    'names': {}
}
with open(sys.argv[1]) as file:
    data = json.load(file)
    for lang in data:
        langs = lang['English'].split('; ')
        for name in langs:
            out_data['pairs'][name.lower()] = lang['alpha2']
        out_data['names'][lang['alpha2']] = langs[0]
    with open('out.json', 'w') as out:
        json.dump(out_data, out)