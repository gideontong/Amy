#!/bin/python3

from os import listdir
from json import dump

head = '../commands/'
folders = listdir(head)
commands = dict()

def parse_commands(folder, name):
    files = [name.split('.')[0] for name in listdir(folder)]
    for file in files:
        commands[file] = name

for folder in folders:
    parse_commands(head + folder, folder)

with open('../config/foldermap.json', 'w') as file:
    dump(commands, file, sort_keys=True, indent=4)